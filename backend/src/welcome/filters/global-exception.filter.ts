/**
 * 全局异常过滤器
 * 企业级异常处理的核心组件，提供统一的错误响应格式和日志记录
 * 集成自定义异常体系，确保异常处理的一致性和可追踪性
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseWelcomeException } from '../exceptions/base.exception';

/**
 * 标准化错误响应接口
 * 定义统一的错误响应格式，便于前端处理和用户理解
 */
interface StandardErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    timestamp: string;
    path: string;
    requestId?: string;
    details?: any;
    stack?: string;
  };
}

/**
 * 全局异常过滤器类
 * 捕获应用中的所有异常，提供统一的处理和响应机制
 */
@Injectable()
@Catch() // 捕获所有类型的异常
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  /**
   * 异常处理核心方法
   * @param exception 捕获的异常对象
   * @param host 执行上下文宿主对象
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    // 获取HTTP上下文
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 生成请求ID用于链路追踪
    const requestId = this.generateRequestId();

    // 解析异常信息
    const exceptionInfo = this.parseException(exception, request, requestId);

    // 记录异常日志
    this.logException(exceptionInfo, request);

    // 构建标准化错误响应
    const errorResponse = this.buildErrorResponse(exceptionInfo, request);

    // 返回错误响应
    response.status(exceptionInfo.httpStatus).json(errorResponse);
  }

  /**
   * 解析异常信息
   * 统一处理不同类型的异常，提取关键信息
   * @param exception 异常对象
   * @param request 请求对象
   * @param requestId 请求ID
   * @returns 解析后的异常信息
   */
  private parseException(
    exception: unknown,
    request: Request,
    requestId: string,
  ) {
    // 处理自定义异常
    if (exception instanceof BaseWelcomeException) {
      return {
        name: exception.name,
        message: exception.message,
        errorCode: exception.errorCode,
        httpStatus: exception.getStatus(),
        details: exception.details,
        stack: exception.stack,
        isCustomException: true,
        requestId,
      };
    }

    // 处理Nest.js HTTP异常
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const errorCode =
        typeof response === 'object' && 'error' in response
          ? (response as any).error
          : 'HTTP_EXCEPTION';

      return {
        name: exception.name,
        message: exception.message,
        errorCode,
        httpStatus: exception.getStatus(),
        details:
          typeof response === 'object' ? response : { message: response },
        stack: exception.stack,
        isCustomException: false,
        requestId,
      };
    }

    // 处理普通Error对象
    if (exception instanceof Error) {
      return {
        name: exception.name,
        message: exception.message,
        errorCode: 'INTERNAL_ERROR',
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        details: { originalError: exception.message },
        stack: exception.stack,
        isCustomException: false,
        requestId,
      };
    }

    // 处理未知异常
    return {
      name: 'UnknownException',
      message: '发生未知错误',
      errorCode: 'UNKNOWN_ERROR',
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      details: { originalException: String(exception) },
      stack: undefined,
      isCustomException: false,
      requestId,
    };
  }

  /**
   * 记录异常日志
   * 使用结构化日志格式，便于日志分析和监控
   * @param exceptionInfo 异常信息
   * @param request 请求对象
   */
  private logException(exceptionInfo: any, request: Request): void {
    const logData = {
      level: this.getLogLevel(exceptionInfo.httpStatus),
      timestamp: new Date().toISOString(),
      requestId: exceptionInfo.requestId,
      method: request.method,
      url: request.url,
      userAgent: request.get('User-Agent'),
      ip: request.ip,
      exception: {
        name: exceptionInfo.name,
        message: exceptionInfo.message,
        errorCode: exceptionInfo.errorCode,
        httpStatus: exceptionInfo.httpStatus,
        isCustomException: exceptionInfo.isCustomException,
      },
      details: exceptionInfo.details,
      stack: this.shouldIncludeStack() ? exceptionInfo.stack : undefined,
    };

    // 根据异常严重程度选择日志级别
    if (exceptionInfo.httpStatus >= 500) {
      this.logger.error(
        `服务器内部错误: ${exceptionInfo.message}`,
        JSON.stringify(logData, null, 2),
      );
    } else if (exceptionInfo.httpStatus >= 400) {
      this.logger.warn(
        `客户端请求错误: ${exceptionInfo.message}`,
        JSON.stringify(logData, null, 2),
      );
    } else {
      this.logger.log(
        `异常信息: ${exceptionInfo.message}`,
        JSON.stringify(logData, null, 2),
      );
    }
  }

  /**
   * 构建标准化错误响应
   * @param exceptionInfo 异常信息
   * @param request 请求对象
   * @returns 标准化错误响应对象
   */
  private buildErrorResponse(
    exceptionInfo: any,
    request: Request,
  ): StandardErrorResponse {
    const isDevelopment = process.env.NODE_ENV === 'development';

    const errorResponse: StandardErrorResponse = {
      success: false,
      error: {
        code: exceptionInfo.errorCode,
        message: this.getClientSafeMessage(exceptionInfo, isDevelopment),
        timestamp: new Date().toISOString(),
        path: request.url,
        requestId: exceptionInfo.requestId,
      },
    };

    // 开发环境下提供更多调试信息
    if (isDevelopment) {
      errorResponse.error.details = exceptionInfo.details;
      errorResponse.error.stack = exceptionInfo.stack;
    }

    return errorResponse;
  }

  /**
   * 获取客户端安全的错误消息
   * 在生产环境中过滤敏感信息
   * @param exceptionInfo 异常信息
   * @param isDevelopment 是否为开发环境
   * @returns 安全的错误消息
   */
  private getClientSafeMessage(
    exceptionInfo: any,
    isDevelopment: boolean,
  ): string {
    // 开发环境返回详细错误信息
    if (isDevelopment) {
      return exceptionInfo.message;
    }

    // 生产环境根据HTTP状态码返回通用消息
    if (exceptionInfo.httpStatus >= 500) {
      return '服务器内部错误，请稍后重试';
    } else if (exceptionInfo.httpStatus >= 400) {
      // 客户端错误可以返回具体信息
      return exceptionInfo.message;
    }

    return exceptionInfo.message;
  }

  /**
   * 根据HTTP状态码确定日志级别
   * @param httpStatus HTTP状态码
   * @returns 日志级别
   */
  private getLogLevel(httpStatus: number): string {
    if (httpStatus >= 500) return 'error';
    if (httpStatus >= 400) return 'warn';
    return 'info';
  }

  /**
   * 判断是否应该包含堆栈信息
   * 生产环境中通常不包含堆栈信息以避免信息泄露
   * @returns 是否包含堆栈信息
   */
  private shouldIncludeStack(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  /**
   * 生成请求ID
   * 用于链路追踪和日志关联
   * @returns 唯一的请求ID
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * 企业级自定义异常基类
 * 提供统一的异常处理规范，包含错误码、消息、详细信息等
 * 继承自HttpException，与Nest.js异常处理体系完美集成
 */
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 异常详细信息接口
 * 定义异常的结构化信息，便于日志记录和问题排查
 */
export interface ExceptionDetails {
  /** 错误发生的上下文信息 */
  context?: string;
  /** 请求ID，用于链路追踪 */
  requestId?: string;
  /** 用户ID，用于用户行为分析 */
  userId?: string;
  /** 异常发生时间戳 */
  timestamp: Date;
  /** 额外的元数据信息 */
  metadata?: Record<string, any>;
}

/**
 * 企业级异常基类
 * 所有自定义异常都应继承此类，确保异常处理的一致性
 */
export abstract class BaseWelcomeException extends HttpException {
  /** 业务错误码，用于前端错误处理和国际化 */
  public readonly errorCode: string;

  /** 异常详细信息 */
  public readonly details: ExceptionDetails;

  /**
   * 构造函数
   * @param message 异常消息
   * @param errorCode 业务错误码
   * @param httpStatus HTTP状态码
   * @param details 异常详细信息
   */
  constructor(
    message: string,
    errorCode: string,
    httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: Partial<ExceptionDetails>,
  ) {
    super(message, httpStatus);

    this.errorCode = errorCode;
    this.details = {
      timestamp: new Date(),
      ...details,
    };

    // 确保异常名称正确显示
    this.name = this.constructor.name;

    // 在支持的环境中保留堆栈跟踪
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * 获取格式化的异常信息
   * 用于日志记录和调试
   * @returns 格式化的异常信息对象
   */
  public getFormattedError() {
    return {
      name: this.name,
      message: this.message,
      errorCode: this.errorCode,
      httpStatus: this.getStatus(),
      details: this.details,
      stack: this.stack,
    };
  }

  /**
   * 获取客户端安全的异常信息
   * 过滤敏感信息，适合返回给前端
   * @param isDevelopment 是否为开发环境
   * @returns 客户端安全的异常信息
   */
  public getClientSafeError(isDevelopment: boolean = false) {
    const safeError = {
      success: false,
      error: {
        code: this.errorCode,
        message: this.message,
        timestamp: this.details.timestamp.toISOString(),
        requestId: this.details.requestId,
      },
    };

    // 开发环境下提供更多调试信息
    if (isDevelopment) {
      return {
        ...safeError,
        error: {
          ...safeError.error,
          details: this.details,
          stack: this.stack,
        },
      };
    }

    return safeError;
  }

  /**
   * 转换为日志友好的格式
   * 用于结构化日志记录
   * @returns 日志格式的异常信息
   */
  public toLogFormat() {
    return {
      level: 'error',
      timestamp: this.details.timestamp.toISOString(),
      context: this.details.context || 'WelcomeModule',
      message: this.message,
      errorCode: this.errorCode,
      httpStatus: this.getStatus(),
      requestId: this.details.requestId,
      userId: this.details.userId,
      metadata: this.details.metadata,
      stack: this.stack,
    };
  }
}

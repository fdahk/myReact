/**
 * 处理HTTP请求，提供RESTful API接口
 * 企业级控制器设计模式和最佳实践
 */
import {
  Controller,
  Get,
  Query,
  Req,
  Logger,
  UseFilters,
  UsePipes,
  ValidationPipe,
  Header,
} from '@nestjs/common';
import type { Request } from 'express';
import { WelcomeService } from '../services/welcome.service';
import {
  WelcomeQueryDto,
  SystemStatusQueryDto,
  ResponseFormat,
} from '../dto/welcome-query.dto';
import {
  WelcomeResponseDto,
  SystemStatusResponseDto,
  WelcomeResponseDataDto,
  SystemStatusDto,
} from '../dto/welcome-response.dto';
import { GlobalExceptionFilter } from '../filters/global-exception.filter';

/**
 * 控制器类：提供页面和系统状态相关的API端点
 */
@Controller('api/welcome')
@UseFilters(GlobalExceptionFilter)
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class WelcomeController {
  private readonly logger = new Logger(WelcomeController.name);

  constructor(private readonly welcomeService: WelcomeService) {}

  /**
   * 获取欢迎页面
   * 主要API端点，返回动态生成的欢迎HTML内容
   *
   * @param query 查询参数
   * @param request HTTP请求对象
   * @returns 欢迎页面响应数据
   *
   * @example
   * GET /api/welcome
   * GET /api/welcome?format=html&includeSystemStatus=true
   */
  @Get()
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getWelcomePage(
    @Query() query: WelcomeQueryDto,
    @Req() request: Request,
  ): Promise<WelcomeResponseDto> {
    const requestId = this.generateRequestId();
    const clientIp = this.extractClientIp(request);

    this.logger.log(
      `收到欢迎页面请求 - 请求ID: ${requestId}, 客户端IP: ${clientIp}, 参数: ${JSON.stringify(query)}`,
    );

    try {
      const response = await this.welcomeService.generateWelcomeHtml(
        requestId,
        clientIp,
      );

      // 根据查询参数调整响应格式
      if (query.format === ResponseFormat.HTML) {
        // 创建只包含HTML的响应数据
        const htmlOnlyData: Partial<WelcomeResponseDataDto> = {
          html: response.data.html,
          metadata: response.data.metadata,
        };

        // 如果包含系统状态，则添加系统状态数据
        if (query.includeSystemStatus) {
          htmlOnlyData.systemStatus = response.data.systemStatus;
        }

        return {
          success: true,
          data: htmlOnlyData as WelcomeResponseDataDto,
          message: response.message,
          timestamp: response.timestamp,
        };
      }

      // 处理系统状态包含选项
      if (!query.includeSystemStatus) {
        const responseData = { ...response.data };
        delete (responseData as Partial<WelcomeResponseDataDto>).systemStatus;
        return {
          ...response,
          data: responseData as WelcomeResponseDataDto,
        };
      }

      this.logger.log(`欢迎页面请求处理成功 - 请求ID: ${requestId}`);
      return response;
    } catch (error) {
      this.logger.error(
        `欢迎页面请求处理失败 - 请求ID: ${requestId}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  /**
   * 获取系统状态
   * 提供系统健康检查和监控数据
   *
   * @param query 查询参数
   * @param request HTTP请求对象
   * @returns 系统状态响应数据
   *
   * @example
   * GET /api/welcome/status
   * GET /api/welcome/status?includeMemoryDetails=true
   */
  @Get('status')
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getSystemStatus(
    @Query() query: SystemStatusQueryDto,
    @Req() request: Request,
  ): Promise<SystemStatusResponseDto> {
    const requestId = this.generateRequestId();
    const clientIp = this.extractClientIp(request);

    this.logger.log(
      `收到系统状态请求 - 请求ID: ${requestId}, 客户端IP: ${clientIp}`,
    );

    try {
      const response = await this.welcomeService.getSystemStatusInfo();

      // 根据查询参数调整响应内容
      if (!query.includeMemoryDetails) {
        const responseData = { ...response.data };
        delete (responseData as Partial<SystemStatusDto>).memoryUsage;
        return {
          ...response,
          data: responseData as SystemStatusDto,
        };
      }

      this.logger.log(`系统状态请求处理成功 - 请求ID: ${requestId}`);
      return response;
    } catch (error) {
      this.logger.error(
        `系统状态请求处理失败 - 请求ID: ${requestId}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  /**
   * 获取访问统计信息
   * 提供访问分析数据，用于运营监控
   *
   * @returns 访问统计数据
   *
   * @example
   * GET /api/welcome/stats
   */
  @Get('stats')
  @Header('Content-Type', 'application/json; charset=utf-8')
  getVisitStatistics() {
    const requestId = this.generateRequestId();

    this.logger.log(`收到访问统计请求 - 请求ID: ${requestId}`);

    try {
      const stats = this.welcomeService.getVisitStatistics();

      const response = {
        success: true,
        data: stats,
        message: '访问统计获取成功',
        timestamp: new Date().toISOString(),
      };

      this.logger.log(`访问统计请求处理成功 - 请求ID: ${requestId}`);
      return response;
    } catch (error) {
      this.logger.error(
        `访问统计请求处理失败 - 请求ID: ${requestId}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  /**
   * 获取服务监控指标
   * 提供服务运行状态和性能数据，用于运维监控
   *
   * @returns 服务监控指标
   *
   * @example
   * GET /api/welcome/metrics
   */
  @Get('metrics')
  @Header('Content-Type', 'application/json; charset=utf-8')
  getServiceMetrics() {
    const requestId = this.generateRequestId();

    this.logger.log(`收到服务指标请求 - 请求ID: ${requestId}`);

    try {
      const metrics = this.welcomeService.getServiceMetrics();

      const response = {
        success: true,
        data: metrics,
        message: '服务指标获取成功',
        timestamp: new Date().toISOString(),
      };

      this.logger.log(`服务指标请求处理成功 - 请求ID: ${requestId}`);
      return response;
    } catch (error) {
      this.logger.error(
        `服务指标请求处理失败 - 请求ID: ${requestId}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  /**
   * 健康检查端点
   * 提供简单的服务可用性检查
   *
   * @returns 健康状态
   *
   * @example
   * GET /api/welcome/health
   */
  @Get('health')
  @Header('Content-Type', 'application/json; charset=utf-8')
  healthCheck() {
    return {
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'WelcomeService',
      },
      message: '服务运行正常',
    };
  }

  /**
   * 生成请求ID
   * 用于链路追踪和日志关联
   * @returns 唯一的请求ID
   */
  private generateRequestId(): string {
    return `welcome_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 提取客户端IP地址
   * 处理代理和负载均衡器的情况
   * @param request HTTP请求对象
   * @returns 客户端IP地址
   */
  private extractClientIp(request: Request): string {
    const forwarded = request.get('X-Forwarded-For');
    const realIp = request.get('X-Real-IP');
    const remoteAddress = request.connection?.remoteAddress;

    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }

    if (realIp) {
      return realIp;
    }

    if (remoteAddress?.startsWith('::ffff:')) {
      return remoteAddress.substring(7);
    }

    return remoteAddress || 'unknown';
  }
}

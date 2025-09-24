/**
 * 欢迎功能核心业务服务
 * 提供欢迎页面生成、系统状态监控、访问统计等企业级功能
 * 集成配置管理、异常处理、日志记录等最佳实践
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TemplateService, WelcomeTemplateData } from './template.service';
import {
  WelcomeResponseDto,
  SystemStatusResponseDto,
  SystemStatus,
  WelcomeResponseDataDto,
} from '../dto/welcome-response.dto';
import {
  SystemUnavailableException,
  ServiceInitializationException,
  BusinessRuleException,
} from '../exceptions/service.exception';

/**
 * 访问统计接口
 */
interface VisitStats {
  totalVisits: number;
  uniqueVisitors: Set<string>;
  lastVisitTime: Date;
  dailyVisits: Map<string, number>;
}

/**
 * 系统监控指标接口
 */
interface SystemMetrics {
  startTime: Date;
  lastHealthCheck: Date;
  healthCheckCount: number;
  errorCount: number;
  warningCount: number;
}

/**
 * 欢迎服务类
 * 核心业务逻辑处理，展示企业级服务设计模式
 */
@Injectable()
export class WelcomeService implements OnModuleInit {
  private readonly logger = new Logger(WelcomeService.name);

  /** 访问统计数据 */
  private visitStats: VisitStats = {
    totalVisits: 0,
    uniqueVisitors: new Set(),
    lastVisitTime: new Date(),
    dailyVisits: new Map(),
  };

  /** 系统监控指标 */
  private systemMetrics: SystemMetrics = {
    startTime: new Date(),
    lastHealthCheck: new Date(),
    healthCheckCount: 0,
    errorCount: 0,
    warningCount: 0,
  };

  /** 服务初始化状态 */
  private isInitialized = false;

  constructor(
    private readonly configService: ConfigService,
    private readonly templateService: TemplateService,
  ) {}

  /**
   * 模块初始化钩子
   * 执行服务初始化逻辑
   */
  async onModuleInit(): Promise<void> {
    try {
      this.logger.log('WelcomeService 开始初始化...');

      // 验证必需配置
      await this.validateConfiguration();

      // 初始化监控指标
      this.initializeMetrics();

      // 设置定时任务
      this.setupScheduledTasks();

      this.isInitialized = true;
      this.logger.log('WelcomeService 初始化完成');
    } catch (error) {
      this.logger.error('WelcomeService 初始化失败', error.stack);
      throw new ServiceInitializationException('WelcomeService', error);
    }
  }

  /**
   * 生成欢迎页面HTML
   * 核心业务方法，展示完整的企业级处理流程
   * @param requestId 请求ID，用于链路追踪
   * @param clientIp 客户端IP，用于访问统计
   * @returns 欢迎页面响应数据
   */
  async generateWelcomeHtml(
    requestId: string,
    clientIp?: string,
  ): Promise<WelcomeResponseDto> {
    const startTime = Date.now();

    try {
      this.logger.log(
        `开始生成欢迎页面，请求ID: ${requestId}, 客户端IP: ${clientIp}`,
      );

      // 检查服务可用性
      this.checkServiceAvailability();

      // 更新访问统计
      this.updateVisitStatistics(clientIp);

      // 获取系统状态
      const systemStatus = await this.getSystemStatus();

      // 准备模板数据
      const templateData = await this.prepareTemplateData(
        requestId,
        systemStatus,
      );

      // 渲染HTML模板
      const html = await this.templateService.renderWelcomeTemplate(
        templateData,
        requestId,
      );

      // 构建响应数据
      const responseData: WelcomeResponseDataDto = {
        html,
        appInfo: templateData.appInfo,
        welcome: templateData.welcome,
        systemStatus: {
          status: systemStatus.status,
          uptime: systemStatus.uptime,
          timestamp: systemStatus.timestamp,
          visitCount: this.visitStats.totalVisits,
          memoryUsage: systemStatus.memoryUsage,
        },
        companyInfo: templateData.companyInfo,
        metadata: {
          ...templateData.metadata,
          processingTime: Date.now() - startTime,
        },
      };

      const response: WelcomeResponseDto = {
        success: true,
        data: responseData,
        message: '欢迎页面生成成功',
        timestamp: new Date().toISOString(),
      };

      this.logger.log(
        `欢迎页面生成成功，请求ID: ${requestId}, 耗时: ${Date.now() - startTime}ms`,
      );
      return response;
    } catch (error) {
      this.systemMetrics.errorCount++;
      this.logger.error(`欢迎页面生成失败，请求ID: ${requestId}`, error.stack);
      throw error;
    }
  }

  /**
   * 获取系统状态信息
   * 提供系统健康检查和监控数据
   * @returns 系统状态响应
   */
  async getSystemStatusInfo(): Promise<SystemStatusResponseDto> {
    try {
      this.systemMetrics.healthCheckCount++;
      this.systemMetrics.lastHealthCheck = new Date();

      const systemStatus = await this.getSystemStatus();

      return {
        success: true,
        data: {
          status: systemStatus.status,
          uptime: systemStatus.uptime,
          timestamp: systemStatus.timestamp,
          visitCount: this.visitStats.totalVisits,
          memoryUsage: systemStatus.memoryUsage,
        },
        message: '系统状态获取成功',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.systemMetrics.errorCount++;
      this.logger.error('系统状态获取失败', error.stack);
      throw error;
    }
  }

  /**
   * 获取访问统计信息
   * 提供访问分析数据
   * @returns 访问统计数据
   */
  getVisitStatistics() {
    return {
      totalVisits: this.visitStats.totalVisits,
      uniqueVisitors: this.visitStats.uniqueVisitors.size,
      lastVisitTime: this.visitStats.lastVisitTime.toISOString(),
      dailyVisits: Object.fromEntries(this.visitStats.dailyVisits),
    };
  }

  /**
   * 获取服务监控指标
   * 提供服务运行状态和性能数据
   * @returns 监控指标数据
   */
  getServiceMetrics() {
    return {
      ...this.systemMetrics,
      startTime: this.systemMetrics.startTime.toISOString(),
      lastHealthCheck: this.systemMetrics.lastHealthCheck.toISOString(),
      uptime: Date.now() - this.systemMetrics.startTime.getTime(),
      isInitialized: this.isInitialized,
    };
  }

  /**
   * 验证服务配置
   * 确保必需的配置项存在且有效
   */
  private async validateConfiguration(): Promise<void> {
    const requiredConfigs = [
      'welcome.app.name',
      'welcome.server.port',
      'welcome.welcome.title',
      'welcome.companyInfo.name',
    ];

    for (const config of requiredConfigs) {
      const value = this.configService.get(config);
      if (!value) {
        throw new BusinessRuleException(
          'ConfigurationValidation',
          `必需配置项缺失: ${config}`,
          { missingConfig: config },
        );
      }
    }
  }

  /**
   * 检查服务可用性
   * 验证服务是否处于可用状态
   */
  private checkServiceAvailability(): void {
    if (!this.isInitialized) {
      throw new SystemUnavailableException('服务尚未初始化完成');
    }

    // 检查系统资源使用情况
    const memoryUsage = process.memoryUsage();
    const memoryUsagePercent =
      (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;

    if (memoryUsagePercent > 90) {
      this.systemMetrics.warningCount++;
      this.logger.warn(`内存使用率过高: ${memoryUsagePercent.toFixed(2)}%`);
    }
  }

  /**
   * 更新访问统计
   * 记录访问次数和访客信息
   * @param clientIp 客户端IP
   */
  private updateVisitStatistics(clientIp?: string): void {
    this.visitStats.totalVisits++;
    this.visitStats.lastVisitTime = new Date();

    if (clientIp) {
      this.visitStats.uniqueVisitors.add(clientIp);
    }

    // 更新日访问统计
    const today = new Date().toISOString().split('T')[0];
    const dailyCount = this.visitStats.dailyVisits.get(today) || 0;
    this.visitStats.dailyVisits.set(today, dailyCount + 1);
  }

  /**
   * 获取系统状态
   * 检查系统健康状态和性能指标
   */
  private async getSystemStatus() {
    const memoryUsage = process.memoryUsage();
    const uptime = Math.floor(process.uptime());

    // 计算系统状态
    let status = SystemStatus.HEALTHY;
    const memoryUsagePercent =
      (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;

    if (memoryUsagePercent > 80 || this.systemMetrics.errorCount > 10) {
      status = SystemStatus.DEGRADED;
    }

    if (memoryUsagePercent > 95 || this.systemMetrics.errorCount > 50) {
      status = SystemStatus.DOWN;
    }

    return {
      status,
      uptime,
      timestamp: new Date().toISOString(),
      memoryUsage: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
        percentage: Math.round(memoryUsagePercent),
      },
    };
  }

  /**
   * 准备模板数据
   * 整合所有需要传递给模板的数据
   * @param requestId 请求ID
   * @param systemStatus 系统状态
   * @returns 模板数据对象
   */
  private async prepareTemplateData(
    requestId: string,
    systemStatus: any,
  ): Promise<WelcomeTemplateData> {
    const welcomeConfig = this.configService.get('welcome');

    return {
      appInfo: {
        name: welcomeConfig.app.name,
        version: welcomeConfig.app.version,
        environment: welcomeConfig.app.environment,
        description: welcomeConfig.app.description,
      },
      welcome: {
        title: welcomeConfig.welcome.title,
        subtitle: welcomeConfig.welcome.subtitle,
        description: welcomeConfig.welcome.description,
        features: welcomeConfig.welcome.features,
      },
      systemStatus: {
        ...systemStatus,
        visitCount: this.visitStats.totalVisits,
      },
      companyInfo: {
        name: welcomeConfig.welcome.companyInfo.name,
        website: welcomeConfig.welcome.companyInfo.website,
        supportEmail: welcomeConfig.welcome.companyInfo.supportEmail,
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        requestId,
        version: '1.0.0',
      },
    };
  }

  /**
   * 初始化监控指标
   * 设置初始监控数据
   */
  private initializeMetrics(): void {
    this.systemMetrics = {
      startTime: new Date(),
      lastHealthCheck: new Date(),
      healthCheckCount: 0,
      errorCount: 0,
      warningCount: 0,
    };
  }

  /**
   * 设置定时任务
   * 配置定期清理和维护任务
   */
  private setupScheduledTasks(): void {
    // 每小时清理过期的日访问统计
    setInterval(
      () => {
        this.cleanupOldDailyStats();
      },
      60 * 60 * 1000,
    ); // 1小时

    // 每10分钟重置错误计数器（避免永久降级）
    setInterval(
      () => {
        if (this.systemMetrics.errorCount > 0) {
          this.systemMetrics.errorCount = Math.max(
            0,
            this.systemMetrics.errorCount - 1,
          );
        }
      },
      10 * 60 * 1000,
    ); // 10分钟
  }

  /**
   * 清理过期的日访问统计
   * 保持数据的时效性，避免内存泄漏
   */
  private cleanupOldDailyStats(): void {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const cutoffDate = sevenDaysAgo.toISOString().split('T')[0];

    for (const [date] of this.visitStats.dailyVisits) {
      if (date < cutoffDate) {
        this.visitStats.dailyVisits.delete(date);
      }
    }
  }
}

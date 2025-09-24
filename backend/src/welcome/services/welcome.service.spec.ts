/**
 * WelcomeService 单元测试
 * 测试核心业务逻辑，展示企业级测试最佳实践
 * 包含正常流程、边界条件、异常场景的完整测试覆盖
 */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { WelcomeService } from './welcome.service';
import { TemplateService } from './template.service';
import {
  SystemUnavailableException,
  ServiceInitializationException,
} from '../exceptions/service.exception';

/**
 * 模拟配置数据
 */
const mockConfig = {
  app: {
    name: 'Test App',
    version: '1.0.0',
    environment: 'test',
    description: 'Test Description',
  },
  server: {
    port: 3000,
    host: 'localhost',
    apiPrefix: 'api',
  },
  welcome: {
    title: 'Test Welcome',
    subtitle: 'Test Subtitle',
    description: 'Test Description',
    features: ['Feature 1', 'Feature 2'],
    companyInfo: {
      name: 'Test Company',
      website: 'https://test.com',
      supportEmail: 'support@test.com',
    },
  },
  monitoring: {
    enableHealthCheck: true,
    enableMetrics: true,
    logLevel: 'info',
  },
};

/**
 * 模拟TemplateService
 */
const mockTemplateService = {
  renderWelcomeTemplate: jest.fn(),
};

/**
 * 模拟ConfigService
 */
const mockConfigService = {
  get: jest.fn(),
};

describe('WelcomeService', () => {
  let service: WelcomeService;
  let templateService: TemplateService;
  let configService: ConfigService;

  /**
   * 测试模块设置
   * 配置测试环境和依赖注入
   */
  beforeEach(async () => {
    // 重置所有模拟函数
    jest.clearAllMocks();

    // 设置ConfigService模拟返回值
    mockConfigService.get.mockImplementation((key: string) => {
      // 处理完整路径映射
      const pathMap = {
        welcome: mockConfig,
        'welcome.app.name': mockConfig.app.name,
        'welcome.server.port': mockConfig.server.port,
        'welcome.welcome.title': mockConfig.welcome.title,
        'welcome.companyInfo.name': mockConfig.welcome.companyInfo.name,
      };

      if (pathMap.hasOwnProperty(key)) {
        return pathMap[key];
      }

      // 处理以welcome.开头的路径
      if (key.startsWith('welcome.')) {
        const path = key.replace('welcome.', '');
        return path.split('.').reduce((obj, prop) => obj?.[prop], mockConfig);
      }

      return undefined;
    });

    // 设置TemplateService模拟返回值
    mockTemplateService.renderWelcomeTemplate.mockResolvedValue(
      '<html>Mock HTML</html>',
    );

    // 创建测试模块
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WelcomeService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: TemplateService,
          useValue: mockTemplateService,
        },
      ],
    })
      .overrideProvider(Logger)
      .useValue({
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
      })
      .compile();

    service = module.get<WelcomeService>(WelcomeService);
    templateService = module.get<TemplateService>(TemplateService);
    configService = module.get<ConfigService>(ConfigService);

    // 手动触发模块初始化
    await service.onModuleInit();
  });

  /**
   * 基础功能测试
   */
  describe('基础功能', () => {
    it('应该正确定义服务', () => {
      expect(service).toBeDefined();
    });

    it('应该正确初始化服务', async () => {
      // 验证配置验证被调用
      expect(mockConfigService.get).toHaveBeenCalledWith('welcome');

      // 验证服务状态
      const metrics = service.getServiceMetrics();
      expect(metrics.isInitialized).toBe(true);
    });
  });

  /**
   * generateWelcomeHtml 方法测试
   */
  describe('generateWelcomeHtml', () => {
    const testRequestId = 'test-request-123';
    const testClientIp = '192.168.1.1';

    it('应该成功生成欢迎HTML', async () => {
      const result = await service.generateWelcomeHtml(
        testRequestId,
        testClientIp,
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data.html).toBe('<html>Mock HTML</html>');
      expect(result.data.metadata.requestId).toBe(testRequestId);
      expect(result.message).toBe('欢迎页面生成成功');
    });

    it('应该正确更新访问统计', async () => {
      const initialStats = service.getVisitStatistics();
      const initialVisits = initialStats.totalVisits;

      await service.generateWelcomeHtml(testRequestId, testClientIp);

      const updatedStats = service.getVisitStatistics();
      expect(updatedStats.totalVisits).toBe(initialVisits + 1);
      expect(updatedStats.uniqueVisitors).toBe(1);
    });

    it('应该包含正确的系统状态信息', async () => {
      const result = await service.generateWelcomeHtml(
        testRequestId,
        testClientIp,
      );

      expect(result.data.systemStatus).toBeDefined();
      expect(result.data.systemStatus.status).toMatch(/healthy|degraded|down/);
      expect(result.data.systemStatus.uptime).toBeGreaterThanOrEqual(0);
      expect(result.data.systemStatus.memoryUsage).toBeDefined();
      expect(
        result.data.systemStatus.memoryUsage.percentage,
      ).toBeGreaterThanOrEqual(0);
    });

    it('应该处理模板渲染失败', async () => {
      mockTemplateService.renderWelcomeTemplate.mockRejectedValue(
        new Error('Template error'),
      );

      await expect(
        service.generateWelcomeHtml(testRequestId, testClientIp),
      ).rejects.toThrow();
    });

    it('应该记录处理时间', async () => {
      const result = await service.generateWelcomeHtml(
        testRequestId,
        testClientIp,
      );

      expect(result.data.metadata.processingTime).toBeDefined();
      expect(result.data.metadata.processingTime).toBeGreaterThanOrEqual(0);
    });
  });

  /**
   * getSystemStatusInfo 方法测试
   */
  describe('getSystemStatusInfo', () => {
    it('应该成功获取系统状态', async () => {
      const result = await service.getSystemStatusInfo();

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data.status).toMatch(/healthy|degraded|down/);
      expect(result.data.uptime).toBeGreaterThanOrEqual(0);
      expect(result.data.memoryUsage).toBeDefined();
    });

    it('应该更新健康检查计数', async () => {
      const initialMetrics = service.getServiceMetrics();
      const initialCount = initialMetrics.healthCheckCount;

      await service.getSystemStatusInfo();

      const updatedMetrics = service.getServiceMetrics();
      expect(updatedMetrics.healthCheckCount).toBe(initialCount + 1);
    });
  });

  /**
   * getVisitStatistics 方法测试
   */
  describe('getVisitStatistics', () => {
    it('应该返回正确的访问统计', () => {
      const stats = service.getVisitStatistics();

      expect(stats).toBeDefined();
      expect(stats.totalVisits).toBeGreaterThanOrEqual(0);
      expect(stats.uniqueVisitors).toBeGreaterThanOrEqual(0);
      expect(stats.lastVisitTime).toBeDefined();
      expect(stats.dailyVisits).toBeDefined();
    });

    it('应该正确跟踪唯一访客', async () => {
      const ip1 = '192.168.1.1';
      const ip2 = '192.168.1.2';

      await service.generateWelcomeHtml('req1', ip1);
      await service.generateWelcomeHtml('req2', ip1); // 同一IP
      await service.generateWelcomeHtml('req3', ip2); // 不同IP

      const stats = service.getVisitStatistics();
      expect(stats.totalVisits).toBe(3);
      expect(stats.uniqueVisitors).toBe(2); // 两个唯一IP
    });
  });

  /**
   * getServiceMetrics 方法测试
   */
  describe('getServiceMetrics', () => {
    it('应该返回完整的服务指标', () => {
      const metrics = service.getServiceMetrics();

      expect(metrics).toBeDefined();
      expect(metrics.startTime).toBeDefined();
      expect(metrics.lastHealthCheck).toBeDefined();
      expect(metrics.healthCheckCount).toBeGreaterThanOrEqual(0);
      expect(metrics.errorCount).toBeGreaterThanOrEqual(0);
      expect(metrics.uptime).toBeGreaterThanOrEqual(0);
      expect(metrics.isInitialized).toBe(true);
    });
  });

  /**
   * 错误处理测试
   */
  describe('错误处理', () => {
    it('应该处理配置验证失败', async () => {
      // 模拟配置缺失
      mockConfigService.get.mockImplementation((key: string) => {
        if (key === 'welcome.app.name') return undefined;
        return mockConfig;
      });

      // 创建新的服务实例
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          WelcomeService,
          {
            provide: ConfigService,
            useValue: mockConfigService,
          },
          {
            provide: TemplateService,
            useValue: mockTemplateService,
          },
        ],
      }).compile();

      const newService = module.get<WelcomeService>(WelcomeService);

      await expect(newService.onModuleInit()).rejects.toThrow(
        ServiceInitializationException,
      );
    });

    it('应该在服务未初始化时抛出异常', async () => {
      // 创建未初始化的服务实例
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          WelcomeService,
          {
            provide: ConfigService,
            useValue: mockConfigService,
          },
          {
            provide: TemplateService,
            useValue: mockTemplateService,
          },
        ],
      }).compile();

      const uninitializedService = module.get<WelcomeService>(WelcomeService);

      await expect(
        uninitializedService.generateWelcomeHtml('test', '127.0.0.1'),
      ).rejects.toThrow(SystemUnavailableException);
    });
  });

  /**
   * 边界条件测试
   */
  describe('边界条件', () => {
    it('应该处理空的客户端IP', async () => {
      const result = await service.generateWelcomeHtml('test-req', undefined);

      expect(result.success).toBe(true);
      // 访问统计应该仍然增加
      expect(result.data.systemStatus.visitCount).toBeGreaterThan(0);
    });

    it('应该处理空的请求ID', async () => {
      const result = await service.generateWelcomeHtml('', '127.0.0.1');

      expect(result.success).toBe(true);
      expect(result.data.metadata.requestId).toBe('');
    });

    it('应该正确处理内存使用率计算', async () => {
      const result = await service.generateWelcomeHtml('test', '127.0.0.1');

      const memoryUsage = result.data.systemStatus.memoryUsage;
      expect(memoryUsage.percentage).toBeGreaterThanOrEqual(0);
      expect(memoryUsage.percentage).toBeLessThanOrEqual(100);
      expect(memoryUsage.used).toBeGreaterThan(0);
      expect(memoryUsage.total).toBeGreaterThan(0);
    });
  });

  /**
   * 性能测试
   */
  describe('性能测试', () => {
    it('应该在合理时间内完成请求处理', async () => {
      const startTime = Date.now();

      await service.generateWelcomeHtml('perf-test', '127.0.0.1');

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      // 应该在100ms内完成
      expect(processingTime).toBeLessThan(100);
    });

    it('应该能处理并发请求', async () => {
      const promises = Array.from({ length: 10 }, (_, i) =>
        service.generateWelcomeHtml(`concurrent-${i}`, `192.168.1.${i}`),
      );

      const results = await Promise.all(promises);

      expect(results).toHaveLength(10);
      results.forEach((result) => {
        expect(result.success).toBe(true);
      });

      // 检查访问统计
      const stats = service.getVisitStatistics();
      expect(stats.totalVisits).toBeGreaterThanOrEqual(10);
    });
  });
});

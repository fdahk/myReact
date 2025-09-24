/**
 * 测试HTTP控制器层，验证请求处理、参数验证、响应格式等
 * 企业级控制器测试最佳实践
 */
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { WelcomeController } from './welcome.controller';
import { WelcomeService } from '../services/welcome.service';
import {
  WelcomeQueryDto,
  ResponseFormat,
  SystemStatusQueryDto,
} from '../dto/welcome-query.dto';
import {
  WelcomeResponseDto,
  SystemStatusResponseDto,
  SystemStatus,
} from '../dto/welcome-response.dto';

/**
 * 模拟WelcomeService
 */
const mockWelcomeService = {
  generateWelcomeHtml: jest.fn(),
  getSystemStatusInfo: jest.fn(),
  getVisitStatistics: jest.fn(),
  getServiceMetrics: jest.fn(),
};

/**
 * 模拟Request对象
 */
const createMockRequest = (
  overrides: Partial<Request> = {},
): Partial<Request> => ({
  ip: '127.0.0.1',
  connection: { remoteAddress: '127.0.0.1' },
  get: jest.fn((header: string) => {
    const headers: Record<string, string> = {
      'User-Agent': 'Test Agent',
      'X-Forwarded-For': '',
      'X-Real-IP': '',
    };
    return headers[header];
  }),
  ...overrides,
});

/**
 * 模拟响应数据
 */
const mockWelcomeResponse: WelcomeResponseDto = {
  success: true,
  data: {
    html: '<html><body>Welcome</body></html>',
    appInfo: {
      name: 'Test App',
      version: '1.0.0',
      environment: 'test',
      description: 'Test Description',
    },
    welcome: {
      title: 'Welcome',
      subtitle: 'Test Subtitle',
      description: 'Test Description',
      features: ['Feature 1', 'Feature 2'],
    },
    systemStatus: {
      status: SystemStatus.HEALTHY,
      uptime: 3600,
      timestamp: '2024-01-01T00:00:00.000Z',
      visitCount: 10,
      memoryUsage: {
        used: 50,
        total: 100,
        percentage: 50,
      },
    },
    companyInfo: {
      name: 'Test Company',
      website: 'https://test.com',
      supportEmail: 'support@test.com',
    },
    metadata: {
      generatedAt: '2024-01-01T00:00:00.000Z',
      requestId: 'test-request-123',
      version: '1.0.0',
      processingTime: 15,
    },
  },
  message: '欢迎页面生成成功',
  timestamp: '2024-01-01T00:00:00.000Z',
};

const mockSystemStatusResponse: SystemStatusResponseDto = {
  success: true,
  data: {
    status: SystemStatus.HEALTHY,
    uptime: 3600,
    timestamp: '2024-01-01T00:00:00.000Z',
    visitCount: 10,
    memoryUsage: {
      used: 50,
      total: 100,
      percentage: 50,
    },
  },
  message: '系统状态获取成功',
  timestamp: '2024-01-01T00:00:00.000Z',
};

describe('WelcomeController', () => {
  let controller: WelcomeController;
  let service: WelcomeService;

  /**
   * 测试模块设置
   */
  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WelcomeController],
      providers: [
        {
          provide: WelcomeService,
          useValue: mockWelcomeService,
        },
      ],
    }).compile();

    controller = module.get<WelcomeController>(WelcomeController);
    service = module.get<WelcomeService>(WelcomeService);
  });

  /**
   * 基础功能测试
   */
  describe('基础功能', () => {
    it('应该正确定义控制器', () => {
      expect(controller).toBeDefined();
    });
  });

  /**
   * getWelcomePage 方法测试
   */
  describe('getWelcomePage', () => {
    const mockRequest = createMockRequest();

    beforeEach(() => {
      mockWelcomeService.generateWelcomeHtml.mockResolvedValue(
        mockWelcomeResponse,
      );
    });

    it('应该成功处理欢迎页面请求', async () => {
      const query: WelcomeQueryDto = {};

      const result = await controller.getWelcomePage(
        query,
        mockRequest as Request,
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data.html).toBeDefined();
      expect(mockWelcomeService.generateWelcomeHtml).toHaveBeenCalledWith(
        expect.stringMatching(/welcome_\d+_\w+/),
        '127.0.0.1',
      );
    });

    it('应该处理HTML格式请求', async () => {
      const query: WelcomeQueryDto = { format: ResponseFormat.HTML };

      const result = await controller.getWelcomePage(
        query,
        mockRequest as Request,
      );

      expect(result.success).toBe(true);
      expect(result.data.html).toBeDefined();
      // HTML格式应该清空其他数据
      expect(result.data.appInfo).toBeUndefined();
      expect(result.data.welcome).toBeUndefined();
      expect(result.data.companyInfo).toBeUndefined();
    });

    it('应该处理不包含系统状态的请求', async () => {
      const query: WelcomeQueryDto = { includeSystemStatus: false };

      const result = await controller.getWelcomePage(
        query,
        mockRequest as Request,
      );

      expect(result.success).toBe(true);
      expect(result.data.systemStatus).toBeUndefined();
    });

    it('应该正确提取客户端IP - X-Forwarded-For', async () => {
      const requestWithForwarded = createMockRequest({
        get: jest.fn((header: string) => {
          if (header === 'X-Forwarded-For') return '192.168.1.100, 10.0.0.1';
          return '';
        }),
      });

      await controller.getWelcomePage({}, requestWithForwarded as Request);

      expect(mockWelcomeService.generateWelcomeHtml).toHaveBeenCalledWith(
        expect.any(String),
        '192.168.1.100', // 应该取第一个IP
      );
    });

    it('应该正确提取客户端IP - X-Real-IP', async () => {
      const requestWithRealIp = createMockRequest({
        get: jest.fn((header: string) => {
          if (header === 'X-Real-IP') return '192.168.1.200';
          return '';
        }),
      });

      await controller.getWelcomePage({}, requestWithRealIp as Request);

      expect(mockWelcomeService.generateWelcomeHtml).toHaveBeenCalledWith(
        expect.any(String),
        '192.168.1.200',
      );
    });

    it('应该处理IPv6映射的IPv4地址', async () => {
      const requestWithIpv6 = createMockRequest({
        connection: { remoteAddress: '::ffff:192.168.1.1' },
        get: jest.fn(() => ''),
      });

      await controller.getWelcomePage({}, requestWithIpv6 as Request);

      expect(mockWelcomeService.generateWelcomeHtml).toHaveBeenCalledWith(
        expect.any(String),
        '192.168.1.1',
      );
    });

    it('应该处理服务异常', async () => {
      const error = new Error('Service error');
      mockWelcomeService.generateWelcomeHtml.mockRejectedValue(error);

      await expect(
        controller.getWelcomePage({}, mockRequest as Request),
      ).rejects.toThrow('Service error');
    });

    it('应该生成唯一的请求ID', async () => {
      await controller.getWelcomePage({}, mockRequest as Request);
      await controller.getWelcomePage({}, mockRequest as Request);

      const calls = mockWelcomeService.generateWelcomeHtml.mock.calls;
      expect(calls).toHaveLength(2);
      expect(calls[0][0]).not.toBe(calls[1][0]); // 请求ID应该不同
    });
  });

  /**
   * getSystemStatus 方法测试
   */
  describe('getSystemStatus', () => {
    const mockRequest = createMockRequest();

    beforeEach(() => {
      mockWelcomeService.getSystemStatusInfo.mockResolvedValue(
        mockSystemStatusResponse,
      );
    });

    it('应该成功获取系统状态', async () => {
      const query: SystemStatusQueryDto = {};

      const result = await controller.getSystemStatus(
        query,
        mockRequest as Request,
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data.status).toBe(SystemStatus.HEALTHY);
      expect(mockWelcomeService.getSystemStatusInfo).toHaveBeenCalled();
    });

    it('应该处理不包含内存详情的请求', async () => {
      const query: SystemStatusQueryDto = { includeMemoryDetails: false };

      const result = await controller.getSystemStatus(
        query,
        mockRequest as Request,
      );

      expect(result.success).toBe(true);
      expect(result.data.memoryUsage).toBeUndefined();
    });

    it('应该处理服务异常', async () => {
      const error = new Error('Status service error');
      mockWelcomeService.getSystemStatusInfo.mockRejectedValue(error);

      await expect(
        controller.getSystemStatus({}, mockRequest as Request),
      ).rejects.toThrow('Status service error');
    });
  });

  /**
   * getVisitStatistics 方法测试
   */
  describe('getVisitStatistics', () => {
    const mockRequest = createMockRequest();
    const mockStats = {
      totalVisits: 100,
      uniqueVisitors: 50,
      lastVisitTime: '2024-01-01T00:00:00.000Z',
      dailyVisits: { '2024-01-01': 10 },
    };

    beforeEach(() => {
      mockWelcomeService.getVisitStatistics.mockReturnValue(mockStats);
    });

    it('应该成功获取访问统计', async () => {
      const result = await controller.getVisitStatistics(
        mockRequest as Request,
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockStats);
      expect(result.message).toBe('访问统计获取成功');
      expect(mockWelcomeService.getVisitStatistics).toHaveBeenCalled();
    });

    it('应该处理服务异常', async () => {
      const error = new Error('Stats service error');
      mockWelcomeService.getVisitStatistics.mockImplementation(() => {
        throw error;
      });

      await expect(
        controller.getVisitStatistics(mockRequest as Request),
      ).rejects.toThrow('Stats service error');
    });
  });

  /**
   * getServiceMetrics 方法测试
   */
  describe('getServiceMetrics', () => {
    const mockRequest = createMockRequest();
    const mockMetrics = {
      startTime: '2024-01-01T00:00:00.000Z',
      lastHealthCheck: '2024-01-01T01:00:00.000Z',
      healthCheckCount: 10,
      errorCount: 0,
      warningCount: 0,
      uptime: 3600000,
      isInitialized: true,
    };

    beforeEach(() => {
      mockWelcomeService.getServiceMetrics.mockReturnValue(mockMetrics);
    });

    it('应该成功获取服务指标', async () => {
      const result = await controller.getServiceMetrics(mockRequest as Request);

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockMetrics);
      expect(result.message).toBe('服务指标获取成功');
      expect(mockWelcomeService.getServiceMetrics).toHaveBeenCalled();
    });

    it('应该处理服务异常', async () => {
      const error = new Error('Metrics service error');
      mockWelcomeService.getServiceMetrics.mockImplementation(() => {
        throw error;
      });

      await expect(
        controller.getServiceMetrics(mockRequest as Request),
      ).rejects.toThrow('Metrics service error');
    });
  });

  /**
   * healthCheck 方法测试
   */
  describe('healthCheck', () => {
    it('应该返回健康状态', async () => {
      const result = await controller.healthCheck();

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data.status).toBe('healthy');
      expect(result.data.service).toBe('WelcomeService');
      expect(result.message).toBe('服务运行正常');
    });

    it('应该包含时间戳', async () => {
      const result = await controller.healthCheck();

      expect(result.data.timestamp).toBeDefined();
      expect(new Date(result.data.timestamp)).toBeInstanceOf(Date);
    });
  });

  /**
   * 私有方法测试（通过公共方法间接测试）
   */
  describe('私有方法测试', () => {
    it('应该生成有效的请求ID格式', async () => {
      const mockRequest = createMockRequest();

      await controller.getWelcomePage({}, mockRequest as Request);

      const requestId = mockWelcomeService.generateWelcomeHtml.mock.calls[0][0];
      expect(requestId).toMatch(/^welcome_\d+_\w+$/);
    });

    it('应该处理未知IP地址', async () => {
      const requestWithUnknownIp = createMockRequest({
        connection: {},
        get: jest.fn(() => ''),
      });

      await controller.getWelcomePage({}, requestWithUnknownIp as Request);

      expect(mockWelcomeService.generateWelcomeHtml).toHaveBeenCalledWith(
        expect.any(String),
        'unknown',
      );
    });
  });

  /**
   * 参数验证测试
   */
  describe('参数验证', () => {
    const mockRequest = createMockRequest();

    it('应该接受有效的查询参数', async () => {
      const validQuery: WelcomeQueryDto = {
        format: ResponseFormat.BOTH,
        includeSystemStatus: true,
        includeVisitStats: true,
        clientId: 'test-client',
        theme: 'dark',
        lang: 'zh-CN',
      };

      mockWelcomeService.generateWelcomeHtml.mockResolvedValue(
        mockWelcomeResponse,
      );

      const result = await controller.getWelcomePage(
        validQuery,
        mockRequest as Request,
      );
      expect(result.success).toBe(true);
    });

    it('应该使用默认参数值', async () => {
      const emptyQuery: WelcomeQueryDto = {};

      mockWelcomeService.generateWelcomeHtml.mockResolvedValue(
        mockWelcomeResponse,
      );

      const result = await controller.getWelcomePage(
        emptyQuery,
        mockRequest as Request,
      );
      expect(result.success).toBe(true);
    });
  });

  /**
   * 错误处理测试
   */
  describe('错误处理', () => {
    const mockRequest = createMockRequest();

    it('应该正确传播服务层异常', async () => {
      const serviceError = new Error('Service layer error');
      mockWelcomeService.generateWelcomeHtml.mockRejectedValue(serviceError);

      await expect(
        controller.getWelcomePage({}, mockRequest as Request),
      ).rejects.toThrow('Service layer error');
    });

    it('应该处理异步操作异常', async () => {
      mockWelcomeService.getSystemStatusInfo.mockRejectedValue(
        new Error('Async error'),
      );

      await expect(
        controller.getSystemStatus({}, mockRequest as Request),
      ).rejects.toThrow('Async error');
    });
  });
});

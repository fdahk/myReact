import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { WelcomeModule } from '../src/welcome/welcome.module';
// import { App } from 'supertest/types';

describe('WelcomeController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;

  // 创建完整的应用实例进行集成测试
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // 配置全局管道，与生产环境保持一致
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
    httpServer = app.getHttpServer();
  });

  // 清理资源
  afterAll(async () => {
    await app.close();
  });

  // API测试
  describe('/api/welcome (GET)', () => {
    it('应该返回完整的欢迎页面数据', async () => {
      const response = await request(httpServer)
        .get('/api/welcome')
        .expect(200);

      // 验证响应结构
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');

      // 验证数据结构
      const { data } = response.body;
      expect(data).toHaveProperty('html');
      expect(data).toHaveProperty('appInfo');
      expect(data).toHaveProperty('welcome');
      expect(data).toHaveProperty('systemStatus');
      expect(data).toHaveProperty('companyInfo');
      expect(data).toHaveProperty('metadata');

      // 验证HTML内容
      expect(data.html).toContain('<!DOCTYPE html>');
      expect(data.html).toContain('企业级Nest.js应用');

      // 验证应用信息
      expect(data.appInfo).toHaveProperty('name');
      expect(data.appInfo).toHaveProperty('version');
      expect(data.appInfo).toHaveProperty('environment');

      // 验证系统状态
      expect(data.systemStatus).toHaveProperty('status');
      expect(data.systemStatus.status).toMatch(/healthy|degraded|down/);
      expect(data.systemStatus).toHaveProperty('uptime');
      expect(data.systemStatus).toHaveProperty('visitCount');
      expect(data.systemStatus).toHaveProperty('memoryUsage');

      // 验证元数据
      expect(data.metadata).toHaveProperty('generatedAt');
      expect(data.metadata).toHaveProperty('requestId');
      expect(data.metadata).toHaveProperty('version');
    });

    it('应该支持HTML格式请求', async () => {
      const response = await request(httpServer)
        .get('/api/welcome?format=html')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.html).toBeDefined();

      // HTML格式应该清空其他数据
      expect(response.body.data.appInfo).toBeUndefined();
      expect(response.body.data.welcome).toBeUndefined();
      expect(response.body.data.companyInfo).toBeUndefined();
    });

    it('应该支持不包含系统状态的请求', async () => {
      const response = await request(httpServer)
        .get('/api/welcome?includeSystemStatus=false')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.systemStatus).toBeUndefined();
    });

    it('应该正确处理查询参数', async () => {
      const response = await request(httpServer)
        .get('/api/welcome')
        .query({
          format: 'both',
          includeSystemStatus: 'true',
          includeVisitStats: 'true',
          clientId: 'test-client-123',
          theme: 'dark',
          lang: 'zh-CN',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });

    it('应该拒绝无效的查询参数', async () => {
      await request(httpServer)
        .get('/api/welcome')
        .query({
          format: 'invalid-format',
          unknownParam: 'should-be-filtered',
        })
        .expect(400);
    });

    it('应该正确设置响应头', async () => {
      const response = await request(httpServer)
        .get('/api/welcome')
        .expect(200);

      expect(response.headers['content-type']).toMatch(/application\/json/);
    });
  });

  // 系统状态API测试
  describe('/api/welcome/status (GET)', () => {
    it('应该返回系统状态信息', async () => {
      const response = await request(httpServer)
        .get('/api/welcome/status')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message', '系统状态获取成功');

      const { data } = response.body;
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('uptime');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('visitCount');
      expect(data).toHaveProperty('memoryUsage');

      // 验证数据类型
      expect(typeof data.uptime).toBe('number');
      expect(typeof data.visitCount).toBe('number');
      expect(data.memoryUsage).toHaveProperty('used');
      expect(data.memoryUsage).toHaveProperty('total');
      expect(data.memoryUsage).toHaveProperty('percentage');
    });

    it('应该支持不包含内存详情的请求', async () => {
      const response = await request(httpServer)
        .get('/api/welcome/status?includeMemoryDetails=false')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.memoryUsage).toBeUndefined();
    });

    it('应该处理历史数据查询参数', async () => {
      const response = await request(httpServer)
        .get('/api/welcome/status')
        .query({
          includeMemoryDetails: 'true',
          includeHistory: 'false',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.memoryUsage).toBeDefined();
    });
  });

  // 访问统计API测试
  describe('/api/welcome/stats (GET)', () => {
    it('应该返回访问统计信息', async () => {
      const response = await request(httpServer)
        .get('/api/welcome/stats')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message', '访问统计获取成功');

      const { data } = response.body;
      expect(data).toHaveProperty('totalVisits');
      expect(data).toHaveProperty('uniqueVisitors');
      expect(data).toHaveProperty('lastVisitTime');
      expect(data).toHaveProperty('dailyVisits');

      // 验证数据类型
      expect(typeof data.totalVisits).toBe('number');
      expect(typeof data.uniqueVisitors).toBe('number');
      expect(typeof data.dailyVisits).toBe('object');
    });

    it('访问统计应该随请求增加', async () => {
      // 获取初始统计
      const initialResponse = await request(httpServer)
        .get('/api/welcome/stats')
        .expect(200);

      const initialVisits = initialResponse.body.data.totalVisits;

      // 发起几次欢迎页面请求
      await request(httpServer).get('/api/welcome').expect(200);
      await request(httpServer).get('/api/welcome').expect(200);

      // 再次获取统计
      const updatedResponse = await request(httpServer)
        .get('/api/welcome/stats')
        .expect(200);

      const updatedVisits = updatedResponse.body.data.totalVisits;
      expect(updatedVisits).toBeGreaterThan(initialVisits);
    });
  });

  // 服务指标API测试
  describe('/api/welcome/metrics (GET)', () => {
    it('应该返回服务监控指标', async () => {
      const response = await request(httpServer)
        .get('/api/welcome/metrics')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message', '服务指标获取成功');

      const { data } = response.body;
      expect(data).toHaveProperty('startTime');
      expect(data).toHaveProperty('lastHealthCheck');
      expect(data).toHaveProperty('healthCheckCount');
      expect(data).toHaveProperty('errorCount');
      expect(data).toHaveProperty('uptime');
      expect(data).toHaveProperty('isInitialized');

      // 验证数据类型和值
      expect(typeof data.healthCheckCount).toBe('number');
      expect(typeof data.errorCount).toBe('number');
      expect(typeof data.uptime).toBe('number');
      expect(data.isInitialized).toBe(true);
    });
  });

  // 健康检查API测试
  describe('/api/welcome/health (GET)', () => {
    it('应该返回健康状态', async () => {
      const response = await request(httpServer)
        .get('/api/welcome/health')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message', '服务运行正常');

      const { data } = response.body;
      expect(data).toHaveProperty('status', 'healthy');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('service', 'WelcomeService');
    });

    it('健康检查应该快速响应', async () => {
      const startTime = Date.now();

      await request(httpServer).get('/api/welcome/health').expect(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(100); // 应该在100ms内响应
    });
  });

  // 错误处理测试
  describe('错误处理', () => {
    it('应该处理不存在的路由', async () => {
      const response = await request(httpServer)
        .get('/api/welcome/nonexistent')
        .expect(404);

      // Nest.js默认404响应格式
      expect(response.body).toHaveProperty('statusCode', 404);
    });

    it('应该验证查询参数类型', async () => {
      await request(httpServer)
        .get('/api/welcome')
        .query({ includeSystemStatus: 'invalid-boolean' })
        .expect(400);
    });

    it('应该处理无效的枚举值', async () => {
      await request(httpServer)
        .get('/api/welcome')
        .query({ format: 'invalid-format' })
        .expect(400);
    });
  });

  // 性能测试
  describe('性能测试', () => {
    it('欢迎页面应该在合理时间内响应', async () => {
      const startTime = Date.now();

      await request(httpServer).get('/api/welcome').expect(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(500); // 应该在500ms内响应
    });

    it('应该能处理并发请求', async () => {
      const promises = Array.from({ length: 10 }, () =>
        request(httpServer).get('/api/welcome').expect(200),
      );

      const responses = await Promise.all(promises);

      // 验证所有请求都成功
      responses.forEach((response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.data.html).toBeDefined();
      });

      // 验证每个请求都有唯一的requestId
      const requestIds = responses.map((r) => r.body.data.metadata.requestId);
      const uniqueIds = new Set(requestIds);
      expect(uniqueIds.size).toBe(requestIds.length);
    });

    it('系统状态检查应该快速响应', async () => {
      const startTime = Date.now();

      await request(httpServer).get('/api/welcome/status').expect(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(100);
    });
  });

  // 功能集成测试
  describe('功能集成', () => {
    it('应该正确跟踪访问统计', async () => {
      // 获取初始统计
      const initialStats = await request(httpServer)
        .get('/api/welcome/stats')
        .expect(200);

      const initialVisits = initialStats.body.data.totalVisits;

      // 模拟多次访问
      await request(httpServer).get('/api/welcome').expect(200);
      await request(httpServer).get('/api/welcome').expect(200);
      await request(httpServer).get('/api/welcome').expect(200);

      // 检查统计更新
      const updatedStats = await request(httpServer)
        .get('/api/welcome/stats')
        .expect(200);

      const updatedVisits = updatedStats.body.data.totalVisits;
      expect(updatedVisits).toBe(initialVisits + 3);
    });

    it('系统状态应该反映实际运行情况', async () => {
      // 获取系统状态
      const statusResponse = await request(httpServer)
        .get('/api/welcome/status')
        .expect(200);

      const status = statusResponse.body.data;

      // 验证运行时间合理性
      expect(status.uptime).toBeGreaterThan(0);

      // 验证内存使用率在合理范围内
      expect(status.memoryUsage.percentage).toBeGreaterThan(0);
      expect(status.memoryUsage.percentage).toBeLessThan(100);

      // 验证访问计数与实际请求一致
      expect(status.visitCount).toBeGreaterThan(0);
    });

    it('服务指标应该随操作更新', async () => {
      // 获取初始指标
      const initialMetrics = await request(httpServer)
        .get('/api/welcome/metrics')
        .expect(200);

      const initialHealthChecks = initialMetrics.body.data.healthCheckCount;

      // 执行健康检查
      await request(httpServer).get('/api/welcome/status').expect(200);
      await request(httpServer).get('/api/welcome/status').expect(200);

      // 检查指标更新
      const updatedMetrics = await request(httpServer)
        .get('/api/welcome/metrics')
        .expect(200);

      const updatedHealthChecks = updatedMetrics.body.data.healthCheckCount;
      expect(updatedHealthChecks).toBeGreaterThan(initialHealthChecks);
    });
  });

  // HTTP头测试
  describe('HTTP头处理', () => {
    it('应该正确处理X-Forwarded-For头', async () => {
      await request(httpServer)
        .get('/api/welcome')
        .set('X-Forwarded-For', '192.168.1.100, 10.0.0.1')
        .expect(200);

      // 验证访问统计记录了正确的IP
      const stats = await request(httpServer)
        .get('/api/welcome/stats')
        .expect(200);

      expect(stats.body.data.uniqueVisitors).toBeGreaterThan(0);
    });

    it('应该正确处理User-Agent头', async () => {
      await request(httpServer)
        .get('/api/welcome')
        .set('User-Agent', 'Test Agent E2E')
        .expect(200);
    });

    it('应该设置正确的Content-Type', async () => {
      const response = await request(httpServer)
        .get('/api/welcome')
        .expect(200);

      expect(response.headers['content-type']).toMatch(/application\/json/);
    });
  });
});

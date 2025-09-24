// NestJS测试工具，Test: 用于创建测试模块和应用实例
import { Test, TestingModule } from '@nestjs/testing';
// NestJS应用接口类型，INestApplication: 用于创建NestJS应用实例
import { INestApplication } from '@nestjs/common';
// 导入supertest库，用于HTTP接口测试
import * as request from 'supertest';
// supertest的App类型定义，App: 用于定义supertest的App类型
import { App } from 'supertest/types';
// 应用的根模块，AppModule: 用于导入应用的根模块
import { AppModule } from './../src/app.module';

// 描述AppController的端到端测试套件 (Jest测试框架的describe函数)，describe('AppController (e2e)'): 描述AppController的端到端测试套件 (Jest测试框架的describe函数)
describe('AppController (e2e)', () => {
  // 声明应用实例变量，用于存储NestJS应用，let app: INestApplication<App>;
  let app: INestApplication<App>;

  // Jest的生命周期钩子：在每个测试用例执行前运行
  beforeEach(async () => {
    // 创建测试模块，导入AppModule进行测试
    // 1.Test.createTestingModule()：NestJS测试工具提供的静态方法，用于创建一个测试专用的模块构建器
    // 目的：创建一个独立的测试环境，与生产环境隔离
    // 返回值：返回一个TestingModuleBuilder实例，用于配置测试模块
    // 2.imports: [AppModule]：
    // imports配置项：指定要导入的模块数组
    // AppModule：应用的根模块，包含了整个应用的所有依赖、控制器、服务
    // 作用：将整个应用的模块结构导入到测试环境中，确保测试能够访问到所有的组件
    // 3..compile()方法：编译测试模块，解析所有依赖关系
    // 异步操作：返回Promise，因为需要时间来实例化所有服务和解析依赖注入
    // 结果：返回TestingModule实例，包含了完整的应用模块结构
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 从测试模块创建NestJS应用实例
    app = moduleFixture.createNestApplication();
    // 初始化应用，启动所有模块和服务
    await app.init();
  });

  // it('/ (GET)'): Jest的测试用例函数：含义：测试根路径GET请求
  it('/ (GET)', () => {
    // 使用supertest发送HTTP请求到应用服务器
    return request(app.getHttpServer())
      .get('/') // supertest方法：发送GET请求到根路径
      .expect(200) // supertest断言：期望HTTP状态码为200
      .expect('Hello World!'); // supertest断言：期望响应体内容为'Hello World!'
  });
});

// AppController的单元测试文件，测试控制器方法的功能
// 导入NestJS测试工具，用于创建测试模块
import { Test, TestingModule } from '@nestjs/testing';
// 导入要测试的控制器类
import { AppController } from './app.controller';
// 导入控制器依赖的服务类
import { AppService } from './app.service';

// Jest测试套件：描述AppController的测试
describe('AppController', () => {
  // 声明控制器实例变量，用于测试
  let appController: AppController;

  // Jest生命周期钩子：每个测试用例执行前运行
  beforeEach(async () => {
    // 创建测试模块，配置控制器和服务提供者
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // 注册要测试的控制器
      providers: [AppService], // 注册控制器依赖的服务
    }).compile(); // 编译测试模块

    // 从测试模块获取控制器实例
    appController = app.get<AppController>(AppController);
  });

  // 嵌套测试套件：测试根路径相关功能
  describe('root', () => {
    // 单个测试用例：验证getHello方法返回值
    it('should return "Hello World!"', () => {
      // Jest断言：验证方法返回值是否等于期望值
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

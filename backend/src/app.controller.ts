// 应用控制器，处理HTTP请求并返回响应
// 导入Controller装饰器用于定义控制器，Get装饰器用于处理GET请求
import { Controller, Get } from '@nestjs/common';
// 导入应用服务类，用于处理业务逻辑
import { AppService } from './app.service';

// 使用Controller装饰器标记该类为控制器，默认路由为根路径
@Controller()
// 导出AppController类，处理应用的HTTP请求
export class AppController {
  // 构造函数，通过依赖注入获取AppService实例
  constructor(private readonly appService: AppService) {}

  // 使用Get装饰器处理GET请求到根路径
  @Get()
  // 定义getHello方法，返回字符串类型
  getHello(): string {
    // 调用服务层的getHello方法并返回结果
    return this.appService.getHello();
  }
}

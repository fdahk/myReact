// 应用服务类，包含业务逻辑处理
// 导入Injectable装饰器，用于标记可注入的服务类
import { Injectable } from '@nestjs/common';

// 使用Injectable装饰器标记该类为可注入的服务
@Injectable()
// 导出AppService类，提供应用的核心业务逻辑
export class AppService {
  // 定义getHello方法，返回字符串类型
  getHello(): string {
    // 返回固定的问候语字符串
    return 'Hello World!';
  }
}

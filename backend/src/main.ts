// 应用程序入口文件
// 导入NestJS核心工厂类，用于创建应用实例
import { NestFactory } from '@nestjs/core';
// 导入应用的根模块
import { AppModule } from './app.module';

// 定义异步启动函数
async function bootstrap() {
  // 使用NestFactory创建应用实例，传入根模块AppModule
  const app = await NestFactory.create(AppModule);
  // 启动HTTP服务器，监听环境变量PORT或默认3000端口
  await app.listen(process.env.PORT ?? 3000);
}
// 调用启动函数，开始运行应用
bootstrap();

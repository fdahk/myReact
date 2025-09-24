// 应用根模块，组织和配置整个应用的结构
// 导入Module装饰器，用于定义NestJS模块
import { Module } from '@nestjs/common';
// 导入配置管理模块
import { ConfigModule } from '@nestjs/config';
// 导入应用控制器类
import { AppController } from './app.controller';
// 导入应用服务类
import { AppService } from './app.service';
// 导入欢迎功能模块
import { WelcomeModule } from './welcome/welcome.module';
// 导入环境变量验证
import {
  EnvironmentVariables,
  validateEnvironment,
} from './config/env.validation';

// 使用Module装饰器配置模块元数据,用于配置模块的控制器、服务提供者等
@Module({
  imports: [
    // 配置管理模块 - 提供全局配置服务
    ConfigModule.forRoot({
      // 全局可用，无需在其他模块中重复导入
      isGlobal: true,

      // 环境变量验证
      validationSchema: EnvironmentVariables,
      validate: validateEnvironment,

      // 缓存配置，提升性能
      cache: true,

      // 展开环境变量，支持嵌套配置
      expandVariables: true,

      // 配置文件加载（可选）
      // envFilePath: ['.env.local', '.env'],

      // 忽略环境变量文件（如果只使用系统环境变量）
      // ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),

    // 欢迎功能模块 - 企业级功能模块示例
    WelcomeModule,

    // 其他模块可以在这里导入
    // 例如：AuthModule, UsersModule, DatabaseModule等
  ],

  controllers: [AppController], // 注册控制器，处理HTTP请求
  providers: [AppService], // 注册服务提供者，提供业务逻辑
})
// 导出AppModule类作为应用的根模块
export class AppModule {
  /**
   * 根模块构造函数
   * 可以在这里执行全局初始化逻辑
   */
  constructor() {
    console.log('🚀 AppModule 已加载 - 企业级Nest.js应用启动');
    console.log(`📦 运行环境: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 服务端口: ${process.env.PORT || 3000}`);
  }
}

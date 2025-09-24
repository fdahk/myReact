/**
 * 欢迎功能模块
 * 整合所有欢迎功能相关的组件，提供完整的模块化封装
 * 展示企业级Nest.js模块设计和依赖注入最佳实践
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

// 导入配置
import welcomeConfig from '../config/welcome.config';

// 导入控制器
import { WelcomeController } from './controllers/welcome.controller';

// 导入服务
import { WelcomeService } from './services/welcome.service';
import { TemplateService } from './services/template.service';

// 导入过滤器
import { GlobalExceptionFilter } from './filters/global-exception.filter';

/**
 * 欢迎功能模块类
 *
 * 模块职责：
 * 1. 整合欢迎功能的所有组件
 * 2. 配置依赖注入关系
 * 3. 导出可供其他模块使用的服务
 * 4. 注册全局过滤器和拦截器
 *
 * 架构特点：
 * - 单一职责：专注于欢迎功能
 * - 高内聚：相关组件聚合在一起
 * - 低耦合：通过接口与外部模块交互
 * - 可测试：所有依赖都可以被模拟
 */
@Module({
  /**
   * 导入的模块
   * 配置当前模块依赖的其他模块
   */
  imports: [
    // 配置管理模块 - 提供类型安全的配置服务
    ConfigModule.forFeature(welcomeConfig),

    // 如果需要，可以在这里导入其他模块
    // 例如：数据库模块、缓存模块、日志模块等
  ],

  /**
   * 控制器列表
   * 注册处理HTTP请求的控制器
   */
  controllers: [
    WelcomeController, // 欢迎功能API控制器
  ],

  /**
   * 服务提供者列表
   * 配置依赖注入容器中的服务
   */
  providers: [
    // 核心业务服务
    WelcomeService,

    // 模板渲染服务
    TemplateService,

    // 全局异常过滤器
    // 使用APP_FILTER令牌将其注册为全局过滤器
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },

    // 如果需要，可以在这里添加其他服务
    // 例如：缓存服务、通知服务、监控服务等

    // 示例：自定义提供者配置
    // {
    //   provide: 'CUSTOM_CONFIG',
    //   useValue: { key: 'value' },
    // },

    // 示例：工厂提供者
    // {
    //   provide: 'CUSTOM_SERVICE',
    //   useFactory: (config: ConfigService) => {
    //     return new CustomService(config);
    //   },
    //   inject: [ConfigService],
    // },
  ],

  /**
   * 导出的服务列表
   * 定义可供其他模块使用的服务
   *
   * 这些服务可以被导入此模块的其他模块使用
   * 遵循最小暴露原则，只导出必要的服务
   */
  exports: [
    WelcomeService, // 导出核心业务服务，供其他模块使用
    TemplateService, // 导出模板服务，可用于其他需要HTML生成的场景

    // 注意：通常不导出控制器，因为控制器是模块的内部实现
    // 注意：全局过滤器不需要导出，因为它们是全局生效的
  ],
})
export class WelcomeModule {
  /**
   * 模块构造函数
   * 可以在这里执行模块初始化逻辑
   *
   * 注意：
   * - 避免在构造函数中执行复杂的初始化逻辑
   * - 复杂的初始化应该在OnModuleInit钩子中执行
   * - 构造函数主要用于依赖注入
   */
  constructor() {
    // 模块初始化日志
    console.log('🎉 WelcomeModule 已加载');
  }

  /**
   * 模块配置方法（可选）
   * 提供动态配置模块的能力
   *
   * 这是一个高级特性，用于创建动态模块
   * 在大多数情况下不需要使用
   */
  // static forRoot(config: WelcomeModuleConfig): DynamicModule {
  //   return {
  //     module: WelcomeModule,
  //     providers: [
  //       {
  //         provide: 'WELCOME_CONFIG',
  //         useValue: config,
  //       },
  //       ...this.createProviders(),
  //     ],
  //     exports: ['WELCOME_CONFIG'],
  //   };
  // }

  /**
   * 异步模块配置方法（可选）
   * 支持异步配置加载
   */
  // static forRootAsync(options: WelcomeModuleAsyncOptions): DynamicModule {
  //   return {
  //     module: WelcomeModule,
  //     imports: options.imports || [],
  //     providers: [
  //       ...this.createAsyncProviders(options),
  //       ...this.createProviders(),
  //     ],
  //     exports: ['WELCOME_CONFIG'],
  //   };
  // }
}

/**
 * 模块设计说明：
 *
 * 1. **单一职责原则**
 *    - 每个模块只负责一个业务领域
 *    - WelcomeModule专注于欢迎页面功能
 *
 * 2. **依赖注入**
 *    - 所有依赖通过构造函数注入
 *    - 使用接口抽象，便于测试和替换
 *
 * 3. **模块边界**
 *    - 明确定义模块的输入（imports）和输出（exports）
 *    - 避免模块间的循环依赖
 *
 * 4. **配置管理**
 *    - 使用ConfigModule管理配置
 *    - 支持环境变量和配置文件
 *
 * 5. **异常处理**
 *    - 全局异常过滤器统一处理异常
 *    - 自定义异常类型提供详细错误信息
 *
 * 6. **日志记录**
 *    - 结构化日志记录
 *    - 链路追踪和性能监控
 *
 * 7. **测试友好**
 *    - 所有依赖都可以被模拟
 *    - 支持单元测试和集成测试
 */

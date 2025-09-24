// 配置管理文件，为功能模块提供类型安全的配置服务
// NestJS特点：
// 使用 @nestjs/config 包
// registerAs 函数注册命名配置
// 依赖注入系统集成
// TypeScript原生支持
// 装饰器模式
// 其他后端项目一般只是简单的配置
import { registerAs } from '@nestjs/config'; // 注册配置，用于将配置注册为可注入的提供者

// 接口
export interface WelcomeConfig {
  // 应用基础信息
  app: {
    name: string;
    version: string;
    environment: 'development' | 'production' | 'test';
    description: string;
  };

  // 服务器配置
  server: {
    port: number;
    host: string;
    apiPrefix: string;
  };

  // 欢迎页面配置
  welcome: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    companyInfo: {
      name: string;
      website: string;
      supportEmail: string;
    };
  };

  // 系统监控配置
  monitoring: {
    enableHealthCheck: boolean;
    enableMetrics: boolean;
    logLevel: 'error' | 'warn' | 'info' | 'debug';
  };
}

// 配置工厂函数，使用registerAs注册命名配置，便于依赖注入和模块化管理,将配置转换为类型安全的配置对象
export default registerAs(
  'welcome', // 配置名称
  (): WelcomeConfig => ({
    // 应用基础信息
    app: {
      name: process.env.APP_NAME || 'Enterprise Nest.js Application',
      version: process.env.APP_VERSION || '1.0.0',
      environment: (process.env.NODE_ENV as any) || 'development',
      description: process.env.APP_DESCRIPTION || '企业级Nest.js应用示例',
    },

    // 服务器配置
    server: {
      port: parseInt(process.env.PORT || '3000', 10),
      host: process.env.HOST || 'localhost',
      apiPrefix: process.env.API_PREFIX || 'api',
    },

    // 功能配置
    welcome: {
      title: process.env.WELCOME_TITLE || 'Nest.js应用',
      subtitle: process.env.WELCOME_SUBTITLE || '现代化后端方案',
      description:
        process.env.WELCOME_DESCRIPTION ||
        'Nest.js开发实践，包括模块化架构、依赖注入、异常处理、配置管理等核心特性。',
      features: [
        '模块化架构设计',
        '依赖注入容器',
        '全局异常处理',
        '类型安全配置管理',
        '结构化日志记录',
        '完整测试覆盖',
        'API文档生成',
        '高性能异步处理',
      ],
      companyInfo: {
        name: process.env.COMPANY_NAME || 'XXX',
        website: process.env.COMPANY_WEBSITE || 'XXX',
        supportEmail: process.env.SUPPORT_EMAIL || 'XXX',
      },
    },

    // 系统监控配置
    monitoring: {
      enableHealthCheck: process.env.ENABLE_HEALTH_CHECK !== 'false',
      enableMetrics: process.env.ENABLE_METRICS !== 'false',
      logLevel: (process.env.LOG_LEVEL as any) || 'info',
    },
  }),
);

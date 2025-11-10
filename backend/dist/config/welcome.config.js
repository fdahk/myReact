"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('welcome', () => ({
    app: {
        name: process.env.APP_NAME || 'Enterprise Nest.js Application',
        version: process.env.APP_VERSION || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        description: process.env.APP_DESCRIPTION || '企业级Nest.js应用示例',
    },
    server: {
        port: parseInt(process.env.PORT || '3000', 10),
        host: process.env.HOST || 'localhost',
        apiPrefix: process.env.API_PREFIX || 'api',
    },
    welcome: {
        title: process.env.WELCOME_TITLE || '🎉 欢迎使用企业级Nest.js应用',
        subtitle: process.env.WELCOME_SUBTITLE || '现代化、可扩展、高性能的后端解决方案',
        description: process.env.WELCOME_DESCRIPTION ||
            '本应用展示了企业级Nest.js开发的最佳实践，包括模块化架构、依赖注入、异常处理、配置管理等核心特性。',
        features: [
            '🏗️ 模块化架构设计',
            '💉 依赖注入容器',
            '🛡️ 全局异常处理',
            '⚙️ 类型安全配置管理',
            '📊 结构化日志记录',
            '🧪 完整测试覆盖',
            '📚 API文档生成',
            '🚀 高性能异步处理'
        ],
        companyInfo: {
            name: process.env.COMPANY_NAME || 'Your Company Name',
            website: process.env.COMPANY_WEBSITE || 'https://your-company.com',
            supportEmail: process.env.SUPPORT_EMAIL || 'support@your-company.com',
        },
    },
    monitoring: {
        enableHealthCheck: process.env.ENABLE_HEALTH_CHECK !== 'false',
        enableMetrics: process.env.ENABLE_METRICS !== 'false',
        logLevel: process.env.LOG_LEVEL || 'info',
    },
}));
//# sourceMappingURL=welcome.config.js.map
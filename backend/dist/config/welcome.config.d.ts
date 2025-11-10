export interface WelcomeConfig {
    app: {
        name: string;
        version: string;
        environment: 'development' | 'production' | 'test';
        description: string;
    };
    server: {
        port: number;
        host: string;
        apiPrefix: string;
    };
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
    monitoring: {
        enableHealthCheck: boolean;
        enableMetrics: boolean;
        logLevel: 'error' | 'warn' | 'info' | 'debug';
    };
}
declare const _default: (() => WelcomeConfig) & import("@nestjs/config").ConfigFactoryKeyHost<WelcomeConfig>;
export default _default;

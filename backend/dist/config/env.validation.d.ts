export declare class EnvironmentVariables {
    APP_NAME?: string;
    APP_VERSION?: string;
    NODE_ENV?: 'development' | 'production' | 'test';
    APP_DESCRIPTION?: string;
    PORT?: number;
    HOST?: string;
    API_PREFIX?: string;
    WELCOME_TITLE?: string;
    WELCOME_SUBTITLE?: string;
    WELCOME_DESCRIPTION?: string;
    COMPANY_NAME?: string;
    COMPANY_WEBSITE?: string;
    SUPPORT_EMAIL?: string;
    ENABLE_HEALTH_CHECK?: boolean;
    ENABLE_METRICS?: boolean;
    LOG_LEVEL?: 'error' | 'warn' | 'info' | 'debug';
}
export declare function validateEnvironment(config: Record<string, unknown>): Record<string, unknown>;

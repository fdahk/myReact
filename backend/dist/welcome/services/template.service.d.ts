import { ConfigService } from '@nestjs/config';
export interface WelcomeTemplateData {
    appInfo: {
        name: string;
        version: string;
        environment: string;
        description: string;
    };
    welcome: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
    };
    systemStatus: {
        status: 'healthy' | 'degraded' | 'down';
        uptime: number;
        timestamp: string;
        visitCount: number;
        memoryUsage: {
            used: number;
            total: number;
            percentage: number;
        };
    };
    companyInfo: {
        name: string;
        website: string;
        supportEmail: string;
    };
    metadata: {
        generatedAt: string;
        requestId: string;
        version: string;
    };
}
export declare class TemplateService {
    private readonly configService;
    private readonly logger;
    private readonly templateCache;
    private readonly cacheEnabled;
    constructor(configService: ConfigService);
    renderWelcomeTemplate(data: WelcomeTemplateData, requestId: string): Promise<string>;
    private getTemplate;
    private generateWelcomeTemplate;
    private renderTemplate;
    private getNestedValue;
    private validateTemplateData;
    clearTemplateCache(): void;
    getCacheStats(): {
        size: number;
        entries: Array<{
            name: string;
            hitCount: number;
            lastModified: string;
        }>;
    };
}

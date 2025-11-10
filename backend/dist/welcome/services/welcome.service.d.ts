import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TemplateService } from './template.service';
import { WelcomeResponseDto, SystemStatusResponseDto } from '../dto/welcome-response.dto';
export declare class WelcomeService implements OnModuleInit {
    private readonly configService;
    private readonly templateService;
    private readonly logger;
    private visitStats;
    private systemMetrics;
    private isInitialized;
    constructor(configService: ConfigService, templateService: TemplateService);
    onModuleInit(): Promise<void>;
    generateWelcomeHtml(requestId: string, clientIp?: string): Promise<WelcomeResponseDto>;
    getSystemStatusInfo(): Promise<SystemStatusResponseDto>;
    getVisitStatistics(): {
        totalVisits: number;
        uniqueVisitors: number;
        lastVisitTime: string;
        dailyVisits: {
            [k: string]: number;
        };
    };
    getServiceMetrics(): {
        startTime: string;
        lastHealthCheck: string;
        uptime: number;
        isInitialized: boolean;
        healthCheckCount: number;
        errorCount: number;
        warningCount: number;
    };
    private validateConfiguration;
    private checkServiceAvailability;
    private updateVisitStatistics;
    private getSystemStatus;
    private prepareTemplateData;
    private initializeMetrics;
    private setupScheduledTasks;
    private cleanupOldDailyStats;
}

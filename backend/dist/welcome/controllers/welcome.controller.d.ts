import type { Request } from 'express';
import { WelcomeService } from '../services/welcome.service';
import { WelcomeQueryDto, SystemStatusQueryDto } from '../dto/welcome-query.dto';
import { WelcomeResponseDto, SystemStatusResponseDto } from '../dto/welcome-response.dto';
export declare class WelcomeController {
    private readonly welcomeService;
    private readonly logger;
    constructor(welcomeService: WelcomeService);
    getWelcomePage(query: WelcomeQueryDto, request: Request): Promise<WelcomeResponseDto>;
    getSystemStatus(query: SystemStatusQueryDto, request: Request): Promise<SystemStatusResponseDto>;
    getVisitStatistics(request: Request): Promise<{
        success: boolean;
        data: {
            totalVisits: number;
            uniqueVisitors: number;
            lastVisitTime: string;
            dailyVisits: {
                [k: string]: number;
            };
        };
        message: string;
        timestamp: string;
    }>;
    getServiceMetrics(request: Request): Promise<{
        success: boolean;
        data: {
            startTime: string;
            lastHealthCheck: string;
            uptime: number;
            isInitialized: boolean;
            healthCheckCount: number;
            errorCount: number;
            warningCount: number;
        };
        message: string;
        timestamp: string;
    }>;
    healthCheck(): Promise<{
        success: boolean;
        data: {
            status: string;
            timestamp: string;
            service: string;
        };
        message: string;
    }>;
    private generateRequestId;
    private extractClientIp;
}

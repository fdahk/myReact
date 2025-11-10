export declare enum SystemStatus {
    HEALTHY = "healthy",
    DEGRADED = "degraded",
    DOWN = "down"
}
export declare class MemoryUsageDto {
    used: number;
    total: number;
    percentage: number;
}
export declare class SystemStatusDto {
    status: SystemStatus;
    uptime: number;
    timestamp: string;
    visitCount: number;
    memoryUsage: MemoryUsageDto;
}
export declare class AppInfoDto {
    name: string;
    version: string;
    environment: string;
    description: string;
}
export declare class WelcomeContentDto {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
}
export declare class CompanyInfoDto {
    name: string;
    website: string;
    supportEmail: string;
}
export declare class MetadataDto {
    generatedAt: string;
    requestId: string;
    version: string;
    processingTime?: number;
}
export declare class WelcomeResponseDataDto {
    html: string;
    appInfo: AppInfoDto;
    welcome: WelcomeContentDto;
    systemStatus: SystemStatusDto;
    companyInfo: CompanyInfoDto;
    metadata: MetadataDto;
}
export declare class WelcomeResponseDto {
    success: boolean;
    data: WelcomeResponseDataDto;
    message: string;
    timestamp?: string;
}
export declare class SystemStatusResponseDto {
    success: boolean;
    data: SystemStatusDto;
    message: string;
    timestamp?: string;
}

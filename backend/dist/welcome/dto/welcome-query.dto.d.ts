export declare enum ResponseFormat {
    HTML = "html",
    JSON = "json",
    BOTH = "both"
}
export declare class WelcomeQueryDto {
    format?: ResponseFormat;
    includeSystemStatus?: boolean;
    includeVisitStats?: boolean;
    clientId?: string;
    theme?: string;
    lang?: string;
}
export declare class SystemStatusQueryDto {
    includeMemoryDetails?: boolean;
    includeHistory?: boolean;
}

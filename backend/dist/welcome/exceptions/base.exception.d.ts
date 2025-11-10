import { HttpException, HttpStatus } from '@nestjs/common';
export interface ExceptionDetails {
    context?: string;
    requestId?: string;
    userId?: string;
    timestamp: Date;
    metadata?: Record<string, any>;
}
export declare abstract class BaseWelcomeException extends HttpException {
    readonly errorCode: string;
    readonly details: ExceptionDetails;
    constructor(message: string, errorCode: string, httpStatus?: HttpStatus, details?: Partial<ExceptionDetails>);
    getFormattedError(): {
        name: string;
        message: string;
        errorCode: string;
        httpStatus: number;
        details: ExceptionDetails;
        stack: string | undefined;
    };
    getClientSafeError(isDevelopment?: boolean): {
        success: boolean;
        error: {
            code: string;
            message: string;
            timestamp: string;
            requestId: string | undefined;
        };
    } | {
        error: {
            details: ExceptionDetails;
            stack: string | undefined;
            code: string;
            message: string;
            timestamp: string;
            requestId: string | undefined;
        };
        success: boolean;
    };
    toLogFormat(): {
        level: string;
        timestamp: string;
        context: string;
        message: string;
        errorCode: string;
        httpStatus: number;
        requestId: string | undefined;
        userId: string | undefined;
        metadata: Record<string, any> | undefined;
        stack: string | undefined;
    };
}

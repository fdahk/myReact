import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: unknown, host: ArgumentsHost): void;
    private parseException;
    private logException;
    private buildErrorResponse;
    private getClientSafeMessage;
    private getLogLevel;
    private shouldIncludeStack;
    private generateRequestId;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWelcomeException = void 0;
const common_1 = require("@nestjs/common");
class BaseWelcomeException extends common_1.HttpException {
    errorCode;
    details;
    constructor(message, errorCode, httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR, details) {
        super(message, httpStatus);
        this.errorCode = errorCode;
        this.details = {
            timestamp: new Date(),
            ...details,
        };
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    getFormattedError() {
        return {
            name: this.name,
            message: this.message,
            errorCode: this.errorCode,
            httpStatus: this.getStatus(),
            details: this.details,
            stack: this.stack,
        };
    }
    getClientSafeError(isDevelopment = false) {
        const safeError = {
            success: false,
            error: {
                code: this.errorCode,
                message: this.message,
                timestamp: this.details.timestamp.toISOString(),
                requestId: this.details.requestId,
            },
        };
        if (isDevelopment) {
            return {
                ...safeError,
                error: {
                    ...safeError.error,
                    details: this.details,
                    stack: this.stack,
                },
            };
        }
        return safeError;
    }
    toLogFormat() {
        return {
            level: 'error',
            timestamp: this.details.timestamp.toISOString(),
            context: this.details.context || 'WelcomeModule',
            message: this.message,
            errorCode: this.errorCode,
            httpStatus: this.getStatus(),
            requestId: this.details.requestId,
            userId: this.details.userId,
            metadata: this.details.metadata,
            stack: this.stack,
        };
    }
}
exports.BaseWelcomeException = BaseWelcomeException;
//# sourceMappingURL=base.exception.js.map
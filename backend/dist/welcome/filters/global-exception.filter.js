"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("../exceptions/base.exception");
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const requestId = this.generateRequestId();
        const exceptionInfo = this.parseException(exception, request, requestId);
        this.logException(exceptionInfo, request);
        const errorResponse = this.buildErrorResponse(exceptionInfo, request);
        response.status(exceptionInfo.httpStatus).json(errorResponse);
    }
    parseException(exception, request, requestId) {
        if (exception instanceof base_exception_1.BaseWelcomeException) {
            return {
                name: exception.name,
                message: exception.message,
                errorCode: exception.errorCode,
                httpStatus: exception.getStatus(),
                details: exception.details,
                stack: exception.stack,
                isCustomException: true,
                requestId,
            };
        }
        if (exception instanceof common_1.HttpException) {
            const response = exception.getResponse();
            const errorCode = typeof response === 'object' && 'error' in response
                ? response.error
                : 'HTTP_EXCEPTION';
            return {
                name: exception.name,
                message: exception.message,
                errorCode,
                httpStatus: exception.getStatus(),
                details: typeof response === 'object' ? response : { message: response },
                stack: exception.stack,
                isCustomException: false,
                requestId,
            };
        }
        if (exception instanceof Error) {
            return {
                name: exception.name,
                message: exception.message,
                errorCode: 'INTERNAL_ERROR',
                httpStatus: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                details: { originalError: exception.message },
                stack: exception.stack,
                isCustomException: false,
                requestId,
            };
        }
        return {
            name: 'UnknownException',
            message: '发生未知错误',
            errorCode: 'UNKNOWN_ERROR',
            httpStatus: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            details: { originalException: String(exception) },
            stack: undefined,
            isCustomException: false,
            requestId,
        };
    }
    logException(exceptionInfo, request) {
        const logData = {
            level: this.getLogLevel(exceptionInfo.httpStatus),
            timestamp: new Date().toISOString(),
            requestId: exceptionInfo.requestId,
            method: request.method,
            url: request.url,
            userAgent: request.get('User-Agent'),
            ip: request.ip,
            exception: {
                name: exceptionInfo.name,
                message: exceptionInfo.message,
                errorCode: exceptionInfo.errorCode,
                httpStatus: exceptionInfo.httpStatus,
                isCustomException: exceptionInfo.isCustomException,
            },
            details: exceptionInfo.details,
            stack: this.shouldIncludeStack() ? exceptionInfo.stack : undefined,
        };
        if (exceptionInfo.httpStatus >= 500) {
            this.logger.error(`服务器内部错误: ${exceptionInfo.message}`, JSON.stringify(logData, null, 2));
        }
        else if (exceptionInfo.httpStatus >= 400) {
            this.logger.warn(`客户端请求错误: ${exceptionInfo.message}`, JSON.stringify(logData, null, 2));
        }
        else {
            this.logger.log(`异常信息: ${exceptionInfo.message}`, JSON.stringify(logData, null, 2));
        }
    }
    buildErrorResponse(exceptionInfo, request) {
        const isDevelopment = process.env.NODE_ENV === 'development';
        const errorResponse = {
            success: false,
            error: {
                code: exceptionInfo.errorCode,
                message: this.getClientSafeMessage(exceptionInfo, isDevelopment),
                timestamp: new Date().toISOString(),
                path: request.url,
                requestId: exceptionInfo.requestId,
            },
        };
        if (isDevelopment) {
            errorResponse.error.details = exceptionInfo.details;
            errorResponse.error.stack = exceptionInfo.stack;
        }
        return errorResponse;
    }
    getClientSafeMessage(exceptionInfo, isDevelopment) {
        if (isDevelopment) {
            return exceptionInfo.message;
        }
        if (exceptionInfo.httpStatus >= 500) {
            return '服务器内部错误，请稍后重试';
        }
        else if (exceptionInfo.httpStatus >= 400) {
            return exceptionInfo.message;
        }
        return exceptionInfo.message;
    }
    getLogLevel(httpStatus) {
        if (httpStatus >= 500)
            return 'error';
        if (httpStatus >= 400)
            return 'warn';
        return 'info';
    }
    shouldIncludeStack() {
        return process.env.NODE_ENV === 'development';
    }
    generateRequestId() {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map
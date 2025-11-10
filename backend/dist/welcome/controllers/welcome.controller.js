"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var WelcomeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeController = void 0;
const common_1 = require("@nestjs/common");
const welcome_service_1 = require("../services/welcome.service");
const welcome_query_dto_1 = require("../dto/welcome-query.dto");
const global_exception_filter_1 = require("../filters/global-exception.filter");
let WelcomeController = WelcomeController_1 = class WelcomeController {
    welcomeService;
    logger = new common_1.Logger(WelcomeController_1.name);
    constructor(welcomeService) {
        this.welcomeService = welcomeService;
    }
    async getWelcomePage(query, request) {
        const requestId = this.generateRequestId();
        const clientIp = this.extractClientIp(request);
        this.logger.log(`收到欢迎页面请求 - 请求ID: ${requestId}, 客户端IP: ${clientIp}, 参数: ${JSON.stringify(query)}`);
        try {
            const response = await this.welcomeService.generateWelcomeHtml(requestId, clientIp);
            if (query.format === 'html') {
                return {
                    success: true,
                    data: {
                        ...response.data,
                        appInfo: undefined,
                        welcome: undefined,
                        systemStatus: query.includeSystemStatus ? response.data.systemStatus : undefined,
                        companyInfo: undefined,
                        metadata: response.data.metadata,
                    },
                    message: response.message,
                    timestamp: response.timestamp,
                };
            }
            if (!query.includeSystemStatus) {
                response.data.systemStatus = undefined;
            }
            this.logger.log(`欢迎页面请求处理成功 - 请求ID: ${requestId}`);
            return response;
        }
        catch (error) {
            this.logger.error(`欢迎页面请求处理失败 - 请求ID: ${requestId}`, error.stack);
            throw error;
        }
    }
    async getSystemStatus(query, request) {
        const requestId = this.generateRequestId();
        const clientIp = this.extractClientIp(request);
        this.logger.log(`收到系统状态请求 - 请求ID: ${requestId}, 客户端IP: ${clientIp}`);
        try {
            const response = await this.welcomeService.getSystemStatusInfo();
            if (!query.includeMemoryDetails) {
                response.data.memoryUsage = undefined;
            }
            this.logger.log(`系统状态请求处理成功 - 请求ID: ${requestId}`);
            return response;
        }
        catch (error) {
            this.logger.error(`系统状态请求处理失败 - 请求ID: ${requestId}`, error.stack);
            throw error;
        }
    }
    async getVisitStatistics(request) {
        const requestId = this.generateRequestId();
        this.logger.log(`收到访问统计请求 - 请求ID: ${requestId}`);
        try {
            const stats = this.welcomeService.getVisitStatistics();
            const response = {
                success: true,
                data: stats,
                message: '访问统计获取成功',
                timestamp: new Date().toISOString(),
            };
            this.logger.log(`访问统计请求处理成功 - 请求ID: ${requestId}`);
            return response;
        }
        catch (error) {
            this.logger.error(`访问统计请求处理失败 - 请求ID: ${requestId}`, error.stack);
            throw error;
        }
    }
    async getServiceMetrics(request) {
        const requestId = this.generateRequestId();
        this.logger.log(`收到服务指标请求 - 请求ID: ${requestId}`);
        try {
            const metrics = this.welcomeService.getServiceMetrics();
            const response = {
                success: true,
                data: metrics,
                message: '服务指标获取成功',
                timestamp: new Date().toISOString(),
            };
            this.logger.log(`服务指标请求处理成功 - 请求ID: ${requestId}`);
            return response;
        }
        catch (error) {
            this.logger.error(`服务指标请求处理失败 - 请求ID: ${requestId}`, error.stack);
            throw error;
        }
    }
    async healthCheck() {
        return {
            success: true,
            data: {
                status: 'healthy',
                timestamp: new Date().toISOString(),
                service: 'WelcomeService',
            },
            message: '服务运行正常',
        };
    }
    generateRequestId() {
        return `welcome_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    extractClientIp(request) {
        const forwarded = request.get('X-Forwarded-For');
        const realIp = request.get('X-Real-IP');
        const remoteAddress = request.connection?.remoteAddress;
        if (forwarded) {
            return forwarded.split(',')[0].trim();
        }
        if (realIp) {
            return realIp;
        }
        if (remoteAddress?.startsWith('::ffff:')) {
            return remoteAddress.substring(7);
        }
        return remoteAddress || 'unknown';
    }
};
exports.WelcomeController = WelcomeController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Content-Type', 'application/json; charset=utf-8'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [welcome_query_dto_1.WelcomeQueryDto, Object]),
    __metadata("design:returntype", Promise)
], WelcomeController.prototype, "getWelcomePage", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.Header)('Content-Type', 'application/json; charset=utf-8'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [welcome_query_dto_1.SystemStatusQueryDto, Object]),
    __metadata("design:returntype", Promise)
], WelcomeController.prototype, "getSystemStatus", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.Header)('Content-Type', 'application/json; charset=utf-8'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WelcomeController.prototype, "getVisitStatistics", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, common_1.Header)('Content-Type', 'application/json; charset=utf-8'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WelcomeController.prototype, "getServiceMetrics", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, common_1.Header)('Content-Type', 'application/json; charset=utf-8'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WelcomeController.prototype, "healthCheck", null);
exports.WelcomeController = WelcomeController = WelcomeController_1 = __decorate([
    (0, common_1.Controller)('api/welcome'),
    (0, common_1.UseFilters)(global_exception_filter_1.GlobalExceptionFilter),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })),
    __metadata("design:paramtypes", [welcome_service_1.WelcomeService])
], WelcomeController);
//# sourceMappingURL=welcome.controller.js.map
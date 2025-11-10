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
var WelcomeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const template_service_1 = require("./template.service");
const welcome_response_dto_1 = require("../dto/welcome-response.dto");
const service_exception_1 = require("../exceptions/service.exception");
let WelcomeService = WelcomeService_1 = class WelcomeService {
    configService;
    templateService;
    logger = new common_1.Logger(WelcomeService_1.name);
    visitStats = {
        totalVisits: 0,
        uniqueVisitors: new Set(),
        lastVisitTime: new Date(),
        dailyVisits: new Map(),
    };
    systemMetrics = {
        startTime: new Date(),
        lastHealthCheck: new Date(),
        healthCheckCount: 0,
        errorCount: 0,
        warningCount: 0,
    };
    isInitialized = false;
    constructor(configService, templateService) {
        this.configService = configService;
        this.templateService = templateService;
    }
    async onModuleInit() {
        try {
            this.logger.log('WelcomeService 开始初始化...');
            await this.validateConfiguration();
            this.initializeMetrics();
            this.setupScheduledTasks();
            this.isInitialized = true;
            this.logger.log('WelcomeService 初始化完成');
        }
        catch (error) {
            this.logger.error('WelcomeService 初始化失败', error.stack);
            throw new service_exception_1.ServiceInitializationException('WelcomeService', error);
        }
    }
    async generateWelcomeHtml(requestId, clientIp) {
        const startTime = Date.now();
        try {
            this.logger.log(`开始生成欢迎页面，请求ID: ${requestId}, 客户端IP: ${clientIp}`);
            this.checkServiceAvailability();
            this.updateVisitStatistics(clientIp);
            const systemStatus = await this.getSystemStatus();
            const templateData = await this.prepareTemplateData(requestId, systemStatus);
            const html = await this.templateService.renderWelcomeTemplate(templateData, requestId);
            const responseData = {
                html,
                appInfo: templateData.appInfo,
                welcome: templateData.welcome,
                systemStatus: {
                    status: systemStatus.status,
                    uptime: systemStatus.uptime,
                    timestamp: systemStatus.timestamp,
                    visitCount: this.visitStats.totalVisits,
                    memoryUsage: systemStatus.memoryUsage,
                },
                companyInfo: templateData.companyInfo,
                metadata: {
                    ...templateData.metadata,
                    processingTime: Date.now() - startTime,
                },
            };
            const response = {
                success: true,
                data: responseData,
                message: '欢迎页面生成成功',
                timestamp: new Date().toISOString(),
            };
            this.logger.log(`欢迎页面生成成功，请求ID: ${requestId}, 耗时: ${Date.now() - startTime}ms`);
            return response;
        }
        catch (error) {
            this.systemMetrics.errorCount++;
            this.logger.error(`欢迎页面生成失败，请求ID: ${requestId}`, error.stack);
            throw error;
        }
    }
    async getSystemStatusInfo() {
        try {
            this.systemMetrics.healthCheckCount++;
            this.systemMetrics.lastHealthCheck = new Date();
            const systemStatus = await this.getSystemStatus();
            return {
                success: true,
                data: {
                    status: systemStatus.status,
                    uptime: systemStatus.uptime,
                    timestamp: systemStatus.timestamp,
                    visitCount: this.visitStats.totalVisits,
                    memoryUsage: systemStatus.memoryUsage,
                },
                message: '系统状态获取成功',
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            this.systemMetrics.errorCount++;
            this.logger.error('系统状态获取失败', error.stack);
            throw error;
        }
    }
    getVisitStatistics() {
        return {
            totalVisits: this.visitStats.totalVisits,
            uniqueVisitors: this.visitStats.uniqueVisitors.size,
            lastVisitTime: this.visitStats.lastVisitTime.toISOString(),
            dailyVisits: Object.fromEntries(this.visitStats.dailyVisits),
        };
    }
    getServiceMetrics() {
        return {
            ...this.systemMetrics,
            startTime: this.systemMetrics.startTime.toISOString(),
            lastHealthCheck: this.systemMetrics.lastHealthCheck.toISOString(),
            uptime: Date.now() - this.systemMetrics.startTime.getTime(),
            isInitialized: this.isInitialized,
        };
    }
    async validateConfiguration() {
        const requiredConfigs = [
            'welcome.app.name',
            'welcome.server.port',
            'welcome.welcome.title',
            'welcome.companyInfo.name',
        ];
        for (const config of requiredConfigs) {
            const value = this.configService.get(config);
            if (!value) {
                throw new service_exception_1.BusinessRuleException('ConfigurationValidation', `必需配置项缺失: ${config}`, { missingConfig: config });
            }
        }
    }
    checkServiceAvailability() {
        if (!this.isInitialized) {
            throw new service_exception_1.SystemUnavailableException('服务尚未初始化完成');
        }
        const memoryUsage = process.memoryUsage();
        const memoryUsagePercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
        if (memoryUsagePercent > 90) {
            this.systemMetrics.warningCount++;
            this.logger.warn(`内存使用率过高: ${memoryUsagePercent.toFixed(2)}%`);
        }
    }
    updateVisitStatistics(clientIp) {
        this.visitStats.totalVisits++;
        this.visitStats.lastVisitTime = new Date();
        if (clientIp) {
            this.visitStats.uniqueVisitors.add(clientIp);
        }
        const today = new Date().toISOString().split('T')[0];
        const dailyCount = this.visitStats.dailyVisits.get(today) || 0;
        this.visitStats.dailyVisits.set(today, dailyCount + 1);
    }
    async getSystemStatus() {
        const memoryUsage = process.memoryUsage();
        const uptime = Math.floor(process.uptime());
        let status = welcome_response_dto_1.SystemStatus.HEALTHY;
        const memoryUsagePercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
        if (memoryUsagePercent > 80 || this.systemMetrics.errorCount > 10) {
            status = welcome_response_dto_1.SystemStatus.DEGRADED;
        }
        if (memoryUsagePercent > 95 || this.systemMetrics.errorCount > 50) {
            status = welcome_response_dto_1.SystemStatus.DOWN;
        }
        return {
            status,
            uptime,
            timestamp: new Date().toISOString(),
            memoryUsage: {
                used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
                total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
                percentage: Math.round(memoryUsagePercent),
            },
        };
    }
    async prepareTemplateData(requestId, systemStatus) {
        const welcomeConfig = this.configService.get('welcome');
        return {
            appInfo: {
                name: welcomeConfig.app.name,
                version: welcomeConfig.app.version,
                environment: welcomeConfig.app.environment,
                description: welcomeConfig.app.description,
            },
            welcome: {
                title: welcomeConfig.welcome.title,
                subtitle: welcomeConfig.welcome.subtitle,
                description: welcomeConfig.welcome.description,
                features: welcomeConfig.welcome.features,
            },
            systemStatus: {
                ...systemStatus,
                visitCount: this.visitStats.totalVisits,
            },
            companyInfo: {
                name: welcomeConfig.welcome.companyInfo.name,
                website: welcomeConfig.welcome.companyInfo.website,
                supportEmail: welcomeConfig.welcome.companyInfo.supportEmail,
            },
            metadata: {
                generatedAt: new Date().toISOString(),
                requestId,
                version: '1.0.0',
            },
        };
    }
    initializeMetrics() {
        this.systemMetrics = {
            startTime: new Date(),
            lastHealthCheck: new Date(),
            healthCheckCount: 0,
            errorCount: 0,
            warningCount: 0,
        };
    }
    setupScheduledTasks() {
        setInterval(() => {
            this.cleanupOldDailyStats();
        }, 60 * 60 * 1000);
        setInterval(() => {
            if (this.systemMetrics.errorCount > 0) {
                this.systemMetrics.errorCount = Math.max(0, this.systemMetrics.errorCount - 1);
            }
        }, 10 * 60 * 1000);
    }
    cleanupOldDailyStats() {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const cutoffDate = sevenDaysAgo.toISOString().split('T')[0];
        for (const [date] of this.visitStats.dailyVisits) {
            if (date < cutoffDate) {
                this.visitStats.dailyVisits.delete(date);
            }
        }
    }
};
exports.WelcomeService = WelcomeService;
exports.WelcomeService = WelcomeService = WelcomeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        template_service_1.TemplateService])
], WelcomeService);
//# sourceMappingURL=welcome.service.js.map
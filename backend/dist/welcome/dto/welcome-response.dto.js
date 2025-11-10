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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemStatusResponseDto = exports.WelcomeResponseDto = exports.WelcomeResponseDataDto = exports.MetadataDto = exports.CompanyInfoDto = exports.WelcomeContentDto = exports.AppInfoDto = exports.SystemStatusDto = exports.MemoryUsageDto = exports.SystemStatus = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var SystemStatus;
(function (SystemStatus) {
    SystemStatus["HEALTHY"] = "healthy";
    SystemStatus["DEGRADED"] = "degraded";
    SystemStatus["DOWN"] = "down";
})(SystemStatus || (exports.SystemStatus = SystemStatus = {}));
class MemoryUsageDto {
    used;
    total;
    percentage;
}
exports.MemoryUsageDto = MemoryUsageDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MemoryUsageDto.prototype, "used", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MemoryUsageDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MemoryUsageDto.prototype, "percentage", void 0);
class SystemStatusDto {
    status;
    uptime;
    timestamp;
    visitCount;
    memoryUsage;
}
exports.SystemStatusDto = SystemStatusDto;
__decorate([
    (0, class_validator_1.IsEnum)(SystemStatus),
    __metadata("design:type", String)
], SystemStatusDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SystemStatusDto.prototype, "uptime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SystemStatusDto.prototype, "timestamp", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SystemStatusDto.prototype, "visitCount", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MemoryUsageDto),
    __metadata("design:type", MemoryUsageDto)
], SystemStatusDto.prototype, "memoryUsage", void 0);
class AppInfoDto {
    name;
    version;
    environment;
    description;
}
exports.AppInfoDto = AppInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppInfoDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppInfoDto.prototype, "version", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppInfoDto.prototype, "environment", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppInfoDto.prototype, "description", void 0);
class WelcomeContentDto {
    title;
    subtitle;
    description;
    features;
}
exports.WelcomeContentDto = WelcomeContentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WelcomeContentDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WelcomeContentDto.prototype, "subtitle", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WelcomeContentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], WelcomeContentDto.prototype, "features", void 0);
class CompanyInfoDto {
    name;
    website;
    supportEmail;
}
exports.CompanyInfoDto = CompanyInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompanyInfoDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompanyInfoDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompanyInfoDto.prototype, "supportEmail", void 0);
class MetadataDto {
    generatedAt;
    requestId;
    version;
    processingTime;
}
exports.MetadataDto = MetadataDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MetadataDto.prototype, "generatedAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MetadataDto.prototype, "requestId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MetadataDto.prototype, "version", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MetadataDto.prototype, "processingTime", void 0);
class WelcomeResponseDataDto {
    html;
    appInfo;
    welcome;
    systemStatus;
    companyInfo;
    metadata;
}
exports.WelcomeResponseDataDto = WelcomeResponseDataDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WelcomeResponseDataDto.prototype, "html", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AppInfoDto),
    __metadata("design:type", AppInfoDto)
], WelcomeResponseDataDto.prototype, "appInfo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WelcomeContentDto),
    __metadata("design:type", WelcomeContentDto)
], WelcomeResponseDataDto.prototype, "welcome", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SystemStatusDto),
    __metadata("design:type", SystemStatusDto)
], WelcomeResponseDataDto.prototype, "systemStatus", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CompanyInfoDto),
    __metadata("design:type", CompanyInfoDto)
], WelcomeResponseDataDto.prototype, "companyInfo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MetadataDto),
    __metadata("design:type", MetadataDto)
], WelcomeResponseDataDto.prototype, "metadata", void 0);
class WelcomeResponseDto {
    success;
    data;
    message;
    timestamp;
}
exports.WelcomeResponseDto = WelcomeResponseDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], WelcomeResponseDto.prototype, "success", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WelcomeResponseDataDto),
    __metadata("design:type", WelcomeResponseDataDto)
], WelcomeResponseDto.prototype, "data", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WelcomeResponseDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WelcomeResponseDto.prototype, "timestamp", void 0);
class SystemStatusResponseDto {
    success;
    data;
    message;
    timestamp;
}
exports.SystemStatusResponseDto = SystemStatusResponseDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SystemStatusResponseDto.prototype, "success", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SystemStatusDto),
    __metadata("design:type", SystemStatusDto)
], SystemStatusResponseDto.prototype, "data", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SystemStatusResponseDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SystemStatusResponseDto.prototype, "timestamp", void 0);
//# sourceMappingURL=welcome-response.dto.js.map
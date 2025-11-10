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
exports.SystemStatusQueryDto = exports.WelcomeQueryDto = exports.ResponseFormat = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var ResponseFormat;
(function (ResponseFormat) {
    ResponseFormat["HTML"] = "html";
    ResponseFormat["JSON"] = "json";
    ResponseFormat["BOTH"] = "both";
})(ResponseFormat || (exports.ResponseFormat = ResponseFormat = {}));
class WelcomeQueryDto {
    format = ResponseFormat.BOTH;
    includeSystemStatus = true;
    includeVisitStats = true;
    clientId;
    theme;
    lang = 'zh-CN';
}
exports.WelcomeQueryDto = WelcomeQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ResponseFormat),
    __metadata("design:type", String)
], WelcomeQueryDto.prototype, "format", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value.toLowerCase() === 'true';
        }
        return Boolean(value);
    }),
    __metadata("design:type", Boolean)
], WelcomeQueryDto.prototype, "includeSystemStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value.toLowerCase() === 'true';
        }
        return Boolean(value);
    }),
    __metadata("design:type", Boolean)
], WelcomeQueryDto.prototype, "includeVisitStats", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WelcomeQueryDto.prototype, "clientId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WelcomeQueryDto.prototype, "theme", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WelcomeQueryDto.prototype, "lang", void 0);
class SystemStatusQueryDto {
    includeMemoryDetails = true;
    includeHistory = false;
}
exports.SystemStatusQueryDto = SystemStatusQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value.toLowerCase() === 'true';
        }
        return Boolean(value);
    }),
    __metadata("design:type", Boolean)
], SystemStatusQueryDto.prototype, "includeMemoryDetails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value.toLowerCase() === 'true';
        }
        return Boolean(value);
    }),
    __metadata("design:type", Boolean)
], SystemStatusQueryDto.prototype, "includeHistory", void 0);
//# sourceMappingURL=welcome-query.dto.js.map
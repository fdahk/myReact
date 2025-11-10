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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const welcome_config_1 = __importDefault(require("../config/welcome.config"));
const welcome_controller_1 = require("./controllers/welcome.controller");
const welcome_service_1 = require("./services/welcome.service");
const template_service_1 = require("./services/template.service");
const global_exception_filter_1 = require("./filters/global-exception.filter");
let WelcomeModule = class WelcomeModule {
    constructor() {
        console.log('🎉 WelcomeModule 已加载');
    }
};
exports.WelcomeModule = WelcomeModule;
exports.WelcomeModule = WelcomeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forFeature(welcome_config_1.default),
        ],
        controllers: [
            welcome_controller_1.WelcomeController,
        ],
        providers: [
            welcome_service_1.WelcomeService,
            template_service_1.TemplateService,
            {
                provide: core_1.APP_FILTER,
                useClass: global_exception_filter_1.GlobalExceptionFilter,
            },
        ],
        exports: [
            welcome_service_1.WelcomeService,
            template_service_1.TemplateService,
        ],
    }),
    __metadata("design:paramtypes", [])
], WelcomeModule);
//# sourceMappingURL=welcome.module.js.map
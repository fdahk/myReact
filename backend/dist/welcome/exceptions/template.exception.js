"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateSyntaxException = exports.InvalidTemplateDataException = exports.TemplateRenderException = exports.TemplateNotFoundException = exports.TemplateException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("./base.exception");
class TemplateException extends base_exception_1.BaseWelcomeException {
    constructor(message, errorCode, httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR, details) {
        super(message, errorCode, httpStatus, {
            context: 'TemplateService',
            ...details,
        });
    }
}
exports.TemplateException = TemplateException;
class TemplateNotFoundException extends TemplateException {
    constructor(templateName, templatePath, details) {
        const message = templatePath
            ? `模板文件未找到: ${templateName} (路径: ${templatePath})`
            : `模板未找到: ${templateName}`;
        super(message, 'TEMPLATE_NOT_FOUND', common_1.HttpStatus.NOT_FOUND, {
            ...details,
            metadata: {
                templateName,
                templatePath,
                ...details?.metadata,
            },
        });
    }
}
exports.TemplateNotFoundException = TemplateNotFoundException;
class TemplateRenderException extends TemplateException {
    constructor(templateName, renderError, templateData, details) {
        const message = `模板渲染失败: ${templateName}. 错误: ${renderError.message}`;
        super(message, 'TEMPLATE_RENDER_FAILED', common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
            ...details,
            metadata: {
                templateName,
                renderError: renderError.message,
                renderStack: renderError.stack,
                templateData: templateData ? JSON.stringify(templateData) : undefined,
                ...details?.metadata,
            },
        });
    }
}
exports.TemplateRenderException = TemplateRenderException;
class InvalidTemplateDataException extends TemplateException {
    constructor(templateName, expectedDataStructure, actualData, details) {
        const message = `模板数据无效: ${templateName}. 期望数据结构: ${expectedDataStructure}`;
        super(message, 'INVALID_TEMPLATE_DATA', common_1.HttpStatus.BAD_REQUEST, {
            ...details,
            metadata: {
                templateName,
                expectedDataStructure,
                actualData: actualData ? JSON.stringify(actualData) : undefined,
                ...details?.metadata,
            },
        });
    }
}
exports.InvalidTemplateDataException = InvalidTemplateDataException;
class TemplateSyntaxException extends TemplateException {
    constructor(templateName, syntaxError, lineNumber, details) {
        const message = lineNumber
            ? `模板语法错误: ${templateName} (第${lineNumber}行): ${syntaxError}`
            : `模板语法错误: ${templateName}: ${syntaxError}`;
        super(message, 'TEMPLATE_SYNTAX_ERROR', common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
            ...details,
            metadata: {
                templateName,
                syntaxError,
                lineNumber,
                ...details?.metadata,
            },
        });
    }
}
exports.TemplateSyntaxException = TemplateSyntaxException;
//# sourceMappingURL=template.exception.js.map
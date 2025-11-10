"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigValidationException = exports.ConfigLoadException = exports.MissingConfigException = exports.InvalidConfigException = exports.ConfigException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("./base.exception");
class ConfigException extends base_exception_1.BaseWelcomeException {
    constructor(message, errorCode, details) {
        super(message, errorCode, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
            context: 'ConfigurationModule',
            ...details,
        });
    }
}
exports.ConfigException = ConfigException;
class InvalidConfigException extends ConfigException {
    constructor(configKey, expectedFormat, actualValue, details) {
        const message = expectedFormat
            ? `配置项 '${configKey}' 格式无效。期望格式: ${expectedFormat}，实际值: ${actualValue}`
            : `配置项 '${configKey}' 无效`;
        super(message, 'INVALID_CONFIG', {
            ...details,
            metadata: {
                configKey,
                expectedFormat,
                actualValue,
                ...details?.metadata,
            },
        });
    }
}
exports.InvalidConfigException = InvalidConfigException;
class MissingConfigException extends ConfigException {
    constructor(configKey, description, details) {
        const message = description
            ? `缺失必需的配置项 '${configKey}': ${description}`
            : `缺失必需的配置项 '${configKey}'`;
        super(message, 'MISSING_CONFIG', {
            ...details,
            metadata: {
                configKey,
                description,
                ...details?.metadata,
            },
        });
    }
}
exports.MissingConfigException = MissingConfigException;
class ConfigLoadException extends ConfigException {
    constructor(source, originalError, details) {
        const message = `配置加载失败，来源: ${source}${originalError ? `. 原因: ${originalError.message}` : ''}`;
        super(message, 'CONFIG_LOAD_FAILED', {
            ...details,
            metadata: {
                source,
                originalError: originalError?.message,
                originalStack: originalError?.stack,
                ...details?.metadata,
            },
        });
    }
}
exports.ConfigLoadException = ConfigLoadException;
class ConfigValidationException extends ConfigException {
    constructor(validationErrors, details) {
        const message = `配置验证失败: ${validationErrors.join(', ')}`;
        super(message, 'CONFIG_VALIDATION_FAILED', {
            ...details,
            metadata: {
                validationErrors,
                errorCount: validationErrors.length,
                ...details?.metadata,
            },
        });
    }
}
exports.ConfigValidationException = ConfigValidationException;
//# sourceMappingURL=config.exception.js.map
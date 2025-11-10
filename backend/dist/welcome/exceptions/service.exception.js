"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConsistencyException = exports.InsufficientResourceException = exports.BusinessRuleException = exports.ExternalDependencyException = exports.ServiceInitializationException = exports.SystemUnavailableException = exports.ServiceException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("./base.exception");
class ServiceException extends base_exception_1.BaseWelcomeException {
    constructor(message, errorCode, httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR, details) {
        super(message, errorCode, httpStatus, {
            context: 'WelcomeService',
            ...details,
        });
    }
}
exports.ServiceException = ServiceException;
class SystemUnavailableException extends ServiceException {
    constructor(reason, estimatedRecoveryTime, details) {
        const message = estimatedRecoveryTime
            ? `系统暂时不可用: ${reason}. 预计恢复时间: ${estimatedRecoveryTime.toISOString()}`
            : `系统暂时不可用: ${reason}`;
        super(message, 'SYSTEM_UNAVAILABLE', common_1.HttpStatus.SERVICE_UNAVAILABLE, {
            ...details,
            metadata: {
                reason,
                estimatedRecoveryTime: estimatedRecoveryTime?.toISOString(),
                ...details?.metadata,
            },
        });
    }
}
exports.SystemUnavailableException = SystemUnavailableException;
class ServiceInitializationException extends ServiceException {
    constructor(serviceName, initializationError, details) {
        const message = `服务初始化失败: ${serviceName}. 错误: ${initializationError.message}`;
        super(message, 'SERVICE_INIT_FAILED', common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
            ...details,
            metadata: {
                serviceName,
                initializationError: initializationError.message,
                initializationStack: initializationError.stack,
                ...details?.metadata,
            },
        });
    }
}
exports.ServiceInitializationException = ServiceInitializationException;
class ExternalDependencyException extends ServiceException {
    constructor(dependencyName, operation, originalError, details) {
        const message = originalError
            ? `外部依赖 '${dependencyName}' 在执行 '${operation}' 操作时失败: ${originalError.message}`
            : `外部依赖 '${dependencyName}' 在执行 '${operation}' 操作时失败`;
        super(message, 'EXTERNAL_DEPENDENCY_FAILED', common_1.HttpStatus.BAD_GATEWAY, {
            ...details,
            metadata: {
                dependencyName,
                operation,
                originalError: originalError?.message,
                originalStack: originalError?.stack,
                ...details?.metadata,
            },
        });
    }
}
exports.ExternalDependencyException = ExternalDependencyException;
class BusinessRuleException extends ServiceException {
    constructor(ruleName, ruleDescription, violationDetails, details) {
        const message = `业务规则违反: ${ruleName} - ${ruleDescription}`;
        super(message, 'BUSINESS_RULE_VIOLATION', common_1.HttpStatus.BAD_REQUEST, {
            ...details,
            metadata: {
                ruleName,
                ruleDescription,
                violationDetails,
                ...details?.metadata,
            },
        });
    }
}
exports.BusinessRuleException = BusinessRuleException;
class InsufficientResourceException extends ServiceException {
    constructor(resourceType, currentUsage, maxCapacity, details) {
        const message = `系统资源不足: ${resourceType}. 当前使用: ${currentUsage}, 最大容量: ${maxCapacity}`;
        super(message, 'INSUFFICIENT_RESOURCE', common_1.HttpStatus.TOO_MANY_REQUESTS, {
            ...details,
            metadata: {
                resourceType,
                currentUsage,
                maxCapacity,
                utilizationRate: (currentUsage / maxCapacity * 100).toFixed(2) + '%',
                ...details?.metadata,
            },
        });
    }
}
exports.InsufficientResourceException = InsufficientResourceException;
class DataConsistencyException extends ServiceException {
    constructor(dataType, inconsistencyDescription, affectedRecords, details) {
        const message = affectedRecords
            ? `数据一致性异常: ${dataType} - ${inconsistencyDescription}. 受影响记录数: ${affectedRecords}`
            : `数据一致性异常: ${dataType} - ${inconsistencyDescription}`;
        super(message, 'DATA_CONSISTENCY_ERROR', common_1.HttpStatus.CONFLICT, {
            ...details,
            metadata: {
                dataType,
                inconsistencyDescription,
                affectedRecords,
                ...details?.metadata,
            },
        });
    }
}
exports.DataConsistencyException = DataConsistencyException;
//# sourceMappingURL=service.exception.js.map
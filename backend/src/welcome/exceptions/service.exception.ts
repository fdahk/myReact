/**
 * 服务相关异常类
 * 处理业务逻辑、系统状态、外部依赖等相关的异常情况
 */
import { HttpStatus } from '@nestjs/common';
import { BaseWelcomeException, ExceptionDetails } from './base.exception';

/**
 * 服务异常基类
 * 所有服务相关的异常都继承此类
 */
export abstract class ServiceException extends BaseWelcomeException {
  constructor(
    message: string,
    errorCode: string,
    httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: Partial<ExceptionDetails>,
  ) {
    super(message, errorCode, httpStatus, {
      context: 'WelcomeService',
      ...details,
    });
  }
}

/**
 * 系统不可用异常
 * 当系统处于不可用状态时抛出
 */
export class SystemUnavailableException extends ServiceException {
  constructor(
    reason: string,
    estimatedRecoveryTime?: Date,
    details?: Partial<ExceptionDetails>,
  ) {
    const message = estimatedRecoveryTime
      ? `系统暂时不可用: ${reason}. 预计恢复时间: ${estimatedRecoveryTime.toISOString()}`
      : `系统暂时不可用: ${reason}`;

    super(message, 'SYSTEM_UNAVAILABLE', HttpStatus.SERVICE_UNAVAILABLE, {
      ...details,
      metadata: {
        reason,
        estimatedRecoveryTime: estimatedRecoveryTime?.toISOString(),
        ...details?.metadata,
      },
    });
  }
}

/**
 * 服务初始化异常
 * 当服务初始化失败时抛出
 */
export class ServiceInitializationException extends ServiceException {
  constructor(
    serviceName: string,
    initializationError: Error,
    details?: Partial<ExceptionDetails>,
  ) {
    const message = `服务初始化失败: ${serviceName}. 错误: ${initializationError.message}`;

    super(message, 'SERVICE_INIT_FAILED', HttpStatus.INTERNAL_SERVER_ERROR, {
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

/**
 * 外部依赖异常
 * 当外部依赖服务不可用时抛出
 */
export class ExternalDependencyException extends ServiceException {
  constructor(
    dependencyName: string,
    operation: string,
    originalError?: Error,
    details?: Partial<ExceptionDetails>,
  ) {
    const message = originalError
      ? `外部依赖 '${dependencyName}' 在执行 '${operation}' 操作时失败: ${originalError.message}`
      : `外部依赖 '${dependencyName}' 在执行 '${operation}' 操作时失败`;

    super(message, 'EXTERNAL_DEPENDENCY_FAILED', HttpStatus.BAD_GATEWAY, {
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

/**
 * 业务规则异常
 * 当业务逻辑验证失败时抛出
 */
export class BusinessRuleException extends ServiceException {
  constructor(
    ruleName: string,
    ruleDescription: string,
    violationDetails?: any,
    details?: Partial<ExceptionDetails>,
  ) {
    const message = `业务规则违反: ${ruleName} - ${ruleDescription}`;

    super(message, 'BUSINESS_RULE_VIOLATION', HttpStatus.BAD_REQUEST, {
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

/**
 * 资源不足异常
 * 当系统资源不足时抛出
 */
export class InsufficientResourceException extends ServiceException {
  constructor(
    resourceType: string,
    currentUsage: number,
    maxCapacity: number,
    details?: Partial<ExceptionDetails>,
  ) {
    const message = `系统资源不足: ${resourceType}. 当前使用: ${currentUsage}, 最大容量: ${maxCapacity}`;

    super(message, 'INSUFFICIENT_RESOURCE', HttpStatus.TOO_MANY_REQUESTS, {
      ...details,
      metadata: {
        resourceType,
        currentUsage,
        maxCapacity,
        utilizationRate: ((currentUsage / maxCapacity) * 100).toFixed(2) + '%',
        ...details?.metadata,
      },
    });
  }
}

/**
 * 数据一致性异常
 * 当数据状态不一致时抛出
 */
export class DataConsistencyException extends ServiceException {
  constructor(
    dataType: string,
    inconsistencyDescription: string,
    affectedRecords?: number,
    details?: Partial<ExceptionDetails>,
  ) {
    const message = affectedRecords
      ? `数据一致性异常: ${dataType} - ${inconsistencyDescription}. 受影响记录数: ${affectedRecords}`
      : `数据一致性异常: ${dataType} - ${inconsistencyDescription}`;

    super(message, 'DATA_CONSISTENCY_ERROR', HttpStatus.CONFLICT, {
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

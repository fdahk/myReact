/**
 * 配置相关异常类
 * 处理配置加载、验证、解析等相关的异常情况
 */
import { HttpStatus } from '@nestjs/common';
import { BaseWelcomeException, ExceptionDetails } from './base.exception';

/**
 * 配置异常基类
 * 所有配置相关的异常都继承此类
 */
export abstract class ConfigException extends BaseWelcomeException {
  constructor(
    message: string,
    errorCode: string,
    details?: Partial<ExceptionDetails>,
  ) {
    super(message, errorCode, HttpStatus.INTERNAL_SERVER_ERROR, {
      context: 'ConfigurationModule',
      ...details,
    });
  }
}

/**
 * 无效配置异常
 * 当配置项格式错误或值无效时抛出
 */
export class InvalidConfigException extends ConfigException {
  constructor(
    configKey: string,
    expectedFormat?: string,
    actualValue?: any,
    details?: Partial<ExceptionDetails>,
  ) {
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

/**
 * 缺失配置异常
 * 当必需的配置项缺失时抛出
 */
export class MissingConfigException extends ConfigException {
  constructor(
    configKey: string,
    description?: string,
    details?: Partial<ExceptionDetails>,
  ) {
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

/**
 * 配置加载异常
 * 当配置文件加载失败时抛出
 */
export class ConfigLoadException extends ConfigException {
  constructor(
    source: string,
    originalError?: Error,
    details?: Partial<ExceptionDetails>,
  ) {
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

/**
 * 配置验证异常
 * 当配置验证失败时抛出
 */
export class ConfigValidationException extends ConfigException {
  constructor(validationErrors: string[], details?: Partial<ExceptionDetails>) {
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

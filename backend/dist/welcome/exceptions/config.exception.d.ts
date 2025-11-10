import { BaseWelcomeException, ExceptionDetails } from './base.exception';
export declare abstract class ConfigException extends BaseWelcomeException {
    constructor(message: string, errorCode: string, details?: Partial<ExceptionDetails>);
}
export declare class InvalidConfigException extends ConfigException {
    constructor(configKey: string, expectedFormat?: string, actualValue?: any, details?: Partial<ExceptionDetails>);
}
export declare class MissingConfigException extends ConfigException {
    constructor(configKey: string, description?: string, details?: Partial<ExceptionDetails>);
}
export declare class ConfigLoadException extends ConfigException {
    constructor(source: string, originalError?: Error, details?: Partial<ExceptionDetails>);
}
export declare class ConfigValidationException extends ConfigException {
    constructor(validationErrors: string[], details?: Partial<ExceptionDetails>);
}

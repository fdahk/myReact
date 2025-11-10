import { HttpStatus } from '@nestjs/common';
import { BaseWelcomeException, ExceptionDetails } from './base.exception';
export declare abstract class ServiceException extends BaseWelcomeException {
    constructor(message: string, errorCode: string, httpStatus?: HttpStatus, details?: Partial<ExceptionDetails>);
}
export declare class SystemUnavailableException extends ServiceException {
    constructor(reason: string, estimatedRecoveryTime?: Date, details?: Partial<ExceptionDetails>);
}
export declare class ServiceInitializationException extends ServiceException {
    constructor(serviceName: string, initializationError: Error, details?: Partial<ExceptionDetails>);
}
export declare class ExternalDependencyException extends ServiceException {
    constructor(dependencyName: string, operation: string, originalError?: Error, details?: Partial<ExceptionDetails>);
}
export declare class BusinessRuleException extends ServiceException {
    constructor(ruleName: string, ruleDescription: string, violationDetails?: any, details?: Partial<ExceptionDetails>);
}
export declare class InsufficientResourceException extends ServiceException {
    constructor(resourceType: string, currentUsage: number, maxCapacity: number, details?: Partial<ExceptionDetails>);
}
export declare class DataConsistencyException extends ServiceException {
    constructor(dataType: string, inconsistencyDescription: string, affectedRecords?: number, details?: Partial<ExceptionDetails>);
}

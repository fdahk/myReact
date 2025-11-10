import { HttpStatus } from '@nestjs/common';
import { BaseWelcomeException, ExceptionDetails } from './base.exception';
export declare abstract class TemplateException extends BaseWelcomeException {
    constructor(message: string, errorCode: string, httpStatus?: HttpStatus, details?: Partial<ExceptionDetails>);
}
export declare class TemplateNotFoundException extends TemplateException {
    constructor(templateName: string, templatePath?: string, details?: Partial<ExceptionDetails>);
}
export declare class TemplateRenderException extends TemplateException {
    constructor(templateName: string, renderError: Error, templateData?: any, details?: Partial<ExceptionDetails>);
}
export declare class InvalidTemplateDataException extends TemplateException {
    constructor(templateName: string, expectedDataStructure: string, actualData?: any, details?: Partial<ExceptionDetails>);
}
export declare class TemplateSyntaxException extends TemplateException {
    constructor(templateName: string, syntaxError: string, lineNumber?: number, details?: Partial<ExceptionDetails>);
}

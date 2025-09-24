/**
 * 模板相关异常类
 * 处理HTML模板渲染、加载、解析等相关的异常情况
 */
import { HttpStatus } from '@nestjs/common';
import { BaseWelcomeException, ExceptionDetails } from './base.exception';

/**
 * 模板异常基类
 * 所有模板相关的异常都继承此类
 */
export abstract class TemplateException extends BaseWelcomeException {
  constructor(
    message: string,
    errorCode: string,
    httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: Partial<ExceptionDetails>,
  ) {
    super(message, errorCode, httpStatus, {
      context: 'TemplateService',
      ...details,
    });
  }
}

/**
 * 模板未找到异常
 * 当指定的模板文件不存在时抛出
 */
export class TemplateNotFoundException extends TemplateException {
  constructor(
    templateName: string,
    templatePath?: string,
    details?: Partial<ExceptionDetails>,
  ) {
    const message = templatePath
      ? `模板文件未找到: ${templateName} (路径: ${templatePath})`
      : `模板未找到: ${templateName}`;

    super(message, 'TEMPLATE_NOT_FOUND', HttpStatus.NOT_FOUND, {
      ...details,
      metadata: {
        templateName,
        templatePath,
        ...details?.metadata,
      },
    });
  }
}

/**
 * 模板渲染异常
 * 当模板渲染过程中发生错误时抛出
 */
export class TemplateRenderException extends TemplateException {
  constructor(
    templateName: string,
    renderError: Error,
    templateData?: any,
    details?: Partial<ExceptionDetails>,
  ) {
    const message = `模板渲染失败: ${templateName}. 错误: ${renderError.message}`;

    super(message, 'TEMPLATE_RENDER_FAILED', HttpStatus.INTERNAL_SERVER_ERROR, {
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

/**
 * 模板数据无效异常
 * 当传递给模板的数据格式不正确时抛出
 */
export class InvalidTemplateDataException extends TemplateException {
  constructor(
    templateName: string,
    expectedDataStructure: string,
    actualData?: any,
    details?: Partial<ExceptionDetails>,
  ) {
    const message = `模板数据无效: ${templateName}. 期望数据结构: ${expectedDataStructure}`;

    super(message, 'INVALID_TEMPLATE_DATA', HttpStatus.BAD_REQUEST, {
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

/**
 * 模板语法异常
 * 当模板语法错误时抛出
 */
export class TemplateSyntaxException extends TemplateException {
  constructor(
    templateName: string,
    syntaxError: string,
    lineNumber?: number,
    details?: Partial<ExceptionDetails>,
  ) {
    const message = lineNumber
      ? `模板语法错误: ${templateName} (第${lineNumber}行): ${syntaxError}`
      : `模板语法错误: ${templateName}: ${syntaxError}`;

    super(message, 'TEMPLATE_SYNTAX_ERROR', HttpStatus.INTERNAL_SERVER_ERROR, {
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

/**
 * 欢迎功能请求数据传输对象
 * 定义API请求参数的验证规则和数据结构
 */
import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * 响应格式枚举
 */
export enum ResponseFormat {
  HTML = 'html',
  JSON = 'json',
  BOTH = 'both',
}

/**
 * 欢迎页面查询参数DTO
 */
export class WelcomeQueryDto {
  /**
   * 响应格式
   * 默认为 'both'，同时返回HTML和JSON数据
   */
  @IsOptional()
  @IsEnum(ResponseFormat)
  format?: ResponseFormat = ResponseFormat.BOTH;

  /**
   * 是否包含详细的系统状态信息
   * 默认为 true
   */
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  includeSystemStatus?: boolean = true;

  /**
   * 是否包含访问统计信息
   * 默认为 true
   */
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  includeVisitStats?: boolean = true;

  /**
   * 客户端标识
   * 用于访问统计和个性化内容
   */
  @IsOptional()
  @IsString()
  clientId?: string;

  /**
   * 自定义主题
   * 用于个性化页面样式
   */
  @IsOptional()
  @IsString()
  theme?: string;

  /**
   * 语言偏好
   * 用于国际化支持
   */
  @IsOptional()
  @IsString()
  lang?: string = 'zh-CN';
}

/**
 * 系统状态查询参数DTO
 */
export class SystemStatusQueryDto {
  /**
   * 是否包含详细的内存使用信息
   */
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  includeMemoryDetails?: boolean = true;

  /**
   * 是否包含历史监控数据
   */
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  includeHistory?: boolean = false;
}

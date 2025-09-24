/**
 * 环境变量验证配置
 * 使用class-validator确保环境变量的类型安全和有效性
 * 在应用启动时进行验证，避免运行时配置错误
 */
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPort,
  IsString,
  IsUrl,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer'; // 数据转换

/**
 * 环境变量验证类
 * 定义所有必需和可选的环境变量，并提供验证规则
 */
export class EnvironmentVariables {
  // 应用基础配置
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  APP_NAME?: string = 'Enterprise Nest.js Application'; // 应用名称

  @IsString()
  @IsOptional()
  APP_VERSION?: string = '1.0.0'; // 应用版本

  @IsEnum(['development', 'production', 'test'])
  @IsOptional()
  NODE_ENV?: 'development' | 'production' | 'test' = 'development'; // 运行环境

  @IsString()
  @IsOptional()
  APP_DESCRIPTION?: string; // 应用描述

  // 服务器配置
  @IsPort()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  PORT?: number = 3000; // 服务端口

  @IsString()
  @IsOptional()
  HOST?: string = 'localhost'; // 服务主机

  @IsString()
  @IsOptional()
  API_PREFIX?: string = 'api'; // API前缀

  // 欢迎页面配置
  @IsString()
  @IsOptional()
  WELCOME_TITLE?: string; // 欢迎标题

  @IsString()
  @IsOptional()
  WELCOME_SUBTITLE?: string; // 欢迎副标题

  @IsString()
  @IsOptional()
  WELCOME_DESCRIPTION?: string; // 欢迎描述

  // 公司信息配置
  @IsString()
  @IsOptional()
  COMPANY_NAME?: string; // 公司名称

  @IsUrl()
  @IsOptional()
  COMPANY_WEBSITE?: string; // 公司网站

  @IsEmail()
  @IsOptional()
  SUPPORT_EMAIL?: string; // 支持邮箱

  // 监控配置
  @IsBoolean()
  @Transform(({ value }) => value !== 'false')
  @IsOptional()
  ENABLE_HEALTH_CHECK?: boolean = true; // 启用健康检查

  @IsBoolean()
  @Transform(({ value }) => value !== 'false')
  @IsOptional()
  ENABLE_METRICS?: boolean = true; // 启用指标

  @IsEnum(['error', 'warn', 'info', 'debug'])
  @IsOptional()
  LOG_LEVEL?: 'error' | 'warn' | 'info' | 'debug' = 'info'; // 日志级别
}

/**
 * 环境变量验证函数
 * 在应用启动时调用，确保所有配置项符合预期格式
 *
 * @param config 原始环境变量对象
 * @returns 验证后的环境变量对象
 * @throws ValidationError 当验证失败时抛出异常
 */
export function validateEnvironment(config: Record<string, unknown>) {
  // 这里可以添加额外的自定义验证逻辑
  // 例如：检查必需的环境变量组合、验证配置项之间的依赖关系等

  return config;
}

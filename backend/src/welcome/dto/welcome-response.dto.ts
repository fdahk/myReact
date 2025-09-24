/**
 * 欢迎功能响应数据传输对象
 * 定义API响应的标准格式，确保数据结构的一致性和类型安全
 */
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 系统状态枚举
 */
export enum SystemStatus {
  HEALTHY = 'healthy',
  DEGRADED = 'degraded',
  DOWN = 'down',
}

/**
 * 内存使用信息DTO
 */
export class MemoryUsageDto {
  @IsNumber()
  used: number;

  @IsNumber()
  total: number;

  @IsNumber()
  percentage: number;
}

/**
 * 系统状态信息DTO
 */
export class SystemStatusDto {
  @IsEnum(SystemStatus)
  status: SystemStatus;

  @IsNumber()
  uptime: number;

  @IsString()
  timestamp: string;

  @IsNumber()
  visitCount: number;

  @ValidateNested()
  @Type(() => MemoryUsageDto)
  memoryUsage: MemoryUsageDto;
}

/**
 * 应用信息DTO
 */
export class AppInfoDto {
  @IsString()
  name: string;

  @IsString()
  version: string;

  @IsString()
  environment: string;

  @IsString()
  description: string;
}

/**
 * 欢迎内容DTO
 */
export class WelcomeContentDto {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  features: string[];
}

/**
 * 公司信息DTO
 */
export class CompanyInfoDto {
  @IsString()
  name: string;

  @IsString()
  website: string;

  @IsString()
  supportEmail: string;
}

/**
 * 元数据DTO
 */
export class MetadataDto {
  @IsString()
  generatedAt: string;

  @IsString()
  requestId: string;

  @IsString()
  version: string;

  @IsOptional()
  @IsNumber()
  processingTime?: number;
}

/**
 * 欢迎页面响应数据DTO
 */
export class WelcomeResponseDataDto {
  @IsString()
  html: string;

  @ValidateNested()
  @Type(() => AppInfoDto)
  appInfo: AppInfoDto;

  @ValidateNested()
  @Type(() => WelcomeContentDto)
  welcome: WelcomeContentDto;

  @ValidateNested()
  @Type(() => SystemStatusDto)
  systemStatus: SystemStatusDto;

  @ValidateNested()
  @Type(() => CompanyInfoDto)
  companyInfo: CompanyInfoDto;

  @ValidateNested()
  @Type(() => MetadataDto)
  metadata: MetadataDto;
}

/**
 * 标准API响应DTO
 */
export class WelcomeResponseDto {
  @IsBoolean()
  success: boolean;

  @ValidateNested()
  @Type(() => WelcomeResponseDataDto)
  data: WelcomeResponseDataDto;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  timestamp?: string;
}

/**
 * 系统状态响应DTO
 */
export class SystemStatusResponseDto {
  @IsBoolean()
  success: boolean;

  @ValidateNested()
  @Type(() => SystemStatusDto)
  data: SystemStatusDto;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  timestamp?: string;
}

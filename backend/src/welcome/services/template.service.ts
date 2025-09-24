/**
 * 模板服务
 * 负责生成动态HTML内容，提供企业级模板渲染能力
 * 支持数据注入、模板缓存、性能优化等特性
 */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TemplateRenderException,
  InvalidTemplateDataException,
  TemplateNotFoundException,
} from '../exceptions/template.exception';

/**
 * 模板数据接口
 * 定义传递给模板的数据结构
 */
export interface WelcomeTemplateData {
  /** 应用基础信息 */
  appInfo: {
    name: string;
    version: string;
    environment: string;
    description: string;
  };

  /** 欢迎页面内容 */
  welcome: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };

  /** 系统状态信息 */
  systemStatus: {
    status: 'healthy' | 'degraded' | 'down';
    uptime: number;
    timestamp: string;
    visitCount: number;
    memoryUsage: {
      used: number;
      total: number;
      percentage: number;
    };
  };

  /** 公司信息 */
  companyInfo: {
    name: string;
    website: string;
    supportEmail: string;
  };

  /** 元数据 */
  metadata: {
    generatedAt: string;
    requestId: string;
    version: string;
  };
}

/**
 * 模板缓存项接口
 */
interface TemplateCache {
  template: string;
  lastModified: Date;
  hitCount: number;
}

/**
 * 模板服务类
 * 提供HTML模板渲染和管理功能
 */
@Injectable()
export class TemplateService {
  private readonly logger = new Logger(TemplateService.name);
  private readonly templateCache = new Map<string, TemplateCache>();
  private readonly cacheEnabled = process.env.NODE_ENV === 'production';

  constructor(private readonly configService: ConfigService) {}

  /**
   * 渲染欢迎页面模板
   * @param data 模板数据
   * @param requestId 请求ID
   * @returns 渲染后的HTML字符串
   */
  async renderWelcomeTemplate(
    data: WelcomeTemplateData,
    requestId: string,
  ): Promise<string> {
    try {
      this.logger.log(`开始渲染欢迎模板，请求ID: ${requestId}`);

      // 验证模板数据
      this.validateTemplateData(data);

      // 获取模板内容
      const templateContent = await this.getTemplate('welcome');

      // 渲染模板
      const renderedHtml = this.renderTemplate(templateContent, data);

      this.logger.log(`模板渲染成功，请求ID: ${requestId}`);
      return renderedHtml;
    } catch (error) {
      this.logger.error(`模板渲染失败，请求ID: ${requestId}`, error.stack);

      if (error instanceof InvalidTemplateDataException) {
        throw error;
      }

      throw new TemplateRenderException('welcome', error, data, {
        requestId,
      });
    }
  }

  /**
   * 获取模板内容
   * 支持缓存机制以提升性能
   * @param templateName 模板名称
   * @returns 模板内容
   */
  private async getTemplate(templateName: string): Promise<string> {
    // 检查缓存
    if (this.cacheEnabled && this.templateCache.has(templateName)) {
      const cached = this.templateCache.get(templateName);
      if (cached) {
        cached.hitCount++;
        this.logger.debug(
          `使用缓存模板: ${templateName}, 命中次数: ${cached.hitCount}`,
        );
        return cached.template;
      }
    }

    // 生成模板内容
    const template = this.generateWelcomeTemplate();

    // 缓存模板
    if (this.cacheEnabled) {
      this.templateCache.set(templateName, {
        template,
        lastModified: new Date(),
        hitCount: 1,
      });
    }

    return template;
  }

  /**
   * 生成欢迎页面模板
   * 使用模板字符串创建动态HTML内容
   * @returns HTML模板字符串
   */
  private generateWelcomeTemplate(): string {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{appInfo.name}} - 企业级Nest.js应用</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            max-width: 900px;
            width: 100%;
            backdrop-filter: blur(10px);
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .title {
            font-size: 2.5em;
            color: #333;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .subtitle {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 20px;
        }
        
        .description {
            font-size: 1.1em;
            color: #555;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
            margin-bottom: 40px;
        }
        
        .feature {
            background: #f8f9fa;
            padding: 15px 20px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
            font-size: 1.1em;
            color: #333;
        }
        
        .status-section {
            background: #f0f8ff;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
        }
        
        .status-title {
            font-size: 1.5em;
            color: #333;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .status-item {
            text-align: center;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .status-label {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 5px;
        }
        
        .status-value {
            font-size: 1.5em;
            font-weight: bold;
            color: #333;
        }
        
        .status-healthy {
            color: #28a745;
        }
        
        .status-degraded {
            color: #ffc107;
        }
        
        .status-down {
            color: #dc3545;
        }
        
        .company-info {
            background: #fff;
            border: 2px solid #e9ecef;
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .company-name {
            font-size: 1.3em;
            color: #333;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .company-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .company-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
            padding: 8px 16px;
            border-radius: 20px;
            background: #f8f9ff;
            transition: all 0.3s ease;
        }
        
        .company-link:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
        }
        
        .footer {
            text-align: center;
            color: #666;
            font-size: 0.9em;
            border-top: 1px solid #e9ecef;
            padding-top: 20px;
        }
        
        .metadata {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin-top: 15px;
        }
        
        .metadata-item {
            font-size: 0.8em;
            color: #888;
        }
        
        .metadata-label {
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 20px;
            }
            
            .title {
                font-size: 2em;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
            
            .company-links {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">{{welcome.title}}</h1>
            <p class="subtitle">{{welcome.subtitle}}</p>
            <p class="description">{{welcome.description}}</p>
        </div>
        
        <div class="features">
            {{#each welcome.features}}
            <div class="feature">{{this}}</div>
            {{/each}}
        </div>
        
        <div class="status-section">
            <h2 class="status-title">🚀 系统状态监控</h2>
            <div class="status-grid">
                <div class="status-item">
                    <div class="status-label">系统状态</div>
                    <div class="status-value status-{{systemStatus.status}}">
                        {{#if (eq systemStatus.status 'healthy')}}✅ 健康{{/if}}
                        {{#if (eq systemStatus.status 'degraded')}}⚠️ 降级{{/if}}
                        {{#if (eq systemStatus.status 'down')}}❌ 故障{{/if}}
                    </div>
                </div>
                <div class="status-item">
                    <div class="status-label">运行时间</div>
                    <div class="status-value">{{systemStatus.uptime}}秒</div>
                </div>
                <div class="status-item">
                    <div class="status-label">访问次数</div>
                    <div class="status-value">{{systemStatus.visitCount}}</div>
                </div>
                <div class="status-item">
                    <div class="status-label">内存使用率</div>
                    <div class="status-value">{{systemStatus.memoryUsage.percentage}}%</div>
                </div>
            </div>
        </div>
        
        <div class="company-info">
            <div class="company-name">{{companyInfo.name}}</div>
            <div class="company-links">
                <a href="{{companyInfo.website}}" class="company-link" target="_blank">🌐 官方网站</a>
                <a href="mailto:{{companyInfo.supportEmail}}" class="company-link">📧 技术支持</a>
            </div>
        </div>
        
        <div class="footer">
            <p>🎯 {{appInfo.name}} v{{appInfo.version}} | 运行环境: {{appInfo.environment}}</p>
            <div class="metadata">
                <div class="metadata-item">
                    <span class="metadata-label">生成时间:</span> {{metadata.generatedAt}}
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">请求ID:</span> {{metadata.requestId}}
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">模板版本:</span> {{metadata.version}}
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * 渲染模板
   * 使用简单的模板引擎替换占位符
   * @param template 模板内容
   * @param data 模板数据
   * @returns 渲染后的HTML
   */
  private renderTemplate(template: string, data: WelcomeTemplateData): string {
    let rendered = template;

    // 替换简单变量 {{path.to.value}}
    rendered = rendered.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      const value = this.getNestedValue(data, path.trim());
      return value !== undefined ? String(value) : match;
    });

    // 处理数组循环 {{#each array}}
    rendered = rendered.replace(
      /\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g,
      (match, arrayPath, itemTemplate) => {
        const array = this.getNestedValue(data, arrayPath.trim());
        if (!Array.isArray(array)) return '';

        return array
          .map((item) => {
            return itemTemplate.replace(/\{\{this\}\}/g, String(item));
          })
          .join('');
      },
    );

    // 处理条件判断 {{#if condition}}
    rendered = rendered.replace(
      /\{\{#if\s+\(eq\s+([^)]+)\s+['"]([^'"]+)['"]\)\}\}([\s\S]*?)\{\{\/if\}\}/g,
      (match, path, value, content) => {
        const actualValue = this.getNestedValue(data, path.trim());
        return actualValue === value ? content : '';
      },
    );

    return rendered;
  }

  /**
   * 获取嵌套对象的值
   * 支持点号路径访问，如 'app.name'
   * @param obj 对象
   * @param path 路径
   * @returns 值
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }

  /**
   * 验证模板数据
   * 确保必需的数据字段存在
   * @param data 模板数据
   */
  private validateTemplateData(data: WelcomeTemplateData): void {
    const requiredFields = [
      'appInfo.name',
      'appInfo.version',
      'welcome.title',
      'systemStatus.status',
      'companyInfo.name',
      'metadata.generatedAt',
    ];

    for (const field of requiredFields) {
      const value = this.getNestedValue(data, field);
      if (value === undefined || value === null) {
        throw new InvalidTemplateDataException(
          'welcome',
          `必需字段 '${field}' 缺失`,
          data,
        );
      }
    }
  }

  /**
   * 清理模板缓存
   * 用于内存管理和缓存更新
   */
  clearTemplateCache(): void {
    this.templateCache.clear();
    this.logger.log('模板缓存已清理');
  }

  /**
   * 获取缓存统计信息
   * 用于监控和调试
   * @returns 缓存统计
   */
  getCacheStats(): {
    size: number;
    entries: Array<{ name: string; hitCount: number; lastModified: string }>;
  } {
    const entries = Array.from(this.templateCache.entries()).map(
      ([name, cache]) => ({
        name,
        hitCount: cache.hitCount,
        lastModified: cache.lastModified.toISOString(),
      }),
    );

    return {
      size: this.templateCache.size,
      entries,
    };
  }
}

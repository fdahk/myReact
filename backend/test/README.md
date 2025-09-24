端到端测试目录

运行 pnpm run test:e2e 时：
Jest启动：使用 test/jest-e2e.json 配置
文件发现：查找所有 *.e2e-spec.ts 文件
TypeScript编译：使用 ts-jest 编译TypeScript文件
测试执行：
执行 beforeAll 钩子：创建测试应用实例
运行各个测试用例：发送HTTP请求并验证响应
执行 afterAll 钩子：清理应用实例
/*
实现目标：
- 基于某个类型 T，生成一个“必须拥有 T 全部属性，但也允许继续扩展任意键值”的类型。

核心思路：
- 用交叉类型把 `T` 和 `Record<string, any>` 合并。
- 这样既保留了 T 的必填属性，又允许新增任意字符串键。

复杂度 / 运行特征：
- 纯类型工具，无运行时开销。

易错点：
- `Record<string, any>` 会放宽新增属性约束，适合面试题，不适合严格业务建模。
*/

type Extendable<T> = T & Record<string, any>;

interface BaseConfig {
  url: string;
  timeout: number;
}

type ExtendableConfig = Extendable<BaseConfig>;

const config: ExtendableConfig = {
  url: '/api/user',
  timeout: 3000,
  retry: 2,
  cache: true,
};

/*
实现目标：
- 手写一个 `Pick<T, K>`，从对象类型 `T` 中挑出指定键 `K` 组成新类型。

核心思路：
- `keyof T` 先拿到 T 的全部键。
- `K extends keyof T` 保证只能传入合法键。
- `[P in K]: T[P]` 用映射类型把目标键逐个拷贝出来。

复杂度 / 运行特征：
- 这是 TypeScript 类型系统能力，没有运行时开销。

易错点：
- 忘记写 `K extends keyof T` 会导致可以传入不存在的键。
- `[P in K]` 是类型层面的遍历，不是运行时循环。
*/

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  id: number;
  name: string;
  active: boolean;
}

type UserBaseInfo = MyPick<User, 'id' | 'name'>;

const userBaseInfo: UserBaseInfo = {
  id: 1,
  name: 'Alice',
};

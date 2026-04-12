// 判断不是 `never`：

type IsNever<T> = [T] extends [never] ? true : false;
type IsNotNever<T> = [T] extends [never] ? false : true;

// 这里要用方括号包一层，避免分布式条件类型把 `never` 特殊展开掉。

// 普通条件类型：

type IsString<T> = T extends string ? true : false;

// 如果传入联合类型：

type UnionString = IsString<string | number>;

// TypeScript 会自动分发成：

type B = IsString<string> | IsString<number>;
// true | false

// 这叫 **分布式条件类型**。

// 问题在于 `never` 很特殊。  
// 如果直接写：

type BadIsNever<T> = T extends never ? true : false;

// 当 `T = never` 时，很多人以为结果一定是 `true`，但因为条件类型会分发，而 `never` 可以理解成“没有任何成员可供分发”，所以结果不会按直觉走。

// 我们把它包成：

type IsNever2<T> = [T] extends [never] ? true : false;

// 这样做的作用不是“变数组”，而是：

// > 把 `T` 当作一个整体去比较，从而关闭条件类型的自动分发行为。

// **推断函数返回值类型：**

type MyReturnType1<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never;

// `infer R` 就是在条件类型里把返回值类型提出来。

// `infer` 理解成：在条件类型匹配成功时，把其中某一部分类型“抓出来”，绑定到一个临时类型变量上。
// 它很像类型世界里的“解构”。

//例如：

type MyReturnType2<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never;

// 1. `T` 必须是函数类型,如果 `T` 能匹配这个函数模板：

// `(...args: any[]) => infer R`

// 3. 那么把返回值类型提取出来，命名成 `R`
// 4. 最终返回 `R`

// 例子：

type Fn = (name: string) => number;
type Result = MyReturnType2<Fn>; // number

// 这里的 `R` 最终就是 `number`。

// 再举一个数组例子：

type ElementType<T> = T extends (infer U)[] ? U : never;

// 如果：

type A = ElementType<string[]>; // string

// 这里的 `infer U` 就是在说：

// > 如果 T 长得像“某种元素组成的数组”，那把这个元素类型提出来，叫 U。
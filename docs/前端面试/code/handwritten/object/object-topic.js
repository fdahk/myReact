/*
实现目标：
- 用一个可直接运行的示例文件，系统串起 JavaScript 对象专题里的核心知识。
- 内容覆盖对象创建、属性访问、属性描述符、原型对象、对象原型、原型链、继承、this、拷贝与冻结等高频面试点。
-
核心思路：
- 每个知识点都尽量用最小可运行代码表达，并在相邻位置补充“这个现象说明了什么”。
- 重点不是堆 API，而是把对象系统最重要的几条关系讲清楚：属性在哪、原型是谁、查找如何发生、继承如何建立。
-
复杂度 / 运行特征：
- 这是教学型代码文件，不是业务工具函数；重点在于“表达知识”，不是封装一个可复用库。
- 单段代码都较短，适合按章节运行、断点调试、逐步观察打印结果。
-
易错点：
- 很多人会把“构造函数的 prototype”和“实例对象的原型”混为一谈。
- `Object.assign` / 展开运算符默认是浅拷贝，不会递归复制深层引用。
- `for...in` 会枚举可枚举的继承属性，而 `Object.keys` 只返回对象自身可枚举字符串键。
-
适用场景 / 面试表达点：
- 适合复习对象系统全景、串联 `new` / `instanceof` / 原型链 / 继承这些基础题。
- 面试里如果能把“对象自身属性”和“原型链属性”的查找关系讲清楚，通常基础会显得比较扎实。
*/


function section(title) {
  console.log(`\n=== ${title} ===`);
}

console.log('1) 对象优先读取自身属性，找不到再沿原型链查找');

const literalUser = {
  name: 'Alice',
  role: 'engineer',
};

const objectUser = new Object();
objectUser.name = 'Bob';
objectUser.role = 'designer';

const protoTemplate = {
  shared: 'from prototype',
};
const createdUser = Object.create(protoTemplate);
createdUser.name = 'Cindy';

console.log(literalUser);
console.log(objectUser);
console.log(createdUser.name, createdUser.shared);

console.log('2) 构造函数的 prototype 用来给实例共享成员');

function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log(`Hi, I am ${this.name}`);
};

const p1 = new Person("Tom");
Person = {
  prototype: {
    constructor: Person,
    sayHi: [Function]
  }
}

p1 = {
  name: "Tom",
  __proto__: Person.prototype
}

const profile = {
  name: 'Tom',
};

console.log(profile.name);
console.log(profile.age);

profile.age = 20;
console.log('age' in profile);
console.log(Object.hasOwn(profile, 'age'));

console.log('3) 实例的原型可通过 Object.getPrototypeOf(instance) 获取');

const account = {};
Object.defineProperty(account, 'id', {
  value: 1001,
  writable: false,
  enumerable: true,
  configurable: false,
});

account.id = 2002;
console.log(account.id);
console.log(Object.getOwnPropertyDescriptor(account, 'id'));

console.log('4) 继承的本质是建立对象之间的委托 / 原型链关系');

function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function sayHi() {
  return `Hi, ${this.name}`;
};

const person = new Person('Jerry');

// `Person.prototype` 是“构造函数的原型对象”，用来给实例共享方法。
console.log(Person.prototype.sayHi === person.__proto__.sayHi);

// 实例对象真正的原型推荐用 `Object.getPrototypeOf` 读取。
console.log(Object.getPrototypeOf(person) === Person.prototype);

// `person` 自身没有 `sayHi`，读取时会沿原型链向上查找。
console.log(person.sayHi());
console.log(Object.hasOwn(person, 'sayHi'));

console.log('5) Object.assign 和展开运算符默认都只是浅拷贝');

const animal = {
  canEat: true,
};

const dog = Object.create(animal);
dog.bark = function bark() {
  return 'wang';
};

console.log(dog.bark());
console.log(dog.canEat);
console.log(Object.getPrototypeOf(dog) === animal);
console.log(Object.getPrototypeOf(Object.getPrototypeOf(dog)) === Object.prototype);

console.log('6) Constructor Inheritance + Prototype Inheritance');

// 父构造函数：负责初始化每个实例自己的属性。
// `name` 和 `colors` 都会直接挂到实例本身上，而不是挂到原型上。
// 其中 `colors` 是引用类型，这里故意放在构造函数里，
// 这样每次 `new` 都会创建一份独立数组，避免实例之间互相污染。
function Animal(name) {
  this.name = name;
  this.colors = ['black'];
}

// 挂到原型上的方法会被所有实例共享。
// 当实例自身找不到 `getName` 时，会沿着原型链找到这里。
Animal.prototype.getName = function getName() {
  return this.name;
};

// 子构造函数：先借用父构造函数初始化实例自己的父类字段，
// 再补充子类自己的字段。
function Dog(name, breed) {
  // `Animal.call(this, name)` 的本质：
  // 1. 立即执行一次 `Animal`
  // 2. 把 `Animal` 里的 `this` 强行绑定到当前正在创建的 `Dog` 实例上
  // 3. 于是 `name`、`colors` 就会变成当前 `Dog` 实例自己的属性
  // 这一步解决的是“实例属性复用”和“引用类型共享污染”问题。
  Animal.call(this, name);
  this.breed = breed;
}

// 让 `Dog.prototype` 继承自 `Animal.prototype`。
// `Object.create(Animal.prototype)` 会创建一个新对象，
// 并把这个新对象的隐式原型 `[[Prototype]]` 指向 `Animal.prototype`。
// 这样 `dogA` 在找不到某个属性时，就能继续沿着这条原型链向上查找。
Dog.prototype = Object.create(Animal.prototype);

// 上一行会导致默认的 `constructor` 丢失，变成指向 `Animal`，
// 所以通常要手动修正回来，让它重新指向 `Dog`。
Dog.prototype.constructor = Dog;

// 子类自己的原型方法，供所有 `Dog` 实例共享。
Dog.prototype.getBreed = function getBreed() {
  return this.breed;
};

// 创建两个独立的 `Dog` 实例。
const dogA = new Dog('Lucky', 'Border Collie');
const dogB = new Dog('Coco', 'Poodle');

// 修改 `dogA` 自己的 `colors` 数组。
// 因为 `colors` 是通过 `Animal.call(this, name)` 挂到实例本身上的，
// 所以这里只会影响 `dogA`，不会影响 `dogB`。
dogA.colors.push('white');

// `getName()` 没有定义在实例上，但能从 `Dog.prototype -> Animal.prototype`
// 这条原型链上找到；`getBreed()` 则会先在 `Dog.prototype` 上找到。
console.log(dogA.getName(), dogA.getBreed());

// 这里能证明 `dogB.colors` 没有被 `dogA` 的修改影响，
// 说明构造函数继承成功避免了引用类型共享问题。
console.log(dogB.colors);

console.log('7) instanceof And isPrototypeOf');

// `instanceof` 会沿着实例的原型链向上找：
// 只要某一层原型对象严格等于右侧构造函数的 `prototype`，结果就是 `true`。
console.log(dogA instanceof Dog);
console.log(dogA instanceof Animal);

// `isPrototypeOf` 更直接：判断当前对象是否出现在目标对象的原型链上。
// 它和 `instanceof` 验证的是同一类关系，只是写法和观察角度不同。
console.log(Animal.prototype.isPrototypeOf(dogA));
console.log(Dog.prototype.isPrototypeOf(dogA));

console.log('8) this In Object Method');

const counter = {
  count: 0,
  // 作为对象方法调用时，`this` 默认指向“点号前面的对象”，也就是 `counter`。
  inc() {
    this.count += 1;
    return this.count;
  },
};

// 把方法单独取出来后，函数调用位置变了。
// 此时它不再是“以 `counter.inc()` 的形式调用”，
// 所以 `this` 也不再自动指向 `counter`。
const detachedInc = counter.inc;
console.log(counter.inc());

try {
  // 在严格模式下，这里的 `this` 会是 `undefined`；
  // 非严格模式下通常会指向全局对象。
  // 无论哪种情况，都已经不是我们想要的 `counter` 了。
  console.log(detachedInc());
} catch (error) {
  console.log('detached call error:', error.message);
}

// `bind(counter)` 会返回一个新的绑定函数，
// 无论之后在哪里调用，这个新函数内部的 `this` 都固定为 `counter`。
const boundInc = counter.inc.bind(counter);
console.log(boundInc());

console.log('9) Enumeration');

// `base` 作为原型对象，`child` 通过 `Object.create(base)` 继承它。
const base = {
  inheritedKey: 'from prototype',
};
const child = Object.create(base);
child.ownKey = 'from self';

// `for...in` 会遍历“对象自身 + 可枚举的继承属性”。
// 这个例子里会依次拿到两个字符串键：
// 1. `ownKey`，因为它是 `child` 自己的可枚举属性
// 2. `inheritedKey`，因为它来自 `base`，并且同样是可枚举属性
// 所以控制台会打印：
// `for...in: ownKey`
// `for...in: inheritedKey`
for (const key in child) {
  console.log('for...in:', key);
}

// `Object.keys()` 只返回对象“自身”的可枚举字符串键。
// 因此这里不会包含原型上的 `inheritedKey`，结果是：
// `['ownKey']`
console.log('Object.keys:', Object.keys(child));

// `Reflect.ownKeys()` 只看对象“自身”，但范围更大：
// 它会返回所有自有键，包括不可枚举键和 Symbol 键。
// 当前示例里 `child` 只有一个自有字符串键 `ownKey`，
// 没有不可枚举键，也没有 Symbol 键，所以结果同样是：
// `['ownKey']`
// Symbol 是一种特殊键类型，规范故意让它默认不出现在传统的字符串枚举 API 里。这个设计是为了同时满足三件事：
// 保证键唯一，避免命名冲突
// 让内部/协议属性不干扰普通对象遍历
// 不破坏旧代码对 Object.keys() 等 API 的既有认知
// 所以不是“Symbol 不算自有键”，而是：
console.log('Reflect.ownKeys:', Reflect.ownKeys(child));

console.log('10) Shallow Copy');

const source = {
  name: 'source',
  meta: {
    level: 1,
  },
};

// 这两种写法都只是“浅拷贝”：
// 第一层对象壳子是新的，但内部嵌套对象 `meta` 仍然共享同一个引用。
const copiedByAssign = Object.assign({}, source);
const copiedBySpread = { ...source };

// 修改浅拷贝对象内部的嵌套对象，本质上是在改共享引用指向的同一份数据，
// 所以 `source.meta.level` 也会一起变化。
copiedByAssign.meta.level = 2;
console.log(source.meta.level);

// `true` 说明两者的 `meta` 指向同一个对象，进一步证明这只是浅拷贝。
console.log(copiedBySpread.meta === source.meta);

console.log('11) Freeze / Seal / Prevent Extensions');

const extensible = { name: 'open' };

// `preventExtensions` 禁止新增属性，但已有属性仍然可以修改或删除
// （前提是属性本身可写、可配置）。
Object.preventExtensions(extensible);
extensible.extra = 'blocked';
console.log(extensible.extra);

const sealed = { name: 'sealed' };

// `seal` = 禁止新增属性 + 禁止删除属性。
// 但如果现有属性是可写的，仍然允许改值。
Object.seal(sealed);
delete sealed.name;
sealed.name = 'updated';
console.log(sealed);

const frozen = { name: 'frozen', meta: { level: 1 } };

// `freeze` 会让对象自身变得“最严格”：
// 不能新增、不能删除、不能修改第一层属性值。
// 但要注意：它默认仍然只是“浅冻结”。
Object.freeze(frozen);
frozen.name = 'changed';

// `meta` 指向的内部对象并没有被递归冻结，
// 所以这里仍然可以改成功，这也是很多面试题常考的点。
frozen.meta.level = 2;
console.log(frozen.name);
console.log(frozen.meta.level);

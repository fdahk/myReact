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

function Animal(name) {
  this.name = name;
  this.colors = ['black'];
}

Animal.prototype.getName = function getName() {
  return this.name;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.getBreed = function getBreed() {
  return this.breed;
};

const dogA = new Dog('Lucky', 'Border Collie');
const dogB = new Dog('Coco', 'Poodle');
dogA.colors.push('white');

console.log(dogA.getName(), dogA.getBreed());
console.log(dogB.colors);

console.log('7) instanceof And isPrototypeOf');

console.log(dogA instanceof Dog);
console.log(dogA instanceof Animal);
console.log(Animal.prototype.isPrototypeOf(dogA));
console.log(Dog.prototype.isPrototypeOf(dogA));

console.log('8) this In Object Method');

const counter = {
  count: 0,
  inc() {
    this.count += 1;
    return this.count;
  },
};

const detachedInc = counter.inc;
console.log(counter.inc());

try {
  console.log(detachedInc());
} catch (error) {
  console.log('detached call error:', error.message);
}

const boundInc = counter.inc.bind(counter);
console.log(boundInc());

console.log('9) Enumeration');

const base = {
  inheritedKey: 'from prototype',
};
const child = Object.create(base);
child.ownKey = 'from self';

for (const key in child) {
  console.log('for...in:', key);
}

console.log('Object.keys:', Object.keys(child));
console.log('Reflect.ownKeys:', Reflect.ownKeys(child));

console.log('10) Shallow Copy');

const source = {
  name: 'source',
  meta: {
    level: 1,
  },
};

const copiedByAssign = Object.assign({}, source);
const copiedBySpread = { ...source };

copiedByAssign.meta.level = 2;
console.log(source.meta.level);
console.log(copiedBySpread.meta === source.meta);

console.log('11) Freeze / Seal / Prevent Extensions');

const extensible = { name: 'open' };
Object.preventExtensions(extensible);
extensible.extra = 'blocked';
console.log(extensible.extra);

const sealed = { name: 'sealed' };
Object.seal(sealed);
delete sealed.name;
sealed.name = 'updated';
console.log(sealed);

const frozen = { name: 'frozen', meta: { level: 1 } };
Object.freeze(frozen);
frozen.name = 'changed';
frozen.meta.level = 2;
console.log(frozen.name);
console.log(frozen.meta.level);

# Vue 3 核心知识

## 一、ref 和 reactive 基础对比

### 1.1 基本定义

#### ref
**特点：**
- 可以包装任何类型的值（基本类型、对象、数组）
- 返回一个响应式的引用对象（RefImpl）
- 访问和修改需要通过 `.value` 属性
- 模板中自动解包，不需要 `.value`

#### reactive
**特点：**
- 只能用于对象类型（对象、数组、Map、Set）
- 返回对象的响应式代理（Proxy）
- 直接访问属性，不需要 `.value`
- 解构会失去响应性

---

### 1.2 核心区别对比表

| 维度 | ref | reactive |
|------|-----|----------|
| **适用类型** | 基本类型 + 对象类型 | 仅对象类型 |
| **访问方式** | 需要 `.value`（模板中除外） | 直接访问属性 |
| **替换整个对象** | ✅ 可以 | ❌ 不可以（会失去响应性） |
| **解构** | ✅ 可以（配合 toRefs） | ❌ 直接解构失去响应性 |
| **模板自动解包** | ✅ 是 | N/A |
| **底层实现** | RefImpl 类 | Proxy 代理 |
| **深层响应式** | ✅ 是 | ✅ 是 |

---

### 1.3 详细区别说明

#### 1.3.1 整体替换

```javascript
// ✅ ref 可以整体替换
const user = ref({ name: 'Alice', age: 20 })
user.value = { name: 'Bob', age: 25 }  // ✅ 仍保持响应性

// ❌ reactive 不能整体替换
let state = reactive({ count: 0 })
state = { count: 10 }  // ❌ 失去响应性，变成普通对象

// 正确做法：逐个属性修改或使用 Object.assign
Object.assign(state, { count: 10 })  // ✅
```

#### 1.3.2 解构问题

```javascript
// ❌ reactive 直接解构失去响应性
const state = reactive({ count: 0, name: 'Vue' })
let { count, name } = state  // ❌ 失去响应性
count++  // 不会触发更新

// ✅ 使用 toRefs 解构
import { toRefs } from 'vue'
const { count, name } = toRefs(state)  // ✅ 保持响应性
count.value++  // 触发更新

// ref 本身就是引用，配合 toRefs 也能解构
const user = ref({ name: 'Alice', age: 20 })
const { name, age } = toRefs(user.value)
```

#### 1.3.3 嵌套响应性

```javascript
// ref 包裹对象时，内部也是响应式的
const user = ref({
  name: 'Alice',
  address: {
    city: 'Beijing'
  }
})
user.value.address.city = 'Shanghai'  // ✅ 响应式

// reactive 默认深层响应式
const state = reactive({
  user: {
    address: {
      city: 'Beijing'
    }
  }
})
state.user.address.city = 'Shanghai'  // ✅ 响应式
```

---

## 二、ref 嵌套对象的深层响应式详解

### 核心结论：ref 对象的深层数据是响应式的 ✅

当 `ref` 包裹一个对象时，Vue 会自动将这个对象转换为深层响应式，所有嵌套属性的修改都会触发更新。

---

### 2.1 深层响应式的工作原理

#### 原理 1：ref 内部调用 reactive

```javascript
// ref 的简化实现
function ref(value) {
  return {
    _value: convert(value),
    get value() { return this._value },
    set value(newValue) { this._value = convert(newValue) }
  }
}

// convert 函数：对象类型会调用 reactive
function convert(value) {
  return typeof value === 'object' && value !== null
    ? reactive(value)  // 👈 关键：对象会被 reactive 处理
    : value
}
```

**所以：**
```javascript
const user = ref({ 
  name: 'Alice',
  address: { city: 'Beijing' }
})

// 等价于：
const user = {
  value: reactive({ 
    name: 'Alice',
    address: { city: 'Beijing' }
  })
}
```

#### 原理 2：reactive 递归处理嵌套对象

```javascript
// reactive 的 get 拦截器
get(target, key, receiver) {
  const result = Reflect.get(target, key, receiver)
  
  // 如果访问的属性是对象，递归创建响应式
  if (typeof result === 'object' && result !== null) {
    return reactive(result)  // 👈 惰性深层响应式
  }
  
  return result
}
```

---

### 2.2 shallowRef vs ref（浅层 vs 深层响应式）

如果你**不需要**深层响应式，可以使用 `shallowRef` 来提升性能。

#### ref（深层响应式）

```javascript
import { ref } from 'vue'

const user = ref({
  name: 'Alice',
  profile: { age: 25 }
})

// ✅ 深层属性修改会触发更新
user.value.profile.age = 26  // 触发更新
```

#### shallowRef（浅层响应式）

```javascript
import { shallowRef } from 'vue'

const user = shallowRef({
  name: 'Alice',
  profile: { age: 25 }
})

// ❌ 深层属性修改不会触发更新
user.value.profile.age = 26  // 不触发更新

// ✅ 只有替换整个 .value 才会触发更新
user.value = { name: 'Bob', profile: { age: 30 } }  // 触发更新
```

#### 对比表

| 特性 | ref | shallowRef |
|------|-----|------------|
| **深层响应式** | ✅ 是 | ❌ 否 |
| **修改深层属性** | 触发更新 | 不触发更新 |
| **替换整个值** | 触发更新 | 触发更新 |
| **性能** | 略慢（需要递归代理） | 快（只代理第一层） |
| **使用场景** | 常规数据 | 大型数据结构、只需整体替换 |

---

### 2.3 深层响应式的性能考虑

#### 惰性响应式（Lazy Reactive）

Vue 3 使用**惰性策略**，不会一次性代理所有嵌套对象，而是在访问时才代理：

```javascript
const data = ref({
  level1: {
    level2: {
      level3: {
        value: 'deep'
      }
    }
  }
})

// 初始化时：只代理 level1
// 访问 data.value.level1.level2 时：才代理 level2
// 访问 data.value.level1.level2.level3 时：才代理 level3
```

**优点：**
- 初始化性能好
- 不访问的深层对象不会被代理
- 按需创建响应式

#### 性能优化建议

```javascript
// ❌ 不推荐：频繁修改深层属性
function updateUser() {
  user.value.profile.address.city = 'Shanghai'
  user.value.profile.address.street = 'Nanjing Rd'
  user.value.profile.age = 26
  // 每次修改都触发更新，共 3 次
}

// ✅ 推荐：批量更新或整体替换
function updateUser() {
  user.value = {
    ...user.value,
    profile: {
      ...user.value.profile,
      age: 26,
      address: {
        city: 'Shanghai',
        street: 'Nanjing Rd'
      }
    }
  }
  // 只触发 1 次更新
}

// ✅ 或者使用 Object.assign
function updateUser() {
  Object.assign(user.value.profile, {
    age: 26,
    address: { city: 'Shanghai', street: 'Nanjing Rd' }
  })
}
```

---

## 三、ref 和 reactive 底层实现原理

### 3.1 Vue 3 响应式系统架构

Vue 3 的响应式系统基于 ES6 的 **Proxy** 和 **Reflect** API，核心包括：

1. **reactive()** - 创建响应式对象
2. **ref()** - 创建响应式引用
3. **effect()** - 副作用函数（依赖追踪）
4. **track()** - 依赖收集
5. **trigger()** - 触发更新

---

### 3.2 reactive 的底层实现

#### 核心原理

`reactive` 基于 **ES6 Proxy** 实现，通过代理对象的读取和修改操作来实现响应式。

**简化版源码实现：**

```javascript
// 1. 存储依赖的 WeakMap
// targetMap -> target -> key -> dep (Set of effects)
const targetMap = new WeakMap()

// 2. 当前正在执行的副作用函数
let activeEffect = null

// 3. reactive 实现
function reactive(target) {
  // 只能代理对象类型
  if (typeof target !== 'object' || target === null) {
    return target
  }
  
  return new Proxy(target, {
    // 拦截读取操作
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      
      // 依赖收集
      track(target, key)
      
      // 如果属性值是对象，递归创建响应式
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }
      
      return result
    },
    
    // 拦截设置操作
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      
      // 值改变时触发更新
      if (oldValue !== value) {
        trigger(target, key)
      }
      
      return result
    },
    
    // 拦截删除操作
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
      trigger(target, key)
      return result
    }
  })
}

// 4. 依赖收集
function track(target, key) {
  if (!activeEffect) return
  
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  
  // 将当前副作用函数添加到依赖集合
  dep.add(activeEffect)
}

// 5. 触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const dep = depsMap.get(key)
  if (!dep) return
  
  // 执行所有依赖的副作用函数
  dep.forEach(effect => effect())
}

// 6. 副作用函数
function effect(fn) {
  activeEffect = fn
  fn() // 立即执行，触发依赖收集
  activeEffect = null
}
```

#### 依赖收集流程

```
读取 state.count
    ↓
触发 Proxy 的 get 拦截器
    ↓
调用 track(target, 'count')
    ↓
将 activeEffect 添加到 targetMap 中
    ↓
targetMap: {
  state: {
    count: Set([effect1, effect2])
  }
}
```

#### 触发更新流程

```
修改 state.count = 1
    ↓
触发 Proxy 的 set 拦截器
    ↓
调用 trigger(target, 'count')
    ↓
从 targetMap 中找到所有依赖
    ↓
执行所有 effect 函数
    ↓
视图更新
```

---

### 3.3 ref 的底层实现

#### 核心原理

`ref` 通过创建一个包装对象（RefImpl），使用 **getter/setter** 实现响应式。

**简化版源码实现：**

```javascript
class RefImpl {
  constructor(value) {
    this._value = convert(value)
    this.__v_isRef = true // 标记为 ref
  }
  
  // getter：依赖收集
  get value() {
    track(this, 'value')
    return this._value
  }
  
  // setter：触发更新
  set value(newValue) {
    if (newValue !== this._value) {
      this._value = convert(newValue)
      trigger(this, 'value')
    }
  }
}

// 转换值：对象类型用 reactive，基本类型直接返回
function convert(value) {
  return typeof value === 'object' && value !== null
    ? reactive(value)
    : value
}

// ref 工厂函数
function ref(value) {
  return new RefImpl(value)
}
```

#### 为什么 ref 需要 .value？

```javascript
// 基本类型无法被 Proxy 代理
let count = 0 // 基本类型，无法拦截操作

// 所以需要包装成对象
const count = { value: 0 } // 现在可以拦截 .value 的访问
```

**核心原因：**
- JavaScript 的基本类型（number、string、boolean）是按值传递的
- Proxy 只能代理对象，无法代理基本类型
- 所以 ref 创建了一个包装对象，将值存储在 `.value` 属性中

#### ref 和 reactive 的关系

```javascript
// ref 包装对象时，内部调用 reactive
const obj = ref({ count: 0 })

// 等价于
const obj = {
  value: reactive({ count: 0 })
}

// 所以这两种方式效果相同：
obj.value.count++ // ref 方式
const state = reactive({ count: 0 })
state.count++     // reactive 方式
```

---

### 3.4 完整示例：响应式系统运行流程

```javascript
// 1. 创建响应式数据
const state = reactive({ count: 0 })
const message = ref('Hello')

// 2. 创建副作用函数（组件渲染函数）
effect(() => {
  console.log(`Count: ${state.count}, Message: ${message.value}`)
})
// 输出: Count: 0, Message: Hello
// 此时依赖已收集

// 3. 修改数据
state.count = 1
// 流程：
// - 触发 Proxy set 拦截器
// - 调用 trigger(state, 'count')
// - 执行所有依赖的 effect
// - 输出: Count: 1, Message: Hello

message.value = 'World'
// 流程：
// - 触发 RefImpl 的 setter
// - 调用 trigger(message, 'value')
// - 执行所有依赖的 effect
// - 输出: Count: 1, Message: World
```

---

### 3.5 核心数据结构

#### targetMap 结构

```javascript
// WeakMap 结构：
targetMap = WeakMap {
  target1: Map {
    key1: Set([effect1, effect2]),
    key2: Set([effect3])
  },
  target2: Map {
    key1: Set([effect1])
  }
}

// 示例：
const state = reactive({ count: 0, name: 'Vue' })

targetMap = WeakMap {
  state: Map {
    'count': Set([renderEffect]),
    'name': Set([renderEffect])
  }
}
```

#### 为什么使用 WeakMap？

```javascript
// WeakMap 的 key 是弱引用
const targetMap = new WeakMap()

let obj = { count: 0 }
const proxy = reactive(obj)

targetMap.set(obj, new Map())

// 当 obj 不再被引用时，WeakMap 会自动清理
obj = null // obj 可以被垃圾回收，targetMap 中的条目也会被清理
```

**优点：**
- 防止内存泄漏
- 自动垃圾回收
- 不会阻止对象被回收

---

### 3.6 性能优化机制

#### 1. 惰性响应式（Lazy Reactive）

```javascript
const state = reactive({
  user: {
    profile: {
      name: 'Alice'
    }
  }
})

// 嵌套对象只有在访问时才会被转换为响应式
get(target, key) {
  const result = Reflect.get(target, key)
  
  // 惰性转换：只有访问时才 reactive
  if (typeof result === 'object') {
    return reactive(result) // 递归创建响应式
  }
  
  return result
}
```

#### 2. 避免重复代理

```javascript
const reactiveMap = new WeakMap()

function reactive(target) {
  // 如果已经代理过，直接返回
  const existing = reactiveMap.get(target)
  if (existing) {
    return existing
  }
  
  const proxy = new Proxy(target, handlers)
  reactiveMap.set(target, proxy)
  
  return proxy
}
```

#### 3. 批量更新（Scheduler）

```javascript
const queue = new Set()
let isFlushing = false

function trigger(target, key) {
  const effects = getEffects(target, key)
  
  effects.forEach(effect => {
    queue.add(effect) // 加入队列
  })
  
  // 批量执行
  if (!isFlushing) {
    isFlushing = true
    Promise.resolve().then(() => {
      queue.forEach(effect => effect())
      queue.clear()
      isFlushing = false
    })
  }
}
```

---

### 3.7 ref vs reactive 底层对比表

| 维度 | ref | reactive |
|------|-----|----------|
| **实现方式** | 类（RefImpl）+ getter/setter | Proxy 代理 |
| **数据存储** | `_value` 属性 | 原对象 |
| **拦截方式** | getter/setter | Proxy handler |
| **依赖收集键** | 'value' | 实际的 key |
| **基本类型支持** | ✅ 通过包装对象 | ❌ 无法代理 |
| **整体替换** | ✅ setter 可以替换 | ❌ 引用不变 |
| **性能** | 轻量，访问有 .value 开销 | 略重，但访问直接 |

---

## 四、总结

### 4.1 响应式原理三要素

```
1. 数据劫持（Proxy/Getter/Setter）
   ↓
2. 依赖收集（track）
   ↓
3. 触发更新（trigger）
```

### 4.2 响应式系统核心流程

```
组件渲染
  ↓
读取响应式数据（触发 getter/get）
  ↓
依赖收集（track）
  ↓
数据修改（触发 setter/set）
  ↓
触发更新（trigger）
  ↓
执行副作用函数（effect）
  ↓
组件重新渲染
```

### 4.3 为什么 Vue 3 用 Proxy 替代 Object.defineProperty？

**Vue 2 的问题（Object.defineProperty）：**
```javascript
// ❌ 无法检测新增属性
obj.newProp = 'value' // 不响应

// ❌ 无法检测数组索引修改
arr[0] = 'value' // 不响应

// ❌ 无法检测数组长度修改
arr.length = 0 // 不响应

// 需要使用 Vue.set 或特殊方法
Vue.set(obj, 'newProp', 'value')
```

**Vue 3 的优势（Proxy）：**
```javascript
// ✅ 可以检测新增属性
obj.newProp = 'value' // 响应式

// ✅ 可以检测数组操作
arr[0] = 'value' // 响应式
arr.length = 0 // 响应式

// ✅ 可以代理 13 种操作
// get, set, deleteProperty, has, ownKeys, etc.
```

### 4.4 Vue 2 vs Vue 3 核心优势对比

| 特性 | Vue 2 (defineProperty) | Vue 3 (Proxy) |
|------|----------------------|--------------|
| 新增属性 | ❌ 需要 Vue.set | ✅ 自动响应 |
| 删除属性 | ❌ 需要 Vue.delete | ✅ 自动响应 |
| 数组索引 | ❌ 不支持 | ✅ 支持 |
| 数组长度 | ❌ 不支持 | ✅ 支持 |
| Map/Set | ❌ 不支持 | ✅ 支持 |
| 性能 | 初始化遍历所有属性 | 惰性代理 |
| 兼容性 | IE9+ | IE 不支持 |

### 4.5 使用建议速查

| 场景 | 推荐方案 |
|------|---------|
| 基本类型 | `ref` |
| 简单对象且需要整体替换 | `ref` |
| 复杂对象且不需要整体替换 | `reactive` |
| 多个相关状态组合 | `reactive` |
| 需要解构返回 | `ref` + `toRefs` |
| 大型数据结构 | `shallowRef` 或 `shallowReactive` |
| 新手入门 | 统一用 `ref` |

**核心记忆点：**
- ✅ ref 可以用于任何类型，需要 `.value`，可以整体替换
- ✅ reactive 只能用于对象，不需要 `.value`，不能整体替换
- ✅ 两者的深层数据都是响应式的
- ✅ ref 内部对象会调用 reactive
- ✅ 选择标准：以代码清晰度和维护性为主

---









Vue中的:修饰就是动态的意思
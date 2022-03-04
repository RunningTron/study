

### css

### js

#### 原型和原型链

https://www.cnblogs.com/loveyaxin/p/11151586.html

概念

```txt
每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。那么假如我们让原型对象等于另一个类型的实例，结果会怎样？显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立。如此层层递进，就构成了实例与原型的链条。这就是所谓的原型链的基本概念
```

![image-20220303171736636](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220303171736636.png)



#### JSON.parse JSON.stringify 深拷贝的弊端

```txt
1.如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式，而不是对象的形式
2.如果obj里有RegExp(正则表达式的缩写)、Error对象，则序列化的结果将只得到空对象；
3.如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失；
4、如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null
5、JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor；
6、如果对象中存在循环引用的情况也无法正确实现深拷贝；
```



#### promise 和 async/await

​	promise es6  promise a+ 规范 

```txt
静态方法
	all(等所有resolve的返回 如果有一个报错就返回该报错) 
	race(任意一个返回就返回 不论是成功还是失败) 
	resolve 
	reject
实例方法
	then 
	catch
```



​		async await  es7 语法糖

区别

```txt
Promise是es6里的，async是es7了
Promise原来有规范的意义，Promise a、b、c、d等规范，最终确定的是promise a+规范
Promise链式操作，自己catch异常。async则要在函数内catch，好在现在catch成本较低。
Promise有很多并行神器，比如Promise.all\Promise.race等。这些是async没法搞定的。
Promise是显式的异步，而Async/await 让你的代码看起来是同步的，你依然需要注意异步。
Promise即使不支持es6，你依然可以用promise的库或polyfil，而async就很难做，当然也不是不能，成本会高很多。
 和 Array.forEach等结合，很多tc39提案都在路上或者已经实现，处于上升期，而promise也就那样了。
```



#### 闭包 

函数内部对外部变量的应用

```txt
好处

①保护函数内的变量安全 ，实现封装，防止变量流入其他环境发生命名冲突

②在内存中维持一个变量，可以做缓存（但使用多了同时也是一项缺点，消耗内存）

③匿名自执行函数可以减少内存消耗

坏处

①其中一点上面已经有体现了，就是被引用的私有变量不能被销毁，增大了内存消耗，造成内存泄漏，解决方法是可以在使用完变量后手动为它赋值为null；

②其次由于闭包涉及跨域访问，所以会导致性能损失，我们可以通过把跨作用域变量存储在局部变量中，然后直接访问局部变量，来减轻对执行速度的影响
```



#### js原生http请求

```txt
if(window.XMLHttpRequest) {
	xmlhttp = new XMLHttpRequest();
}else if(window.ActiveXObject) {
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
```



#### defineProperty

```js
let p1 = {
    name:'xxx',
    _age: null
}

// 1.属性所在的对象
// 2.属性的名字
// 3.一个描述符对象
Object.defineProperty(p1,'age',{
    // 表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性，默认值为true。
    enumerable:true,
    //enumerable：表示能否通过for in循环访问属性，默认值为true
    configurable: true,
    //.writable：表示能否修改属性的值。默认值为true。
    writable:true,
    // value：包含这个属性的数据值。默认值为undefined 不能和get set同时使用
    // value:18
    get(){
        console.log('get...')
        return this._age
    },
    set(newVal){
        console.log('set...')
        this._age = newVal
    }
})

console.log(p1['age'])
p1.age = 30
console.log(p1['age'])

```



#### proxy

​	访问对象前添加了一层拦截 https://www.cnblogs.com/kdcg/p/9145385.html

语法

```js
let p = new Proxy(target, handler);
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});
```



Proxy支持拦截的操作，一共有13种：

- **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
- **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
- **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
- **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
- **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
- **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
- **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。





#### Proxy 与 Object.defineProperty 优劣对比

```txt

Proxy 的优势如下:
    Proxy 可以直接监听对象而非属性；
    Proxy 可以直接监听数组的变化；
    Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
Object.defineProperty 的优势如下:
兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。
```

#### Reflect

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

​	一个内置的对象，它提供拦截 JavaScript 操作的方法

​	与大多数全局对象不同`Reflect`并非一个构造函数，所以不能通过[new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)对其进行调用，或者将`Reflect`对象作为一个函数来调用。`Reflect`的所有属性和方法都是静态的（就像[`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)对象）。



#### symbols 

es6新增的一个基本数据类型,表示独一无二的值，最大的用法是用来定义对象的唯一属性名

```js
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

s1 === s2 // false

// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");

s1 === s2 // false

// 作为属性名的Symbol
// 注意，Symbol值作为对象属性名时，不能用点运算符。

var mySymbol = Symbol();
// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};
// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```





#### Object Spread(展开运算符...)和 Object.assign() 

...

​	使用现有对象自身属性来创建普通对象

{...obj1}与object.assign({},obj1)类似 (都只能复制第一层)

区别

```txt
1. Object spread 操作符总是给你一个POJO(Plain Ordinary JavaScript Object)。而Object.assign（）函数却修改其第一个传入对象obj：
2. 扩展运算符（Object spread）不复制继承的属性或类的属性，但是它会复制ES6的 symbols 属性
```

**Object.assign（）修改了一个对象，因此它可以触发 ES6 setter。**

注意:

​	当一个 Object 使用了 Object.defineProperty 修改了 set 方法，因为调用 Object.assign 会触发 setter 方法，会触发意想不到的错误。





### html

#### 事件触发流程	

https://www.cnblogs.com/polk6/p/5154470.html

```txt
事件冒泡: 由内而外

事件捕获: 由外而内

阻止事件冒泡 事件捕获
```



### vue

​	vue3响应原理proxy

​	生命周期

​	this指向



#### vuex

https://zhuanlan.zhihu.com/p/78981485



### 插件

#### webpack

​		入口

#### 中间件

​	axios

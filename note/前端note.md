

### css

### js

#### 原型和原型链

https://www.cnblogs.com/loveyaxin/p/11151586.html

概念

```txt
每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。那么假如我们让原型对象等于另一个类型的实例，结果会怎样？显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立。如此层层递进，就构成了实例与原型的链条。这就是所谓的原型链的基本概念
```

![image-20220303171736636](..\static\img\image-20220303171736636.png)



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

用法:

```
Reflect.get(target, propertyKey[, receiver])  // 获取value
Reflect.set(target, propertyKey, value[, receiver])  // 返回true/false
```

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

阻止事件冒泡(stopPropagation()) 事件捕获
```



#### 浏览器渲染规则

https://blog.csdn.net/ysterling/article/details/86514136

https://www.cnblogs.com/slly/p/6640761.html

```txt
1.解析HTML生成DOM树
2.解析CSS生成CSSOM规则树
3.将DOM树与CSSOM规则树合并在一起生成渲染树
4.遍历渲染树开始布局，计算每个节点的位置大小信息
5.将渲染树每个节点绘制到屏幕
```

**reflow和repaint**

```txt
repaint:屏幕的一部分重画，不影响整体布局 元素的几何尺寸和位置不变。

reflow:意味着元件的几何尺寸变了，我们需要重新验证并计算渲染树。是渲染树的一部分或全部发生了变化

display:none 会触发reflow
visibility:hidden 只会触发repaint，

有些情况，比如修改了元素的样式，浏览器并不会立刻reflow或repaint一次，而是会把这样的操作积攒一批，然后做一个reflow，这又叫做异步reflow或增量异步reflow

有些情况，比如resize窗口，改变了页面默认的字体等，对于这些操作，浏览器会马上进行relow
```





### vue

​	vue3响应原理proxy

​	生命周期

​	this指向

vue-loader

##### 组件加载渲染过程

```txt
父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

子组件更新过程：
父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

父组件更新过程：
父 beforeUpdate -> 父 updated

销毁过程：
父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed
```

![1646660201571](..\static\img\1646660201571.png)

​	初始化patch(container, vnode)

​	更新update(vnode, newVnode)

##### 虚拟dom

​	js对象描述dom(vnode类)

​	vnode类

```txt
tag  -- 标签类型
attrs	-- 标签属性 class id...
children -- 子标签
```

​	虚拟dom如何转化为真是dom

​			遍历vnode

​			createElement(vnode.tag) 

​			setAttribute(attrName,attrVal)

​			遇到children递归





##### :is用法

1. 解决了html模板的限制

2. <component> + is 的骚操作

   ```vue
   // 控制componentName 控制组件切换
   <component :is="componentName"></component>
   ```

   

创建组件的方式

1. Vue.extend 来创建全局的Vue组件
2. 使用 Vue.component 创建局部组件



模板类型:

   1.模板组件

2. 函数组件(render函数)

##### keep-alive

vue的内置组件,把一些不常变动的组件或者需要缓存的组件用`<keep-alive>`包裹起来，这样`<keep-alive>`就会帮我们把组件保存在内存中，而不是直接的销毁，这样做可以保留组件的状态或避免多次重新渲染，以提高页面性能。

用法:

- `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。

- `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。

- `max` - 数字。最多可以缓存多少组件实例。 (淘汰策略LRU)

  LRU（**Least recently used**，最近最少使用）算法根据数据的历史访问记录来进行淘汰数据，其核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高”

原理:

```txt
this.keys // 缓存组件的key
this.cache // 缓存的组件 {keyName:component}
```

主要是render函数

```txt
命中缓存:

 	1. 直接从缓存中拿 vnode 的组件实例 
 	2. 将数据移到`this.keys`的尾部 (删除this.keys中此组件的key,然后再尾部插入此key)

没有命中缓存:
    1. this.cache中 缓存下来此组件 cache[key] = vnode
    2. 将新数据从尾部插入到`this.keys`中；
    3. 当`this.keys`满的时候，将头部的数据丢弃；

以上工作做完后设置 `vnode.data.keepAlive = true` ，最后将`vnode`返回。
```

activated和deactivated 两个钩子函数

​	它的执行时机是 `<keep-alive>` 包裹的组件激活时调用和停用时调用



#### nextTick

https://www.cnblogs.com/liuhao-web/p/8919623.html

原理:

使用MutationObserver (https://blog.csdn.net/weixin_45412353/article/details/107176246)



##### vuex

https://zhuanlan.zhihu.com/p/78981485





##### vue打包优化

https://baijiahao.baidu.com/s?id=1669814494837470462&wfr=spider&for=pc



### 插件

#### lodash

Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。

https://www.lodashjs.com/



#### webpack核心概念

##### 入口(entry)

##### 输出(output)

##### loader

​	loader让 webpack 能够去处理其他类型的文件，并将它们转换为有效 [模块](https://webpack.docschina.org/concepts/modules)，以供应用程序使用，以及被添加到依赖图中

两个属性：

1. `test` 属性，识别出哪些文件会被转换。
2. `use` 属性，定义出在进行转换时，应该使用哪个 loader。

```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]},
        // 多loader 执行顺序 从后往前
    ],
  },
};
```



##### 插件(plugin)

​	插件目的在于解决 loader 无法实现的其他事

​	webpack **插件**是一个具有 [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法的 JavaScript 对象。`apply` 方法会被 webpack compiler 调用，并且在 **整个** 编译生命周期都可以访问 compiler 对象

用法:

由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入一个 new 实例。

取决于你的 webpack 用法，对应有多种使用插件的方式。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
```





##### 模块(Modules)

在[模块化编程](https://en.wikipedia.org/wiki/Modular_programming)中，开发者将程序分解为功能离散的 chunk，并称之为 **模块**。

每个模块都拥有小于完整程序的体积，使得验证、调试及测试变得轻而易举

 精心编写的 **模块** 提供了可靠的抽象和封装界限，使得应用程序中每个模块都具备了条理清晰的设计和明确的目的。

```txt
Webpack 天生支持如下模块类型：
    ECMAScript 模块
    CommonJS 模块
    AMD 模块
    Assets
    WebAssembly 模块
```



##### 模式(mode)

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，

##### 浏览器兼容性(browser compatibility)

##### 环境(environment)

#### webpack

`WebPack`本来就可以看做是模块打包机，将项目结构模块化

**webpack的构建流程是**

```txt
1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
	在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果
```







##### webpack的面试问题

https://baijiahao.baidu.com/s?id=1706629892058057497&wfr=spider&for=pc



##### 前端代码打包的目的

https://www.jianshu.com/p/dce4e36b4204

```txt
第一点，代码层面：
    体积更小（Tree-Shaking 、压缩、合并），加载更快
    编译高级语言或语法（TS、ES6+、模块化、scss）
    兼容性和错误检查（Polyfill、postcss、eslint）

第二点，研发流程方面：
    统一、高效的开发环境
    统一的构建流程、产出标准
    集成公司构建规范（提测、上线等）
```



#### 中间件

​	axios



#### 性能优化

浏览器输入url并会车后发生了什么

https://www.baidu.com

url => 统一资源定位符, 俗称网址

https: 传输协议 (http和tcp之间加了一层 TSL或者SSL安全层)

www: 万维网 服务器

第一次访问

1. 域名解析 (第一次缓存在本地)
2. 拿到真实的IP
3. 建立连接(TCP的三次握手)
4. 拿到数据 渲染页面
5. 四次挥手

![1646661913350](..\static\img\1646661913350.png)



浏览器渲染过程



![1646661945631](..\static\img\1646661945631.png)

#### 一些题

https://www.cnblogs.com/queenya/p/13572754.html

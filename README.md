# Symbol 详解

# 1.Symbol 是什么？

symbol 是 JavaScript 的一种数据结构，具有唯一性，本文只介绍了其静态方法，关于静态属性请移步下方官方介绍

附上 MDN 官方介绍：
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol

# 2.基本使用:

```js
let b = Symbol(23);
let c = Symbol(23);
console.log(a == b); // false
console.log(a === b); // false
// 即使声明语句是一样的，创造出来的Symbol类型变量也不是相等的,这也应证了其唯一性的特点
```

# 3.应用场景：

```js
// 应用场景一：作为对象的唯一key值使用（也是利用唯一性）
let obj = {};
obj[Symbol(23)] = "张三";
console.log(obj[Symbol(23)]); // undefined 神奇的地方开始了
/*
原因在于，每次Symbol()时，都会生成一个新的Symbol属性，即使看上去一样，但是此时的obj对象里面是没有当前属性的，所以是undefined
*/
// 解决办法：变量表达式的方式
console.log(obj); // {Symbol(23):'张三'}
let sym = Symbol(1);
obj[sym] = "李四";
console.log(obj[sym]); // 李四
// 应用场景二：当业务逻辑巨复杂，有上百情况时，定义的字符容易重名（也是利用唯一性）
let list = {
    first:Symbol()
    second:Symbol()
    // ......
}
    if(ret === list.first){
    // to Do
    }else if(ret === list.second){
    // to Do
    }else if(){
        // ......
    }
```

# 4.个人总结：

感觉 Symbol 的用途就是通过其唯一性展开，但是实际情况中，实现唯一性的途径有很多，如随机数，数据每一项的唯一 id 等，而且更为简单方便，也许这就是 Symbol 用的少的原因吧。
还有一个最最最重要的原因，在 vue 中 v-for 的时候，需要绑定 key，根据 diff 算法，只有当时当前项自生的属性且是唯一的时候，才能发挥 vue 原地替换的优势，加快渲染速度，但是 Symbol 只是仅仅让他不爆错而已，连着最后的性能优化他也没能沾上边。当然，也可以在循环前，对数据进行处理，给每一项加上一个唯一的 Symbol，也能达到加快渲染的效果，可是已经有了 id 的情况下，又怎会画蛇添足呢，况且 id 后续可能会联动其他内容，但 Symbol 在控制台打印的时候始终是一样的，即便他们其实不一样。
尽管在常见的场景中 Symbol 如此不受待见，但是不可否认它依旧是一个优秀的属性，JavaScript 需要它才得以完整，在某些特殊情况，Symbol 将会有一个发挥的舞台。

# 5.为 Symbol 正名

```js
/**
 * 1.该函数是什么，用来干嘛的？
 * 解决项目开发中，对象属性有可能重名的问题，而且重心在value上不在key值上时，可以调用该函数添加属性
 *
 * 2.为什么要封装这个函数？
 * 让在项目中的你彻底避免担心对象属性重名的问题
 *
 * 3.如何使用？
 * 将你想赋值的对象和value值传入即可，函数会返回添加该value后的新对象，记得接收哦！！！
 *
 * 注意：不过很遗憾，该函数添加的对象是不可枚举的Object.keys()和for in无法访问 值得庆幸的是Object.getOwnPropertySymbols(obj)可以访问Symbol数据类型，Reflect.ownKeys可以访问当前属性上说有的key
 *
 * @param {object} obj 待改造的对象
 * @param {any} value 自定义的value值
 * @returns {object} 添加value后的新对象
 */
function neverRepetition(obj, value) {
  let key = Symbol();
  obj[key] = value;
  return obj;
}
```

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

// for (let i in p1) {
//     console.log(i,p1[i])
// }
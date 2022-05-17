(() => {

    // 类型注解
    function add(a: number, b: number): number {
        return a + b
    }

    // add
    console.log('add', add(10, 20))

    // 接口
    interface IPerson {
        name: string
        age: number
    }

    function getPersonInfo(person: User) {
        return person.name + ":" + person.age
    }

    let p1 = {
        name: 'p1',
        age: 10
    }

    console.log('getPersonInfo', getPersonInfo(p1))

    // 类
    class User implements IPerson{
        name: string;
        age: number;
        constructor(name:string,age:number) {
            this.name = name;
            this.age = age;
        }
    }

    let user = new User("xxx",100)
    console.log(getPersonInfo(user))
})()

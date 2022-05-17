(() => {
    // 类型注解
    function add(a, b) {
        return a + b;
    }
    // add
    console.log('add', add(10, 20));
    function getPersonInfo(person) {
        return person.name + ":" + person.age;
    }
    let p1 = {
        name: 'p1',
        age: 10
    };
    console.log('getPersonInfo', getPersonInfo(p1));
    // 类
    class User {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }
    let user = new User("xxx", 100);
    console.log(getPersonInfo(user));
})();

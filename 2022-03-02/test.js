class demo{

    sex = 0

    constructor(age){
        this.age=age;
    }

    get age(){
        console.log('get age')
    }

    set age(val){
        console.log('set age',val)
    }

}
let kevin=new demo(9);
kevin.age=18;
console.log(kevin.age);
console.log(kevin.sex)

var p1 = {}
var student = {};
Object.defineProperties(student,{
    name:{
        writable:false,
        value:"lisi"
    },
    age : {
        writable:true,
        value : 16,
    },
    sex:{
        get(){
            return '男';
        },
        set(v){
            p1.sex = v
        }
    }
})



p1.sex = "男";
console.log(student.name + ":" + student.age);
console.log(p1.sex); // 男
student.sex = "女";
console.log(student.sex); //男
console.log(p1.sex); // 女

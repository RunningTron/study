
class MyClass {
    set val(v) {
        console.log('Setter called', v);
        return v;
    }
}
const obj = new MyClass();

Object.assign(obj, { val: 42 }); // Prints "Setter called 42"


class Person {
  constructor (name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}

let p1 = new Person('p1')
console.log(p1.getName())

export default Person
// module.exports = {
//   Person
// }

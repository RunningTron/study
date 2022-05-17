(()=>{
    enum Color {
        Red,
        Blue,
        Green
    }

    // console.log(Color.Red)
    let myColor: Color = Color.Blue
    console.log(myColor)


    function add(x:string,y: string): string
    function add(x: number, y:number): number
    function add(x: string|number, y:string|number){
        if (typeof x == "string" && typeof y == "string"){
            return x+y
        }else if (typeof x == "number" && typeof y == "number"){
            return x+y
        }
    }

    console.log(add(1,2))
    console.log(add("a","b"))


})()

(() => {
    let Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Blue"] = 1] = "Blue";
        Color[Color["Green"] = 2] = "Green";
    })(Color || (Color = {}));
    // console.log(Color.Red)
    let myColor = Color.Blue;
    console.log(myColor);
    function add(x, y) {
        if (typeof x == "string" && typeof y == "string") {
            return x + y;
        }
        else if (typeof x == "number" && typeof y == "number") {
            return x + y;
        }
    }
    console.log(add(1, 2));
    console.log(add("a", "b"));
})();

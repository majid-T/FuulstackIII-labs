// ----------------- Exersise 1 -------------------
const differenceOldSchool = function(x){
    if(x>13){
        return (x-13) *2;
    }
    return 13-x;
}

const difference = (x) =>(x>13 ?  (x-13) *2  : 13-x);
//Test output
console.log(difference(32));
console.log(difference(11));

// ----------------- Exersise 2 -------------------

function greeterOldShcool(myArray,counter){
    var greetText = 'Hello ';
    for(var index = 0;index<myArray.length;index++){
        console.log(greetText+ myArray[index]);
    }
}

const greeter = function (inListName){
    for(name of inListName){
        console.log(`Hello ${name}`);
    }
}
//Test output
greeter(['Randy Savage','Ric Flair','Hulk Hogan'],3);

// ----------------- Exersise 3 -------------------
const colors = ['red','green','blue'];

const capString = function(color){
    return color.charAt(0).toUpperCase() + color.substring(1);
}

//Test output
console.log(colors.map(col => capString(col)));

// ----------------- Exersise 4 -------------------
const numValues = [1,60,34,30,20,5];

console.log(numValues.filter(num => num<20));

// ----------------- Exersise 5 -------------------
const numArray = [1, 2, 3,4];

let calculateSum = numArray.reduce((accumulator, currentValue) => accumulator + currentValue );

let calculateProduct = numArray.reduce((accumulator, currentValue) => accumulator * currentValue);


console.log(calculateSum);
console.log(calculateProduct);

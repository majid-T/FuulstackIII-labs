const comp = require('./comparer');
const calc = require('./calculator');


const exeFunc= (num1,num2) => {
    console.log(`comparing to numbers: ${num1}, ${num2}`);
    if (comp.AreNumberEqual(num1,num2)){
        console.log('Numbers are equal\nAdding these numbers');
        let result = calc.Add(num1,num2);
        console.log(result);
    }else{
        console.log('Numbers are not equal\nSubtracting these numbers');
        let result = calc.Subtract(num1,num2);
        console.log(result);
    }
}

exeFunc(5,10);
exeFunc(5,5);

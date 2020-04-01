const mixedArray = ['Matrix',1,true,2,false,3];

const multiplyNumbers = (arr) =>{
    let numArray = arr.filter(item => typeof(item)==='number');
    let multArray = numArray.map(item => item * 5);
    return multArray;
}


console.log(multiplyNumbers(mixedArray));

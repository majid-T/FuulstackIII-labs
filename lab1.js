// // ------------------------------------- Exercise 1 ---------------------------
// //Make first letter of words upper case
// function toUp(inString){

//   stringList = inString.split(' ');
//   resultList = [];
//   for(word of stringList){
//     var charReplace = word.charAt(0).toUpperCase();
//     var newWord = charReplace + word.substring(1);
//     resultList.push(newWord);
//   }

//   return resultList.join(' ');
// }

// //Exercise test
// console.log(toUp('my name is majid'));

// // ------------------------------------- Exercise 2 ---------------------------
// //find largest of three integers
// function maxInThree(num1,num2,num3){
//     if(num1>num2){
//         if(num1>=num3){
//             return num1;
//         }else{
//             return num3;
//         }
//     }else{
//         if(num2>=num3){
//             return num2;
//         }else{
//             return num3;
//         }
//     }
// }

// // Exercise test
// console.log(maxInThree (1,0,1));
// console.log(maxInThree (0,-10,-20));
// console.log(maxInThree (1000,510,440));


// // ------------------------------------- Exercise 3 ---------------------------
// function rightShiftThree(inString){
//     if(inString.lentgh<3){
//         return inString;
//     }
//     var threeLastwords = inString.substring(inString.length-3);
//     var baseString =  inString.substring(0,inString.length-3);

//     return threeLastwords + baseString;
// }

// //Exercise test
// console.log(rightShiftThree("Python"));
// console.log(rightShiftThree("JavaScript"));
// console.log(rightShiftThree("Hi"));

// // ------------------------------------- Exercise 4 ---------------------------
// function angle_Type(angleDeg){
// //  Acute angle: An angle between 0 and 90 degrees.
// //  Right angle: An 90 degree angle.
// //  Obtuse angle: An angle between 90 and 180 degrees.
// //  Straight angle: A 180 degree angle.
//     if(angleDeg < 90){
//         return 'Acute angle';
//     }

//     if(angleDeg === 90){
//         return 'Right angle';
//     }

//     if(angleDeg <180){
//         return 'Obtuse angle';
//     }

//     if(angleDeg === 180){
//         return 'Straight angle';
//     }
// }

// //Exersise test
// console.log(angle_Type(47));
// console.log(angle_Type(90));
// console.log(angle_Type(145));
// console.log(angle_Type(180));


// ------------------------------------- Exercise 5 ---------------------------
function array_max_sum(inList,num){
    let resultTotal = 0;
    for(let i = 0;i<inList.length;i++){
        if(i+num <= inList.length){
            console.log(`doing index ${i}`);
            let tempTotal = inList[i];
            for(let j = 0;j<num-1;j++){
                console.log(`adding ${inList[i+j+1]}`);
                tempTotal += inList[i+j+1];
            }

            if(tempTotal>resultTotal){
                resultTotal = tempTotal;
            }
        }
    }

    return resultTotal;
}

//Exersise test
console.log(array_max_sum([1, 2, 3, 14, 5], 2))
console.log(array_max_sum([2, 3, 5, 1, 6], 3))
console.log(array_max_sum([9, 3, 5, 1, 7], 2))

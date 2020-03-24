const moment = require('moment');

const getCurrentDate = () =>{
    let wrapped =moment().format('dddd MMMM Do YYYY : h:mm:ss a');;
    console.log(wrapped);
}


getCurrentDate();

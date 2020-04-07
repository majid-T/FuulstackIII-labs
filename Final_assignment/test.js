const dao = require('./dao');

dao.getAllChats()
    .then((data)=>{
        console.log(`SUCCESS\n: ${data}`);
    })
    .catch((data)=>{
        console.log(`ERROR\n: ${data}`);
    });


const http = require('http');
const url = require('url');
const events = require('events');
const eventEmitter = new events.EventEmitter();


const hostname = '127.0.0.1';
const port = 3000 ;
let amount = 0;

// call back function for event emitter
const jackpot = () =>{
    console.log('jackpot!!!');
    amount = 0;
};

//function to get a querystring out of the whole query
const getAmount = (key,string)=>{
    let stringList= string.split('&');
    for (item of stringList){
        tmpList = item.split('=');
        if(tmpList[0]===key){
            return tmpList[1];
        }else{
            return 0;
        }
    }
}

eventEmitter.on('Jackpot',jackpot);

const server = http.createServer((req, res)=>{
    let {pathname,query} = url.parse(req.url);
    if(query){
        let amountOnCall = getAmount('amount',query);
        if(isNaN(parseInt(amountOnCall))){
            if(amountOnCall==='max'){
                amount=amountOnCall;
            }else{
                console.log('Bad query string');
            }
        }else{
            if(amount !== 'max'){
                amount += parseInt(amountOnCall);
            }else{
                console.log('You already playing with max amount');
            }
        }
    }

    if (pathname === '/play'){
        console.log(`playing... amount : ${amount}`);
    } else if (pathname === '/spin') {
        console.log('spining...');
        if(amount === 'max'){
                eventEmitter.emit('Jackpot');
        }else{
            console.log(`amount lost: ${amount}`);
            amount = 0;        }
    }else{
        console.log('Please play or spin.');
    }

    res.statuscode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hello world!');
});

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});

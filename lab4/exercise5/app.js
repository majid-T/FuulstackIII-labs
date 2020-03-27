const http = require('http');

const hostname = '127.0.0.1';
const port = 3000 ;

const server = http.createServer((req, res)=>{
    let pt = req.url;

    if (pt === '/play'){
        console.log('playing...');
    } else if (pt === '/spin') {
        console.log('spining...');
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

const events = require('events');
const emitter = new events.EventEmitter();
const moment = require('moment');

const currentTimeCallback = ()=>{
    //use moment to make --> ' + 01:09:09 pm
    console.log(`Current Time: ${moment(new Date()).format(' h:mm:ss a')}`);
}

emitter.on('currentTime' ,currentTimeCallback);

emitter.emit('currentTime');
/*
Create an event listener on the named event ‘currentTime’ that will call the currentTimeCallback function when invoked
Emit the named event ‘currentTime’ to trigger the emitter and handler to output the Current Time
*/

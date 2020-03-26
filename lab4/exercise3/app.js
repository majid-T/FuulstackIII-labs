const events = require('events');
const eventEmitter = new events.EventEmitter();

const func1 = () =>{
    console.log('Call me!');
};

const alarmTriggered = () =>{
    console.log('Alarm has been triggered!');
    eventEmitter.emit('call2');
};

const call_911 = () =>{
    console.log('Call 911!');
};

eventEmitter
    .on('call',func1)
    .on('call1',alarmTriggered)
    .on('call2',call_911);

// eventEmitter.emit('call');

eventEmitter.emit('call1');


const say = require('say');


say.speak('Hello Alex');

const sorryDave = () =>{
    say.speak("I'm sorry, Dave");
}

setTimeout(sorryDave, 5000);

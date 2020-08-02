var ks = require('node-key-sender');
const clipboardy = require('clipboardy');
var robot = require("robotjs");
const ioHook = require('iohook');
const notifier = require('node-notifier');


let startFlag=false;
const MATCH_REGEX = /[~!@#\$%\^&*()_+{}|:"<>?]/;

const CTRL = 29;
const ALT = 56;
const F7 = 65;

// ctrl+alt+k
ioHook.on('keydown',event=>{
    // console.log(event);
    if (event.altKey && event.ctrlKey && event.shiftKey && event.keycode == 37 && event.rawcode== 75 ){
      
        startFlag=!startFlag;
        if (startFlag) {
            console.log('started typing');
        setTimeout(() => {
            notifier.notify({
                title: 'Typer',
                message: 'Typing started'
              })
            start()
        }, 500);
        }else{
            console.log('stopped typing');
            notifier.notify({
                title: 'Typer',
                message: 'Typing ended'
              })
        }
        
    }
    
}) 

  ioHook.start();


async function start() {
    let data=[...clipboardy.readSync()];
    
    // console.log(data);
    // ks.sendText(data);
    for (let index = 0; index < data.length; index++) {
        if (!startFlag) {
            return;
        }
        const element = data[index];
        // await wait(30);
        // ks.sendLetter(element);
        let match = element.match(MATCH_REGEX);

        if (match) {
            if (element=='"') {
                // console.time('test');
                await robot.keyTap("'", ['shift']);
                // console.timeEnd('test');
            }else{

                await robot.keyTap(element, ['shift']);
            }
           
        }else{

            await robot.typeString(element);
        }
    
        
    }
    startFlag=false;
    notifier.notify({
        title: 'Typer',
        message: 'Typing ended'
      })
    
}

function wait(time){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve()
        }, time);
    })
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
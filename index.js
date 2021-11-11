//settings
const breakDecrement = document.getElementById("break-decrement");
const breakLength = document.getElementById("break-length");
const breakIncrement = document.getElementById("break-increment");
const sessionDecrement = document.getElementById("session-decrement");
const sessionLength = document.getElementById("session-length");
const sessionIncrement = document.getElementById("session-increment");
// timer
const time = document.getElementById("time");
const timeLabel = document.getElementById("timer-label");
//controllers 
const startStop = document.getElementById("start-stop");
const buttonReset = document.getElementById("button-reset");

const musica = new Audio('audio/alarm.mp3');

let breakTime=5;
let sessionTime=25;
let count = sessionTime * 60;
let countBreak= breakTime * 60;


//*-Settings decrement and increment (break-length and session-length)-*//
breakDecrement.onclick = ()=>{
    if(breakTime>3){
        breakTime--;
    }
    else{
        breakTime = 3;
    }
    countBreak = breakTime *60;
    console.log('breakTime', breakTime);
    breakLength.innerHTML = breakTime;
   
    
};

breakIncrement.onclick = ()=>{

    if(breakTime<20){
        breakTime++;
    }
    else{
        breakTime = 20;
    }
    countBreak = breakTime *60;
    console.log('breakTime', breakTime);
    breakLength.innerHTML = breakTime;
    
};

sessionDecrement.onclick = ()=>{
    //minimum working time
    if(sessionTime>10){
        sessionTime--;
    }
    else{
        sessionTime = 10;
    }
    count  = sessionTime * 60;         
    console.log('sessionTime', sessionTime);
    sessionLength.innerHTML = sessionTime;
    time.innerHTML = sessionTime + ":00";
}
sessionIncrement.onclick = ()=>{
    //maximum working time
    if(sessionTime<60){
        sessionTime++;
    }
    else{
        sessionTime = 60;
    }
        
    count  = sessionTime * 60; 
    console.log('sessionTime', sessionTime);
    sessionLength.innerHTML = sessionTime;
    time.innerHTML = sessionTime + ":00";
}


//*-----Timer functionalities---------------*//


let intervalBreak;
let interval = -1;
  
startStop.onclick = countDown;   

function breakWork(){
    
    clearInterval(interval);
    timeLabel.innerHTML = "Break"; 

    intervalBreak =setInterval(function(){    

        const minutesBreak = Math.floor(countBreak/60);
        let secondsBreak = countBreak % 60;
        secondsBreak = secondsBreak <10 ? '0'+secondsBreak: secondsBreak;
        console.log('minutes & seconds', minutesBreak, ':', secondsBreak);
        time.innerHTML = `${minutesBreak}:${secondsBreak}`;
        //Whe the time is up, it will call de countDown function
        if(minutesBreak==0 && secondsBreak ==1){

            count  = sessionTime * 60;  
            time.innerHTML = sessionTime + ":00"
            musica.play();     
            let callSession = countDown();
            return callSession;
        }
        countBreak--;
        console.log('intervalBreak',intervalBreak);
    },1000); 
}

function countDown(){  
    
    clearInterval(intervalBreak);
    timeLabel.innerHTML = "Session"; 
    if(interval ==-1){     
           
        interval =setInterval(function(){
                 
                const minutes = Math.floor(count/60);
                let seconds= count % 60;
                seconds = seconds <10 ? '0'+seconds: seconds;
                startStop.innerHTML = "Pause";
                time.innerHTML = `${minutes}:${seconds}`;
                //when the countDown finishes, it will call the rest function
                if(minutes==0 && seconds ==1){
                    musica.play();
                    let callBreak = breakWork();
                    return callBreak;
                }
            
                count--;
                console.log('interval',interval);
                
            },1000);             
    }   
    else{
        startStop.innerHTML = "Start";
        clearInterval(interval);
        interval = -1;
    } 
      
};
   
buttonReset.onclick = ()=>{
    count  = sessionTime * 60;
    console.log('count',count);
    time.innerHTML = sessionTime + ":00"
    countDown;
}


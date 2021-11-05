//settings
const breakDecrement = document.getElementById("break-decrement");
const breakLength = document.getElementById("break-length");
const breakIncrement = document.getElementById("break-increment");
const sessionDecrement = document.getElementById("session-decrement");
const sessionLength = document.getElementById("session-length");
const sessionIncrement = document.getElementById("session-increment");
// timer
const time = document.getElementById("time");
//controllers 
const startStop = document.getElementById("start-stop");
const buttonReset = document.getElementById("button-reset");

let breakTime =5;
let sessionTime = 25;
let count;
//Settings decrement and increment (break-length and session-length)
breakDecrement.onclick = ()=>{
    breakTime--;
    console.log('breakTime', breakTime);
    breakLength.innerHTML = breakTime;
};
breakIncrement.onclick = ()=>{
    breakTime++;
    console.log('breakTime', breakTime);
    breakLength.innerHTML = breakTime;
};
sessionDecrement.onclick = ()=>{
    sessionTime--;
    count  = sessionTime * 60; 
    console.log('sessionTime', sessionTime);
    sessionLength.innerHTML = sessionTime;
    time.innerHTML = sessionTime + ":00";
    
}
sessionIncrement.onclick = ()=>{
    sessionTime++;
    count  = sessionTime * 60; 
    console.log('sessionTime', sessionTime);
    sessionLength.innerHTML = sessionTime;
    time.innerHTML = sessionTime + ":00";
}


let interval = -1;

function loadClick(){
    startStop.onclick = countDown;   
}

function countDown(){     
    if(interval ==-1){
        
        interval =setInterval(function(){
                
                const minutes = Math.floor(count/60);
                let seconds = count % 60;
                seconds = seconds <10 ? '0'+seconds: seconds;
                startStop.innerHTML = "Stop";
                time.innerHTML = `${minutes}:${seconds}`;
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
loadClick();

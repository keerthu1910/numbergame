const msgel=document.getElementById("msg");

const randomnum=getRandomNumber();

function getRandomNumber(){
    return Math.floor(Math.random() * 100)+1;
}

var SpeechRecognition=SpeechRecognition||webkitSpeechRecognition;

let recognition=new SpeechRecognition();

recognition.start();

recognition.onstart=function(){
    console.log("we are listening try speaking into the mike");
};

recognition.onresult=function(e){
    var transcript=e.results[0][0].transcript;
    
    writemsg(transcript);
    checknumber(transcript);
};

function writemsg(msg){
    msgel.innerHTML=`
    <div> You Said: </div>
    <span class="box">${msg}</span>
    `;
}

function checknumber(msg){
    const num=+msg;

    // check if valid number
    if(Number.isNaN(num)){
        msgel.innerHTML=`<div>IT IS NOT A NUMBER</div>`
    }

    //check for range
    if(num>100||num<1){
        msgel.innerHTML+=`<div>number must be between 1 and 100</div>`;
    }

    //check for higher or lower
    if(num==randomnum){
        document.body.innerHTML=`
        <h2>Congrats! you have guessed the number!<br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>`;
    }
    else if(num>randomnum){
        msgel.innerHTML+=`<div>GO LOWER</div>`;
    }
    else{
        msgel.innerHTML+=`<div>GO HIGHER</div>`;
    }
}
recognition.addEventListener('result',recognition.onresult);
recognition.addEventListener('end',()=>recognition.start());


console.log(randomnum);

document.body.addEventListener('click',e=>{
    if(e.target.id == 'play-again'){
        window.location.reload();
    }
})
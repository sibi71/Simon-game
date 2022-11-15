const buttoncolor=["red","green","blur","yellow"];

let gamepattern =[];

let userClickedPattern=[];

let started = false;

let level = 0; 




document.addEventListener("keypress",() => {
    if(!started ){
        document.getElementById("level-title").innerText=`level ${level}`;
        started = true ;
        playsound("started");
        nextSequence();

      
    }
});
document.querySelectorAll(".btn").forEach((item)=>{
    item.addEventListener("click",(event) =>{
        let userChosenColor =event.target.id;
        userClickedPattern.push(userChosenColor);
        animatepres(userChosenColor);
        playsound(userChosenColor);

        chackAnswer(userClickedPattern.length-1);
    });
});
function chackAnswer(currentlevel){
    if(gamepattern[currentlevel]===userClickedPattern[currentlevel])
    {
        if(userClickedPattern.length===gamepattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000)
          
        }
    
    }else{
        playsound("wrong");
        document.querySelector("body").classList.add("game-over");
        
        let leveltitle= document.getElementById("level-title");
        leveltitle.innerText="Game Over,Press Any Key to restart"; 
        leveltitle.style.color="black";
        setTimeout(()=>{
            document.querySelector("body").classList.remove("game-over");
        },10000);

        starOver();
    }
}

function fadein (time , id){
    let fade=document.getElementById(id);
    setTimeout(()=>{
        fade.style.opacity= 0.1;

    },time);  

}
function fadeout (time , id){
    let fade=document.getElementById(id);

    setTimeout( ()=>{
        fade.style.opacity= 1;

    },time);
    
}
function nextSequence(){
    userClickedPattern=[];
    level++;
    document.getElementById("level-title").innerText=`level ${level}`;
    let randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    let randomChosenColor =buttoncolor[randomNumber];

    gamepattern.push(randomChosenColor);

    fadein(100,randomChosenColor);

    fadeout (200,randomChosenColor);

    playsound(randomChosenColor);
    

    
    
}

function playsound (name){
     let audio = new Audio ("sounds/"+ name + ".mp3");
     
     audio.play();
}
 
function animatepres(currentcolor){
    document.getElementById(currentcolor).classList.add("pressed");
    setTimeout(()=>{
        document.getElementById(currentcolor).classList.remove("pressed");
    },200);
}
function starOver(){
    level=0;
    gamepattern=[];
    started=false;
}

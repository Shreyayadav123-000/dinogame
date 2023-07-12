score=0;
prev=score;
cross=true;
check=true;
ch=true;
bk= true;
audio =  new Audio('music.mp3');
audiogo= new Audio('gameover.mp3');

// audio.play();

document.onkeydown = function(e){
    if(ch){
        audio.play();
        
    }

    console.log("key code: ",e.keyCode);
    if(e.keyCode==38){
        dino= document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=> {
            dino.classList.remove('animateDino');
        },700);
    }
    if(e.keyCode==39){
        dino= document.querySelector('.dino');
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinoX+112+"px";
    }
    if(e.keyCode==37){
        dino= document.querySelector('.dino');
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinoX-112+"px";
    }
}

setInterval(()=>{
    dino=document.querySelector('.dino');
    gameOver=document.querySelector('.gameOver');
    obstacle=document.querySelector('.obstacle');

    dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetX=Math.abs(dx-ox);
    offsetY=Math.abs(dy-oy);

    if(offsetX< 180 && offsetY<52){
        gameOver.style.visibility='visible';
        obstacle.classList.remove('obstacleAni');
        if(check){
            ch=false;
            audio.pause();
            audiogo.play();
            setTimeout(()=>{
                audiogo.pause();
                
            },1000);
            check=false;
        }        
    }
    else if(offsetX<125 && cross){
        
        score+=1;
        
        updateScore(score);
        
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000);

        setTimeout(()=>{
            aniDur=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            if(aniDur>3.5){
                newDur=aniDur-0.1;
        obstacle.style.animationDuration= newDur +'s';
        console.log(newDur);
            }
        
        },500);

        
    }


},100);

function updateScore(score){
    scoreCont.innerHTML ="your score: "+ score;
}
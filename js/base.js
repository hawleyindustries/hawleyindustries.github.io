//ball bouncing sim
//Goals: Make it look nice, and make it work, THEN add more features. 
//to add: collision detection, ball grabbing
//Problems: Balls accelerate when elasticity is 1.
//Ball launch conflicts with animation of balls. 


var simulation, simcontext;
var balls;
var elasticity = 1; // between 0 and 1
var mousex, mousey, clicked=0;
var launchmousex, launchmousey;
var dt;// simulation chunk
var gravity=0; //acceleration towards of -x from 0 to some interesting number.
var ballsize=10;
var ballinlimbo;
var wemovin=0;

function drawBall(ball){
    simcontext.fillStyle=ball.hexcol;
    simcontext.beginPath();
    simcontext.arc(ball.x,ball.y,ball.size,0,2*Math.PI);
    simcontext.fill();
    simcontext.closePath();
}

function moveBall(){
    //Clear Canvas draw ball, calculate new x,y, detect collision, change velocities.
    clearFrame();

    //check if balllist is empty. 
    loopsize=balls.length;
    if (loopsize==0){
        wemovin=0;
        clearTimeout(dt);
        return
    };
    var skip=balls[balls.length-1].held;
    //loop over all balls
    for (i=0;i<loopsize-skip;i++){
    
    drawBall(balls[i]);
    cbx=balls[i].x;
    cby=balls[i].y;
    cbvx=balls[i].vx;
    cbvy=balls[i].vy;
    cbsize=balls[i].size;

    //could be funt to draw a sphere, colored to and sized right up to the edge of the nearest neighbor.
    balls[i].x=cbx+cbvx;
    balls[i].y=cby+cbvy;
    
    
    //need to add exception if the ball is moving away from side. 
    if((cbx < cbsize && cbvx < 0) || (cbx > simulation.width-cbsize && cbvx > 0)){
        balls[i].vx=cbvx*-elasticity;
    }

    //Ball sinks into ground with no v due to gravity.
    //Solution? Fancy smancy collision detection. Or something is just wrong. OH.
    //Problem: In close proximity to "surface", ball sinks due to elasticity reducing positive velocity.  
    if((cby < cbsize && cbvy <0) || (cby > simulation.height-cbsize && cbvy >0)){
        balls[i].vy=cbvy*-elasticity;
    }
    else if (cby > simulation.height- cbsize && cbvy < gravity){

    } 
    else{
    balls[i].vy=cbvy+gravity;}
    }

    if(skip){
        drawBall(balls[length-1])
    }

    dt=window.setTimeout(moveBall,1000/30);

}


//this will replace moveball and other places we draw poorly
function frameDraw(){
    //Broadphase, Use quadtree to check distances for each ball. 
    // question: timeskip exactly to collision point or is there a better way>
    // In narrow phase calulate the next positions also.
    // 
    //
    //

    window.setTimeout(frameDraw,dt);
}

function ballFondler(ball, ballindex, ballarr){
    if (ball.calcWait ==0){
                // Find collisions and change velocity, or update calcwait
    }

    else{
        ball.x=ball.x-ball.vx;
        ball.y=ball.y-ball.vy;
    }

}
function clearFrame(){
    simcontext.clearRect(0,0,simulation.width,simulation.height);
}

function resize(){
    //resizing should push particles along... might be a simple way to do that might not. 
    simulation.width=window.innerWidth;
    simulation.height=window.innerHeight;

    //manage toolbar settings also so sliders all work
}


function mouseRelease(e){
    clicked=0;
    //check for ballinlimbo and append to balls
    if (ballinlimbo !== undefined){
        balls.push(ballinlimbo);
        balls[balls.length-1].held=0;
    }

    if (!wemovin){
        wemovin=1;
        moveBall();
    }
}

function mouseClick(){
    //Should be autimatically added to BALLS, But position should stay lined to mouse. 
    ballinlimbo = {x:mousex,y:mousey,vx:0,vy:0,hexcol:"red", size:ballsize,held:1};
    launchmousex=mousex;
    launchmousey=mousey;
    clicked=1;
}

function mouseMove(e){
    
    mousex=e.offsetX;
    mousey=e.offsetY;
   
    if(clicked){
    if(!wemovin){
    clearFrame();}
    ballinlimbo.x=mousex;
    ballinlimbo.y=mousey;
    drawBall(ballinlimbo);
    ballinlimbo.vx=launchmousex-mousex;
    ballinlimbo.vy=launchmousey-mousey;
    simcontext.setLineDash([5, 3]);
    simcontext.beginPath();
    simcontext.moveTo(launchmousex, launchmousey);
    simcontext.lineTo(mousex, mousey);
    simcontext.stroke();
    simcontext.closePath();
    }
}



//Add number of balls slider! FUN.  
//Add dark mode

function init(){
    //get canvas, set context, event listeners, set size
    simulation=document.getElementById("simulation")
    resize();
    simcontext =simulation.getContext('2d');


    //https://stackoverflow.com/questions/13651274/how-can-i-attach-a-window-resize-event-listener-in-javascript
    window.addEventListener("resize",resize,false);
    simulation.addEventListener("mouseup",mouseRelease,false);
    simulation.addEventListener("mousedown", mouseClick, false);
    simulation.addEventListener("mousemove",mouseMove,false);

    gravityslide=document.getElementById("gravity");
    gravityslide.addEventListener("mouseup", readGrav, false);
    gravityslide=document.getElementById("elasticity");
    gravityslide.addEventListener("mouseup", readElast, false);
    gravityslide=document.getElementById("ballsize");
    gravityslide.addEventListener("mouseup", readBallSize, false);

    balls= new Array();
}

function readGrav(e){
    gravity=document.getElementById("gravity").value/10;
}

function readElast(e){
    elasticity=document.getElementById("elasticity").value;
}

function readBallSize(e){
    ballsize=document.getElementById("ballsize").value;
}
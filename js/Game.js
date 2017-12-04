/*declare canvas*/
var canvas = document.getElementById('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var ctx=canvas.getContext('2d');
/*****/

/*putting surface*/
function rectangle(){
  //ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
  ctx.beginPath();
  ctx.fillStyle='#eee'
  ctx.rect(0,400,canvas.width,500);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
/*randomize range*/
function randomIntFromRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*get distance between objects*/
function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
/*global variables*/
var gravity=0.9;
//const color=['#2185C5','#7ECEFD','#FFF6E5'];

//for resizing;
document.addEventListener('resize',function(){
  canvas.width=window.innerWidth;
  canvas.height=400;
  init();
});

/*Ball class*/
function Ball() {
/*properties*/
  this.x= 0;
  this.y= 400-30;
  this.dx=3;
  this.dy=15;
  this.jumping=false;
  this.radius=30;
  this.color='#fa1919';

/*draw ball*/
  this.draw= function() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    ctx.fillStyle=this.color;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    }

/*update position*/
  this.update=function() {
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0 ){this.x=0+this.radius;}
    if(this.y+this.radius < 400) {
       this.dy += gravity;
       this.y+=this.dy;
   }
   else {
     this.y= 400-this.radius;
   }
    this.x+=this.dx;
    this.draw();
  }

  /*jumping*/
  this.jump=function() {
    this.dy = -this.dy;
    this.y += this.dy;
  }
}

/*obstacles*/
function obstacles(x) {
  this.x=x;
  this.y=360;
  this.color='#FFF6E5';
  this.update=function() {

    this.draw();
  }
  this.draw=function() {
    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.rect(this.x,this.y,20,40);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}

/*init function*/
var ball;
var wait=[];
function init() {
  ball=new Ball();
for(var i=0;i<3;i++){
    x=randomIntFromRange(200,canvas.width-50);
  wait.push(new obstacles(x));
  }
}
var reset=function() {
  ball.x=0;
}

/*animation*/
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ball.update();
  for(var i=0;i<wait.length;i++) {
    wait[i].update();
    if(distance(ball.x,ball.y,wait[i].x,wait[i].y)<ball.radius)
    {
      alert("game over");
      reset();
    }
  }
    rectangle();
}
init();
animate();

/*jumping event*/
document.addEventListener('keyup',function(event){
  if(event.keyCode==32){
    ball.jump();
  }
});

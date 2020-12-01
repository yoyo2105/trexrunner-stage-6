var trex,trex_image,edges,ground,invisground,obstacle,grpobstacle,
gamestate="play",grpcloud,cloud,score=0,trex_collided,jumpsound,diesound,checkpointsound,restart,restartImage;

function preload(){
 trex_image=loadAnimation("trex1.png","trex3.png","trex4.png")
 trex_collided=loadImage("trex_collided.png")
 
  
 ground_image=loadImage("ground2.png")
  
cloud_image=loadImage("cloud.png")

obstacle_image1=loadImage("obstacle1.png")
obstacle_image2=loadImage("obstacle2.png")
obstacle_image3=loadImage("obstacle3.png")
obstacle_image4=loadImage("obstacle4.png")
obstacle_image5=loadImage("obstacle5.png")
obstacle_image6=loadImage("obstacle6.png")
  
restartImage=loadImage("restart.png")  

jumpsound=loadSound("jump.mp3")
diesound=loadSound("die.mp3")
checkpointsound=loadSound("checkPoint.mp3")

}


function setup(){
  createCanvas(800,400)
  trex=createSprite(60,395,20,30);
  
  grpobstacle=new Group()
  grpcloud=new Group()
  
  invisground=createSprite(400,399,800,10);

  ground=createSprite(200,395,800,10);

  invisground.visible=false
  
  trex.addAnimation("yuvraj",trex_image)
  trex.addAnimation("collided",trex_collided)
  trex.scale=0.65
  //trex.debug=true
  trex.setCollider("circle",0,0,40,);
  
  
 ground.addImage("yuvraj2",ground_image)
 restart=createSprite(300,200)
 restart.addImage("R",restartImage) 
 restart.scale=0.7
}

 function draw(){

  background("white");
  
   text("score:"+score,400,160);
  
  
   
 // console.log(trex.y)
  if(gamestate=="play"){
    restart.visible=false
   score=score+Math.round(getFrameRate()/60);
    
  ground.velocityX=-(5+3*score/75)
  
  if(ground.x<0){
    ground.x=400;
  }
  
  if(keyDown("space") && trex.y>363){
     trex.velocityY=-10
    jumpsound.play();
  }
   if(trex.isTouching(grpobstacle)){
     gamestate="end"
     diesound.play();
     
   }
    
  

   trex.velocityY=trex.velocityY+0.4
  
   cloudcreation(); 
   createobstacle();
}//end of playstate
//console.log(frameCount)
  
    else if(gamestate=="end"){
restart.visible=true    
ground.velocityX=0
trex.velocityY=0
trex.changeAnimation("collided",trex_collided)
grpobstacle.setLifetimeEach(-1)
grpcloud.setLifetimeEach(-1)
grpobstacle.setVelocityXEach(0)
grpcloud.setVelocityXEach(0)
trex.velocityY=0
if(mousePressedOver(restart)){
  reset();
  
}
}

edges=createEdgeSprites()
trex.collide(invisground)
drawSprites();
}
function reset(){
  gamestate="play"
  grpobstacle.destroyEach()
  grpcloud.destroyEach()
  trex.changeAnimation("yuvraj",trex_image)
  score=0;
                       

}
function cloudcreation(){
  
 if(frameCount%100==0){
  

    
 
  
var  cloud=createSprite(801,50,20,20);
cloud.addImage("yuvraj3",cloud_image)


var rand=random(0,100)
var randinteger=Math.round(rand)
//console.log(randinteger)
cloud.y=randinteger

  
cloud.velocityX=-3
trex.depth=cloud.depth+1
  //console.log("cloud"+cloud.depth)
  //console.log("trex"+trex.depth)
   
  cloud.lifetime=270
    grpcloud.add(cloud)

 }//end of if loop

  

}

function createobstacle(){

  
 if(frameCount%180==0){
   obstacle=createSprite(840,370,20,40);
  obstacle.velocityX=-(5+score/75)

   var rand1=Math.round(random(1,6))
  console.log(rand1)
   switch(rand1){
     case 1:obstacle.addImage(obstacle_image1)
       break;
     case 2:obstacle.addImage(obstacle_image2)
       break;
      case 3:obstacle.addImage(obstacle_image3)
       break;
      case 4:obstacle.addImage(obstacle_image4)
       break;
      case 5:obstacle.addImage(obstacle_image5)
       break;
      case 6:obstacle.addImage(obstacle_image6)
       break;
       default:break
     
  
}//end of switch
  obstacle.scale=0.80
  grpobstacle.add(obstacle)

}//end of if loop  
}//end of fuc. createobstacle
  




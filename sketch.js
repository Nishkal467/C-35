var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Hot Air Ballon-01.png");
   balloonImage1=loadAnimation("Hot Air Ballon-01.png");
   balloonImage2=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
  }

function setup(){
  database = firebase.database();
  console.log(database);
   createCanvas(500,500);

 balloon = createSprite (100,400, 20, 20)
 balloon.addAnimation("balloon", balloonImage2);
 balloon.scale = 0.4;

 var balloonHeight=database.ref('balloon/height');
 balloonHeight.on("value",readHeight, showError);

}

function draw(){

   background(bg);
 
       if(keyDown(LEFT_ARROW)){
           balloon.x = balloon.x - 10;
       }
       else if(keyDown(RIGHT_ARROW)){
           balloon.x = balloon.x + 10;
       }
       else if(keyDown(UP_ARROW)){
           balloon.y = balloon.y - 10;
           balloon.scale = balloon.scale - 0.005;
       }
       else if(keyDown(DOWN_ARROW)){
            balloon.y = balloon.y + 10;
            balloon.scale = balloon.scale + 0.005;
       }
       drawSprites();
   }
   function updateHeight(x,y){
    database.ref('balloon/height').set({
      'x': height.x + x ,
      'y': height.y + y
    })
  }
  
  function readHeight(data){
    height = data.val();
    console.log(height.x);
    balloon.x = height.x;
    balloon.y = height.y;
  }
  
  function showError(){
    console.log("Error in writing to the database");
  }
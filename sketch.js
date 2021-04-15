var addFood,feed;
var fedTime, lastFed;
var Play, Bath, Sleep;
let food = [];
var h;
var milk,ml;
var foods, foodStock;
var dog,happyDog;
var database;
var back;
var Dog;
var cTime;
var bac = 0;
function preload(){
  //Load images here
  happyDog = loadImage("images/dogImg.png");
  sadDog = loadImage("images/dogImg1.png");
  ml = loadImage("images/Milk.png");
  bed = loadImage("images/BedRoom.png");
  hall = loadImage("images/Hall.png");
  garden = loadImage("images/Garden.png");
  baths = loadImage("images/WashRoom.png");
  
}
function setup(){
    database = firebase.database();

    createCanvas(1100,700);

 //   lastFed = 1;
     var foodStock = database.ref('FoodS/food');
    foodStock.on("value",function(data){
      foods = data.val();
    }) 
    
    var pup = database.ref('dog');
    pup.on("value",function(data){
      Dog = data.val();
    }) 
 // foodObj = new Food(400,250)
//console.log(reedStock);
    feed = createButton("Feed the dog");
    feed.position(850,75);
    feed.mousePressed(feedDog);

    addFood = createButton("Add food for the dog");
    addFood.position(950,75);
    addFood.mousePressed(addFoods);

    Bath = createButton("Clean the dog");
    Bath.position(850,100);
    Bath.mousePressed(bath);

    Play = createButton("Play with the dog");
    Play.position(950,100);
    Play.mousePressed(play);

    Sleep = createButton("Let the dog rest");
    Sleep.position(1070,100);
    Sleep.mousePressed(sleep);

    dog = createSprite(500,250,10,10);
    dog.addImage(sadDog);
    dog.scale=0.1;
    dog.visible=true; 

    milk = createSprite(400,250);
    milk.addImage(ml);
    milk.scale=0.1
    milk.visible=false;

    //back = createSprite(250,250)
    //back.addImage(bed);
    //back.scale=1
   // back.hide()

   cTime = hour();

}

function draw(){
    if(bac==1){
      background(baths)
    }
    if(bac==2){
      background(garden)
    }
    if(bac==3){
      background(bed)
    }
    if(dog!=='full'){
      background("green");

    }
    textSize(13)
    fill(255,255,255)
   // text('hi',100,200)
    //text(Dog,250,250)
     fedTime = database.ref('FeedTime')
    fedTime.on("value",function(data){
      lastFed = data.val();
    }) 
      fill(0,0,0)
    textSize(25)
text ("foods:"+foods,300,40);
for ( var h = 0; h <food.length; h++)
{
food[h].display();
}
    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last Feed : " + lastFed%12 + "PM",50,30)
    }
    else if(lastFed==0){
      text("Last Feed : 12 AM",50,30)
    }
    else{
      text("Last Feed :"+ lastFed +"AM",50,30)
    }

      drawSprites();
}

function feedDog (){
  if(foods>0 ){
 //   dog.addImage(happyDog)
  foods= foods-1;
  milk.visible=true;
    dog="full"

  database.ref('/').update({
      FeedTime:hour()
  })
  milk.visible=true;
  }
}
function addFoods(){
  if (foods<12){
    dog='hungry'
 // dog.addImage(sadDog)
  foods++;
  milk.visible=false;
}

     food.push(new Food)
  database.ref('/').update({
    FoodS: foods
})
}
function bath(){
bac = 1;
}
function play(){
bac=2;
}
function sleep(){
  bac=3;
}
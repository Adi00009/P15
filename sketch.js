// declare all variables

// declare sprites
var path, boy, cash, diamond, jewelry, sword;

// declare sprite images
var pathImg, boyImg, cashImg, diamondImg, jewelryImg, swordImg;

// declare sprite groups
var cashG, diamondG, jewelryG, swordG;

// declare an edges variable to collide boy with and prevent him escaping canvas
var edges;

// declare and initialise a score variable
var treasureCollection = 0;

// declare and set constants for play and end states
const PLAY = 1;
const END = 0;

// declare and initialise current game state to 1 or PLAY
var gameState = 1;

// a preload function to keep images, animations etc. ready
function preload() {
  // load all images
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

// a setup function set up the canvas and sprites
function setup() {
  // create a 400 * 600 canvas
  createCanvas(400, 600);

  // create a path sprite, add image and scroll vertically downwards
  path = createSprite(200, 300);
  path.addImage(pathImg);
  path.velocityY = 4;

  // create a boy, add animation and shrink it
  boy = createSprite(75, 575, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;

  // declare three treasure groups and an obstacle group
  cashG = new Group();
  diamondG = new Group();
  jewelryG = new Group();
  swordG = new Group();
}

function draw() {
  // check if game state is play or 1
  if (gameState === PLAY){
    // move boy horizontally with mouse pointer
    boy.x = World.mouseX;
    
    // create edge sprites
    edges = createEdgeSprites();

    // make boy collide with edges to prevent him escaping canvas
    boy.collide(edges);
    
    // reset the background from centre if escapes canvas
    if (path.y > 400) { path.y = height/2; }

    // my more generalised function to spawn objects
    spawn (cash, cashImg, 0.12, cashG, 200);
    spawn (diamond, diamondImg, 0.03, diamondG, 320);
    spawn (jewelry, jewelryImg, 0.13, jewelryG, 410);
    spawn (sword, swordImg, 0.1, swordG, 530);

    /* Whjr version to spawn individual objects

    createCash();
    creatediamond();
    createjewelry();
    createSword();

    */

    // destroy all cash and increment score by 50 if cash group touches boy
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection += 50;
    }

    // destroy all diamond and increment score by 100 if diamond group touches boy
    else if (diamondG.isTouching(boy)) {
      diamondG.destroyEach();
      treasureCollection += 100;
    } 
    
    // destroy all jewelry and increment score by 150 if jewelry group touches boy
    else if (jewelryG.isTouching(boy)) {
      jewelryG.destroyEach();
      treasureCollection += 150;
    }
    
    // check if sword group is touching boy
    else if (swordG.isTouching(boy)) {
      // set game state to END or 0
      gameState = END;

      // stop path
      path.velocityY = 0;

      // change boy to end image, set coordinates and shrink it
      boy.x = 200;
      boy.y = 300;
      boy.scale = 0.6;
      boy.addImage("SahilRunning", endImg);

      // destroy all four object groups
      cashG.destroyEach();
      diamondG.destroyEach();
      jewelryG.destroyEach();
      swordG.destroyEach();
      
      // stop all four object groups
      cashG.setVelocityYEach(0);
      diamondG.setVelocityYEach(0);
      jewelryG.setVelocityYEach(0);
      swordG.setVelocityYEach(0);
    }
  }
  
  // draw the sprites
  drawSprites();

  // show score with appropriate size and color
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection, 10, 30);
}

// my more generalised function to spawn objects
/* parameters are sprite to be spawn, image to be added, size to be given, group to be added
to and interval at which to spawn the object */
function spawn (sprite, img, scale, group, interval) {
  // spawn obstacles at regular intervals
  // check if remainder (modulus or %) of framecount/interval is 0
  if (World.frameCount % interval == 0) {
    // create a sprite at rounded, random x position
    sprite = createSprite(Math.round(random(50, 350), 40, 10, 10));

    // add image specified in argument
    sprite.addImage(img);

    // scale it according to corresponding argument
    sprite.scale = scale;

    // scroll vertically downwards
    sprite.velocityY = 3;

    /*
    destroy arrow after 150 frame counts

    speed = distance/time
    hence, time = distance/speed
                = canvas width (px) / velocity (px per frame)
                = 400 px / 3 px/frame
                = 400/3 or 133.33 frames

    thus, an obstacle would take 400/3 or 133.33 frame counts to reach the left edge and must 
    be destroyed then
    */
    sprite.lifetime = 150;

    // add specified sprite to group defined in argument
    group.add(sprite);
  }
}

/* Whjr version to spawn individual objects

function createCash() {
  if (World.frameCount % 200 == 0) {
    cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function creatediamond() {
  if (World.frameCount % 320 == 0) {
    diamond = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamond.addImage(diamondImg);
    diamond.scale = 0.03;
    diamond.velocityY = 3;
    diamond.lifetime = 150;
    diamondG.add(diamond);
  }
}

function createjewelry() {
  if (World.frameCount % 410 == 0) {
    jewelry = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jewelry.addImage(jewelryImg);
    jewelry.scale = 0.13;
    jewelry.velocityY = 3;
    jewelry.lifetime = 150;
    jewelryG.add(jewelry);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
    sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordG.add(sword);
  }
}

*/

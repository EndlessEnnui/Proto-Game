let player;
let zombies = [];

let zombieSpawnTime = 300;
let zombieMaxSpeed = 2;
let frame = 0
let score = 0;
let gameState = 'title';
function setup() {
  createCanvas(700, 700);
  player = new Player();
  jpImage = loadImage("assets/pot.png")
  jp1Image = loadImage("assets/pot1.png")
  jp2Image = loadImage("assets/pot2.png")

  jp = createSprite(0, 0 , 20, 20)

  var myAnimation = jp.addAnimation('floating', 'assets/pot3.png', 'assets/pot0.png')

  jp.addAnimation('moving', 'assets/pot1.png', 'assets/pot2.png')
}

function draw() {

  switch (gameState) {
    /* Each 'screen' that you want should be defined with a word,
    this word will correspond to a 'case' as seen below. The case
    will be followed by all of functions you want within that screen
    and end with a 'break;'. */
    case 'title':
      titleScreen();
      break;
    case 'restart':
      restart();
      break;
    case 'gameover':
      gameOver();
      break;
}



function restart() {
  //player = new Player();
  //zombies = [];
  //zombieSpawnTime = 300;
  //zombieMaxSpeed = 2;
  //score = 0; // don't forget to reset the score :D
  background(100, 100, 100);
  rectMode(CENTER);
  player.draw();
  player.update();


  for (let i = zombies.length - 1; i >= 0; i--) {
    zombies[i].draw();
    zombies[i].update();

    if (zombies[i].ateYou()) {
      gameOver();
      break;
    }

    if (player.hasShot(zombies[i])) {
      score++; // add this
      zombies.splice(i, 1);
    }
  }

  if (frame >= zombieSpawnTime) {
    zombies.push(new Zombie(random(zombieMaxSpeed)));
    zombieSpawnTime *= 0.95;
    frame = 0;
  }
  if (frameCount % 1000 == 0) {
    zombieMaxSpeed += 0.1;
  }

  frame++;
  // add these
  textAlign(CENTER);
  textSize(40);
  text(score, width/2, 100);


}
}

function mouseClicked() {
  player.shoot();
}
function gameOver() {
  background(240, 0 ,0);
  stroke(255);
  fill(255);
  textSize(75);
  textAlign(CENTER);
  text('GAME OVER', width*0.5, height*0.33);
  textSize(25);
  text('Press "R" To Restart Game', width*0.5, height*0.66);



}
function titleScreen() {
  background(255, 215, 0);
stroke(255);
fill(255);
textSize(75);
textAlign(CENTER);
text('Hot Takes', width*0.5, height*0.33);
textSize(25);
text('Press "R" To Start Game', width*0.5, height*0.66);
}
function keyReleased() {
  if (gameState === 'title') {
    if (key === 'r' || key === 'R' ) {
      gameState = 'restart';

    }
  } else if (gameState === 'gameover') {
    if (key === 'r' || key === 'R' ) {
      gameState = 'restart';
    }
  }
}

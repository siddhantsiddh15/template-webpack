import Phaser from "phaser";

import sky from "./assets/sprites/background-day.png";
import birdImg from "./assets/sprites/bluebird-downflap.png";

let bird;
const SPEED = 200;
const GRAVITY = 100;
const FLAP_VELOCITY = 150;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const INITIAL_BIRD_POSITION = {
  x: CANVAS_WIDTH / 10,
  y: CANVAS_HEIGHT / 2,
};

function preload() {
  // debugger;
  this.load.image("sky", sky);
  this.load.image("bird", birdImg);
}

// function create() {
//   const bg = this.add.image(
//     this.cameras.main.centerX,
//     this.cameras.main.centerY,
//     "sky"
//   );

//   const scaleX = this.cameras.main.width / bg.width;
//   const scaleY = this.cameras.main.height / bg.height;
//   const scale = Math.max(scaleX, scaleY);

//   bg.setScale(scale);
// }
function create() {
  // this.add.image(0, 0, "sky").setOrigin(0);

  this.bg = this.add
    .tileSprite(0, 0, config.width, config.height, "sky")
    .setOrigin(0);

  bird = this.physics.add
    .sprite(INITIAL_BIRD_POSITION.x, INITIAL_BIRD_POSITION.y, "bird")
    .setOrigin(0);

  bird.body.velocity.x = SPEED;
  // bird.body.gravity.y =200
  bird.body.gravity.y = GRAVITY;
}

function update(time, delta) {
  this.bg.tilePositionX += 1;

  checkOutofBounds();
  handleKeyDown(this);
}

function handleKeyDown(scene) {
  // this.input.on("pointerdown", flap) MOUSE EVENT
  scene.input.keyboard.on("keydown-SPACE", flap);
  // this.input.keyboard.on()
}

function checkOutofBounds() {
  if (bird.x >= config.width - bird.width) {
    bird.body.velocity.x = -SPEED;
  } else if (bird.x <= 0) {
    bird.body.velocity.x = SPEED;
  }

  // if (bird.y >= config.height - bird.height) {
  //   bird.body.velocity.y = -SPEED / 2;
  // } else if (bird.y <= 0) {
  //   bird.body.velocity.y = SPEED / 2;
  // }
  if (bird.y >= config.height - bird.height || bird.y <= 0) {
    restartBirdPosition();
  }
}

function restartBirdPosition(){
  bird.setPosition(INITIAL_BIRD_POSITION.x,INITIAL_BIRD_POSITION.y)
  bird.body.velocity.y = 0 // important as the accelaration will keep the speed increasing
}

function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY;
}

const config = {
  type: Phaser.AUTO, // ✅ Automatically chooses WebGL/Canvas
  width: CANVAS_WIDTH, // ✅ Canvas width
  height: CANVAS_HEIGHT, // ✅ Canvas height

  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

new Phaser.Game(config);

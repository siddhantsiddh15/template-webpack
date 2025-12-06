import Phaser from "phaser";

import sky from "./assets/sprites/background-day.png";
import birdImg from "./assets/sprites/bluebird-downflap.png";
import pipe from "./assets/sprites/pipe-green.png";

let bird;
let upperPipe;
let lowerPipe;
const SPEED = 200;
const GRAVITY = 200;
const FLAP_VELOCITY = 150;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const INITIAL_BIRD_POSITION = {
  x: CANVAS_WIDTH / 10,
  y: CANVAS_HEIGHT / 2,
};
const PIPE_VERTICAL_MARGIN = 20;
const PIPES_TO_RENDER = 4;
let pipeHorizontalDistance = 0;
// opening gap range (min, max)
let pipeVerticalDistanceRange = [100, 200];

// actual random gap value
let pipeVerticalDistance;

function preload() {
  // debugger;
  this.load.image("sky", sky);
  this.load.image("bird", birdImg);
  this.load.image("pipe", pipe);
}

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

  // generate multiple pipe
  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    createPipe(this, i);
  }
}

function createPipe(scene, index) {
  const [minGap, maxGap] = pipeVerticalDistanceRange;
  pipeVerticalDistance = Phaser.Math.Between(minGap, maxGap);

  const pipeVerticalPosition = Phaser.Math.Between(
    PIPE_VERTICAL_MARGIN,
    CANVAS_HEIGHT - PIPE_VERTICAL_MARGIN - pipeVerticalDistance
  );

  const xPos = CANVAS_WIDTH + index * 400;

  upperPipe = scene.physics.add
    .sprite(xPos, pipeVerticalPosition, "pipe")
    .setOrigin(0, 1);

  // disable gravity
  upperPipe.body.allowGravity = false;

  lowerPipe = scene.physics.add
    .sprite(xPos, upperPipe.y + pipeVerticalDistance, "pipe")
    .setOrigin(0, 0);

  lowerPipe.body.allowGravity = false;

  // give pipes velocity towards the player
  upperPipe.body.velocity.x = -200;
  lowerPipe.body.velocity.x = -200;
}

function update(time, delta) {
  this.bg.tilePositionX += 1;

  checkOutofBounds();
  handleKeyDown(this);

  detectCollision();
}

function detectCollision() {}

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

function restartBirdPosition() {
  bird.setPosition(INITIAL_BIRD_POSITION.x, INITIAL_BIRD_POSITION.y);
  bird.body.velocity.y = 0; // important as the accelaration will keep the speed increasing
}

function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY;
}

const config = {
  type: Phaser.AUTO, // ✅ Automatically chooses WebGL/Canvas
  width: CANVAS_WIDTH, // ✅ Canvas width
  height: CANVAS_HEIGHT, // ✅ Canvas height

  // scale: {
  //   mode: Phaser.Scale.RESIZE,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  // },

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

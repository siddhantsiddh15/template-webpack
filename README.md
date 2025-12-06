---

## 📘 Lecture Notes: Creating the First Phaser Game Skeleton

This is the **first real Phaser coding lecture** 🎮
You created:

* A Phaser game instance
* Game configuration
* Your first Scene lifecycle functions

---

## 🎮 What Is Phaser 3?

- JavaScript game framework
- Used for 2D browser games
- Uses **WebGL** (default renderer)
- Automatically falls back to Canvas if WebGL isn’t supported

---

## 📂 Where All Game Code Lives

✅ **Most work happens here:**

```
src/index.js
```

---

## 🧱 Step 1: Import Phaser

```js
import Phaser from "phaser";
```

✅ Phaser is available because it’s installed in `node_modules`

---

## 🧱 Step 2: Create Game Configuration Object

```js
const config = {
  type: Phaser.AUTO, // ✅ Automatically chooses WebGL/Canvas
  width: 800, // ✅ Canvas width
  height: 600, // ✅ Canvas height
};
```

### ❓ Why `Phaser.AUTO`?

- Uses WebGL if available
- WebGL = **Web Graphics Library**
- JS API for rendering 2D/3D graphics
- Supported by almost all modern browsers

---

## 🧱 Step 3: Add Physics Engine

```js
physics: {
  default: "arcade",
}
```

✅ **Arcade Physics**

- Lightweight
- Fast
- Perfect for Flappy Bird–style games
- Handles gravity, velocity, collisions

---

## 🧱 Step 4: Add a Scene

A **Scene = what you see on screen**

Phaser lifecycle:

1. `preload()` – load assets
2. `create()` – create objects
3. `update()` – game loop (runs every frame)

For now, we use only `preload` and `create`.

---

## ✅ Final Working Code (Lecture End State)

```js
import Phaser from "phaser";

function preload() {
  debugger; // ✅ called first
}

function create() {
  debugger; // ✅ called after preload
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: {
    preload,
    create,
  },
};

new Phaser.Game(config);
```

---

## 🧪 Understanding `this` Context

Inside `preload` & `create`:

```js
this; // ✅ refers to the current Scene
```

The scene provides:

- Asset loader
- Object creation
- Physics
- Input
- Cameras
- Animations

Example (not used yet):

```js
this.load;
this.add;
this.physics;
this.cameras;
```

📌 **Very important concept**:

> `this` = Scene instance

---

## 🔍 How Execution Happens

When you refresh the browser:

1️⃣ `preload()` runs
2️⃣ `create()` runs
3️⃣ Game waits (update not added yet)

✅ You verified this using `debugger`

---

## ✅ Browser Result

- Canvas size: **800 × 600**
- Black screen
- No errors
- Game instance successfully created

✅ This is exactly what we want at this stage

---

## 🏁 End of Lecture Checklist

✔ Phaser imported
✔ Game config created
✔ Renderer set
✔ Physics enabled
✔ Scene lifecycle understood
✔ Debugger tested

---

---

## 📘 Lecture Notes: Loading & Displaying an Image in Phaser

In this lecture you learned:

- How to **load assets** in Phaser
- How to **display images**
- How Phaser’s **coordinate system** works
- Why images appear cropped if positioned incorrectly

Framework used: **Phaser 3**

---

## 📂 Files Used

```
src/
 ├── index.js        ✅ main game file
 └── assets/
      └── sky.png    ✅ image displayed
```

---

## 🧠 Phaser Scene Lifecycle (Reminder)

Order of execution:
1️⃣ `preload()` → load assets
2️⃣ `create()` → create & display objects
3️⃣ `update()` → runs every frame (not used yet)

---

## ✅ Step 1: Load Image in `preload()`

```js
import sky from "./assets/sky.png";

function preload() {
  // key = "sky"
  // path = assets/sky.png
  this.load.image("sky", sky);
}
```

### 🔑 Key Points

- `"sky"` is a **unique key**
- You use this key later to display the image
- Assets must be loaded **before create()**

---

## ✅ Step 2: Display Image in `create()`

### ❌ Initial Attempt (Not Centered)

```js
function create() {
  this.add.image(0, 0, "sky");
}
```

### Why this looks wrong ❓

- `(0, 0)` is **top-left of the canvas**
- Phaser positions images **by their center**
- Half of the image goes outside the canvas

---

## 📐 Phaser Coordinate System (VERY IMPORTANT)

```
(0,0) ───────────▶ X
  │
  │
  ▼
  Y
```

- `(0,0)` = top-left corner
- Images are positioned **from their center**
- So placing at `(0,0)` hides most of the image

---

## ✅ Step 3: Correctly Center the Image

### ✅ Correct & Final Code

```js
function create() {
  this.add.image(config.width / 2, config.height / 2, "sky");
}
```

### 💡 Why this works

- Canvas width = `800` → `800 / 2 = 400`
- Canvas height = `600` → `600 / 2 = 300`
- Image center aligns with canvas center ✅

---

## ✅ Final Working `index.js`

```js
import Phaser from "phaser";
import sky from "./assets/sky.png";

function preload() {
  this.load.image("sky", sky);
}

function create() {
  this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "sky");
}

console.log(this.cameras.main.centerX, this.cameras.main.centerY);

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: {
    preload,
    create,
  },
};

new Phaser.Game(config);
```

---

## ✅ Result in Browser

✔ Canvas visible
✔ Image fully visible
✔ Image centered perfectly

---

## 🧠 Mental Model to Remember

> **Phaser places images from their CENTER, not top-left**

---


---

# 📘 Lecture Notes: Physics, Body, Velocity & Update Loop

*(Phaser 3)*

---

## 🎮 Sprite & Physics Body (Important Concept)

* A **Sprite** does NOT automatically have physics.
* `sprite.body` can be **null**.
* To enable **Arcade Physics**, the sprite **must be created via physics system**.

### ❌ Wrong (No physics body)

```js
bird = this.add.sprite(100, 300, "bird");
console.log(bird.body); // null
```

### ✅ Correct (Physics enabled)

```js
bird = this.physics.add.sprite(100, 300, "bird");
console.log(bird.body); // Arcade Physics Body ✅
```

✅ Now `bird.body` exists and includes:

* velocity
* gravity
* acceleration
* bounce
* drag
* mass
* collision flags

---

## 📦 What is `body`?

`body` is the **physics representation** of your sprite.

From Phaser docs:

> If the object is enabled for Arcade Physics, `body` contains a physics body. Otherwise, it is `null`.

---

## 🧲 Applying Forces

There are **two main forces** used most of the time:

### 1️⃣ Velocity (constant speed)

```js
bird.body.velocity.y = 200;
```

✅ Meaning:

* Moves **200 pixels per second**
* Speed is **constant**
* No acceleration

---

### 2️⃣ Gravity (acceleration over time)

```js
bird.body.gravity.y = 200;
```

✅ Meaning:

* Speed keeps **increasing**
* After 1s → ~200 px/s
* After 2s → ~400 px/s
* After 3s → ~600 px/s

👉 Gravity **adds velocity every frame**

---

## 🧠 Velocity vs Gravity (Easy Difference)

| Force    | Behaviour                 |
| -------- | ------------------------- |
| Velocity | Constant speed            |
| Gravity  | Speed increases over time |
| Velocity | No acceleration           |
| Gravity  | Acceleration              |

---

## 🔁 Game Loop: `update()` Function

* `update()` runs **every frame**
* Normally around **60 FPS**
* Called ~60 times per second

```js
function update() {
  console.log("frame");
}
```

✅ You’ll see **~60 logs per second**

---

## ⏱ Delta Time (`delta`)

Phaser passes **delta time** to `update()`:

```js
function update(time, delta) {
  console.log(delta);
}
```

✅ Typical output:

* ~16 ms per frame

### Why?

```
1000ms / 60fps ≈ 16.6ms
```

📌 Delta = time since last frame
📌 Used for **frame-independent movement**

---

## 📈 Debugging Velocity in Update

### With Velocity

```js
bird.body.velocity.y = 200;

function update() {
  console.log(bird.body.velocity.y);
}
```

✅ Output:

```
200
200
200
200
```

(Constant)

---

### With Gravity

```js
bird.body.gravity.y = 200;

function update() {
  console.log(bird.body.velocity.y);
}
```

✅ Output:

```
10
40
80
140
220
```

(Increasing every frame)

---

## 🧪 Full Minimal Example (This Lecture)

```js
let bird;

function preload() {
  this.load.image("bird", "assets/bird.png");
}

function create() {
  bird = this.physics.add.sprite(
    this.scale.width / 10,
    this.scale.height / 2,
    "bird"
  );

  bird.body.gravity.y = 200; // try velocity.y = 200 to compare
}

function update(time, delta) {
  console.log("Velocity:", bird.body.velocity.y);
}
```

---

## ✅ Key Takeaways (Very Important)

✔ `this.add.sprite()` → NO physics
✔ `this.physics.add.sprite()` → Physics enabled
✔ `velocity` = constant movement
✔ `gravity` = acceleration
✔ `update()` runs ~60 times/sec
✔ `delta ≈ 16ms` per frame
✔ Gravity modifies velocity over time

---

# 📘 Lecture Notes: Gravity Over Time (Phaser 3)

---

## 🧠 Recap: Gravity vs Velocity

### Velocity

* Constant speed
* Does **not** change unless you modify it

### Gravity

* Starts from **0 velocity**
* **Accelerates every second**
* Continuously increases velocity

---

## 📈 How Gravity Works (Mental Model)

Assume:

```js
bird.body.gravity.y = 200;
```

| Time    | Velocity (px/s) |
| ------- | --------------- |
| T0 (0s) | 0               |
| T1 (1s) | 200             |
| T2 (2s) | 400             |
| T3 (3s) | 600             |
| T4 (4s) | 800             |

✅ Velocity increases **linearly over time**

---

## 🔁 `update()` & Delta Time

* `update()` runs ~**60 times/sec**
* Each frame ≈ **16 ms**
* Delta = time since last frame (in ms)

```js
function update(time, delta) {
  console.log(delta); // ~16ms
}
```

✅ 60 × 16 ≈ 1000 ms = 1 second

---

## ⏳ Tracking Time Manually (Exercise)

We accumulate delta time to detect **1 second elapsed**.

### ✅ Setup Variable

```js
let totalDelta = 0;
```

---

## ✅ Logging Velocity Once Per Second

```js
function update(time, delta) {
  totalDelta += delta;

  if (totalDelta < 1000) {
    return;
  }

  console.log("Velocity Y:", bird.body.velocity.y);

  totalDelta = 0;
}
```

✅ What you’ll see in console:

```
200
400
600
800
```

---

## 🎯 Why This Matters

* Gravity **adds velocity every frame**
* Each second makes the object fall faster
* This explains **Flappy Bird drop mechanics**

---

## 🧪 Full Working Example (Lecture Version)

```js
let bird;
let totalDelta = 0;

function preload() {
  this.load.image("bird", "assets/bird.png");
}

function create() {
  bird = this.physics.add.sprite(
    this.scale.width / 10,
    this.scale.height / 2,
    "bird"
  );

  bird.body.gravity.y = 200;
}

function update(time, delta) {
  totalDelta += delta;

  if (totalDelta < 1000) return;

  console.log("Velocity:", bird.body.velocity.y);
  totalDelta = 0;
}
```

---

## 🌍 Applying Global Gravity (Scene-Level)

Instead of:

```js
bird.body.gravity.y = 200;
```

✅ Apply gravity to **all objects**:

```js
const config = {
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false
    }
  }
};
```

✅ Every physics-enabled object gets gravity automatically

---

## ➕ Combining Global + Local Gravity

```js
// Global
arcade: {
  gravity: { y: 200 }
}

// Extra gravity for bird
bird.body.gravity.y = 200;
```

✅ Effective gravity on bird = `400`

---

## ⚠️ Important Notes

✔ Global gravity + body gravity **stack**
✔ Velocity is affected by gravity automatically
✔ Resetting velocity is important in jump mechanics
✔ Flappy Bird jump works by **setting negative velocity**

---

## ✅ Key Takeaways

✅ Gravity starts from zero velocity
✅ Gravity increases velocity every second
✅ Velocity stays constant unless modified
✅ `delta` helps measure real time
✅ Global gravity applies to all physics objects
✅ Local gravity overrides / adds to global

---


# BACKGROUND


In **Phaser**, for *background repeating* you should **NOT use `image`**.

✅ The correct tool is **`TileSprite`**.

---

## ✅ Why `TileSprite`?

* Automatically **repeats (tiles)** the texture
* Perfect for **scrolling / infinite backgrounds**
* No manual looping needed

---

## ✅ Basic Background Repeat (800 × 600)

Replace this ❌

```js
this.add.image(0, 0, "sky").setOrigin(0);
```

With this ✅

```js
this.bg = this.add.tileSprite(
  0,
  0,
  config.width,
  config.height,
  "sky"
).setOrigin(0);
```

This will **repeat `sky.png` to fill entire canvas**.

---

## ✅ Scrolling Background (Flappy-style)

Add this in `update()` 👇

```js
function update() {
  this.bg.tilePositionX += 1; // scroll speed
}
```

✅ Background repeats **infinitely**
✅ No gaps
✅ Super smooth

---

## ✅ Full Working Example

```js
let bird;
let bg;
const SPEED = 200;

function preload() {
  this.load.image("sky", sky);
  this.load.image("bird", birdImg);
}

function create() {
  bg = this.add.tileSprite(
    0,
    0,
    config.width,
    config.height,
    "sky"
  ).setOrigin(0);

  bird = this.physics.add.sprite(
    config.width / 10,
    config.height / 2,
    "bird"
  ).setOrigin(0);

  bird.body.velocity.x = SPEED;
}

function update() {
  bg.tilePositionX += 1;
}
```

---

## ✅ Important Notes (very useful)

### ✔ Image can be ANY size

TileSprite will:

* Automatically repeat small images
* Clip large images cleanly

---

### ✅ Want responsive background?

Use camera size instead:

```js
bg = this.add.tileSprite(
  0,
  0,
  this.cameras.main.width,
  this.cameras.main.height,
  "sky"
).setOrigin(0);
```

---

### ✅ Vertical repeat too?

```js
bg.tilePositionY += 1;
```

---

## 🧠 Rule of Thumb (remember forever)

| Goal                 | Phaser Object          |
| -------------------- | ---------------------- |
| Static image         | `Image`                |
| Repeating background | ✅ `TileSprite`         |
| Parallax             | Multiple `TileSprite`s |

---



---

# ✅ Lecture Notes — Flapping (Gravity + Input) in Phaser 3

## 🎯 Goal of This Lecture

* Apply **gravity** to the bird
* Make the bird **fall continuously**
* On **mouse click OR space key press**, apply an **upward force (flap)**
* Understand how **gravity + velocity** work together

---

## 🧠 Core Physics Concept (Very Important)

### Velocity vs Gravity

* **Gravity** continuously increases downward velocity
* **Velocity.y < 0** → moves **up**
* **Velocity.y > 0** → moves **down**
* Flap = **instant upward velocity**
* Gravity pulls bird back down after flap

---

## ✅ Step 1: Apply Gravity (Create Function)

```js
function create() {
  this.add.image(0, 0, "sky").setOrigin(0);

  bird = this.physics.add.sprite(
    config.width / 10,
    config.height / 2,
    "bird"
  ).setOrigin(0);

  // Apply gravity
  bird.body.gravity.y = 400;
}
```

✅ Bird falls automatically
❌ No upward movement yet

---

## ✅ Step 2: Capture Mouse Click (Pointer Down)

```js
this.input.on("pointerdown", flap);
```

* `pointerdown` = mouse click / tap
* Calls `flap()` whenever clicked

---

## ✅ Step 3: Capture Space Key (Keyboard Input)

⚠️ **Key names are CASE-SENSITIVE**

✅ Correct event:

```js
this.input.keyboard.on("keydown-SPACE", flap);
```

❌ Wrong (won’t work):

```js
keydown-space
space_down
```

---

## ✅ Step 4: Flap Function (Upward Velocity)

```js
const FLAP_VELOCITY = 250;

function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY;
}
```

### ✅ Why negative?

* Negative `y` velocity = upward movement
* Gravity will immediately start pulling bird down again

---

## ✅ Step 5: Final Clean Working Example

```js
let bird;
const FLAP_VELOCITY = 250;

function preload() {
  this.load.image("sky", sky);
  this.load.image("bird", birdImg);
}

function create() {
  this.add.image(0, 0, "sky").setOrigin(0);

  bird = this.physics.add.sprite(
    config.width / 10,
    config.height / 2,
    "bird"
  ).setOrigin(0);

  // Gravity
  bird.body.gravity.y = 400;

  // Mouse click
  this.input.on("pointerdown", flap);

  // Space key
  this.input.keyboard.on("keydown-SPACE", flap);
}

function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY;
}
```

---

## ✅ Optional: Global Gravity (All Physics Objects)

```js
const config = {
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: false
    }
  }
};
```

Then **remove**:

```js
bird.body.gravity.y = 400;
```

---

## 🎮 Game Feel Tuning (Very Important)

| Effect          | Change                 |
| --------------- | ---------------------- |
| Faster fall     | Increase gravity       |
| Stronger flap   | Increase flap velocity |
| Softer controls | Lower both             |

Example balance:

```js
gravity = 400
flap = 250
```

---

## 🧠 Common Mistakes (You Avoided Them ✅)

❌ Using positive velocity for flap
❌ Forgetting gravity
❌ Wrong key event name
❌ Adding velocity instead of setting it

✅ Correct approach:

```js
bird.body.velocity.y = -FLAP_VELOCITY;
```

---

Below are **clean, exam-ready NOTES + Phaser 3 CODE SNIPPETS** for this lecture.
You can copy-paste directly into your project ✅

---


## 🎯 Goal of This Lecture

* Bird flies up when:

  * Mouse click
  * Space key press
* Apply **gravity** (bird falls down)
* **Restart the game** when:

  * Bird goes **below canvas**
  * Bird goes **above canvas**
* Reset:

  * Bird position
  * Bird vertical velocity

---

## ✅ Key Concepts You Learn

### 1️⃣ Gravity keeps increasing velocity

* Gravity continuously increases `body.velocity.y`
* When restarting → **reset velocity to 0**

---

### 2️⃣ Canvas bounds logic (Game Over)

Bird is **out of bounds** when:

```js
bird.y > config.height          // bottom
bird.y < -bird.height           // top
```

---

### 3️⃣ Restarting the bird (instead of alert)

Reset:

* X position
* Y position
* Velocity Y

---

## ✅ Constants & Globals

```js
let bird;

const GRAVITY = 400;
const FLAP_VELOCITY = 250;

const INITIAL_BIRD_POSITION = {
  x: config.width * 0.1,
  y: config.height / 2,
};
```

---

## ✅ Preload

```js
function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
}
```

---

## ✅ Create (Setup Once)

```js
function create() {
  // Background
  this.add.image(0, 0, "sky").setOrigin(0);

  // Bird
  bird = this.physics.add.sprite(
    INITIAL_BIRD_POSITION.x,
    INITIAL_BIRD_POSITION.y,
    "bird"
  );

  bird.body.gravity.y = GRAVITY;

  // Input
  this.input.on("pointerdown", flap);
  this.input.keyboard.on("keydown-SPACE", flap);
}
```

---

## ✅ Flap Function (Move Up)

```js
function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY;
}
```

✅ Negative velocity = move upward
✅ Gravity pulls it back down

---

## ✅ Update (Game Loop)

```js
function update() {
  checkOutOfBounds();
}
```

---

## ✅ Out-of-Bounds Check

```js
function checkOutOfBounds() {
  if (
    bird.y > config.height ||
    bird.y < -bird.height
  ) {
    restartBirdPosition();
  }
}
```

---

## ✅ Restart Bird Logic (IMPORTANT)

```js
function restartBirdPosition() {
  bird.setPosition(
    INITIAL_BIRD_POSITION.x,
    INITIAL_BIRD_POSITION.y
  );

  bird.body.velocity.y = 0; // RESET velocity ❗
}
```

✅ Prevents gravity from stacking
✅ Clean restart behavior

---

## ✅ Common Mistakes (Exam / Interview)

❌ Restarting without resetting velocity
❌ Handling input inside `update()`
❌ Using `alert()` instead of logic
❌ Forgetting bird height when checking top bound

---

## 🧠 Mental Model (Remember This)

> **Gravity is permanent → velocity must be reset on restart**

---

## ✅ Final Result

✔ Click / Space → bird flies up
✔ Gravity pulls bird down
✔ Bird exits screen → game restarts cleanly
✔ Smooth Flappy-Bird-style behavior

----


Good question — your logic is **almost correct**, but there are **two subtle Phaser gotchas** that together cause the pipe to go out of bounds.

I’ll explain **exactly why** it happens and then give you the **correct fix**.

---

## ✅ Root cause #1 (MAIN ISSUE): `setOrigin(0, 1)` changes how `y` works

```js
upperPipe = scene.physics.add
  .sprite(CANVAS_WIDTH / 4, pipeVerticalPosition, "pipe")
  .setOrigin(0, 1);
```

### What this means:

* `originY = 1` → **the `y` value is the BOTTOM of the pipe**
* NOT the top

But your vertical range assumes `y` is the **top**.

---

## ❌ Your current range calculation

```js
const pipeVerticalPosition = Phaser.Math.Between(
  PIPE_VERTICAL_MARGIN,
  CANVAS_HEIGHT - PIPE_VERTICAL_MARGIN - pipeVerticalDistance
);
```

### Why this breaks

* `pipeVerticalPosition` is used as **bottom of upper pipe**
* But you did NOT subtract the **pipe height**
* Result: the pipe’s top goes above the canvas

So visually:

```
[ pipe top ]  ❌ goes above canvas
|
|  pipe
|
y (this value)
```

---

## ✅ Correct calculation (THIS FIXES IT)

Since `upperPipe.y` is the **bottom**, the lowest safe point is:

```
minY = pipe height + margin
```

### ✅ FIXED version

```js
const pipeHeight = 480; // your pipe sprite height

const pipeVerticalPosition = Phaser.Math.Between(
  pipeHeight + PIPE_VERTICAL_MARGIN,
  CANVAS_HEIGHT - PIPE_VERTICAL_MARGIN - pipeVerticalDistance
);
```

✅ Now the **top of the upper pipe never leaves the canvas**

---

## ✅ Root cause #2 (IMPORTANT): `RESIZE` + fixed constants

You are using:

```js
scale: {
  mode: Phaser.Scale.RESIZE,
}
```

but also using:

```js
CANVAS_HEIGHT = 600;
CANVAS_WIDTH = 800;
```

### Why this causes problems later

If the browser resizes:

* `scene.scale.height` ✅ changes
* `CANVAS_HEIGHT` ❌ does NOT

This WILL cause pipes to go out of bounds later.

---

## ✅ Proper way (BEST PRACTICE)

Always calculate positions using **scene dimensions**, not constants.

Replace this 👇

```js
CANVAS_HEIGHT
CANVAS_WIDTH
```

With this ✅

```js
scene.scale.height
scene.scale.width
```

---

## ✅ FINAL FIXED `createPipe()` (COPY-PASTE SAFE)

```js
function createPipe(scene) {
  const [minGap, maxGap] = pipeVerticalDistanceRange;
  pipeVerticalDistance = Phaser.Math.Between(minGap, maxGap);

  const pipeHeight = 480;

  const pipeVerticalPosition = Phaser.Math.Between(
    pipeHeight + PIPE_VERTICAL_MARGIN,
    scene.scale.height - PIPE_VERTICAL_MARGIN - pipeVerticalDistance
  );

  upperPipe = scene.physics.add
    .sprite(scene.scale.width / 4, pipeVerticalPosition, "pipe")
    .setOrigin(0, 1);

  upperPipe.body.allowGravity = false;

  lowerPipe = scene.physics.add
    .sprite(
      scene.scale.width / 4,
      upperPipe.y + pipeVerticalDistance,
      "pipe"
    )
    .setOrigin(0, 0);

  lowerPipe.body.allowGravity = false;
}
```

---

## 🧠 Mental model (remember this forever)

| Origin     | `y` represents         |
| ---------- | ---------------------- |
| `(0, 0)`   | top of sprite          |
| `(0, 0.5)` | center                 |
| `(0, 1)`   | **bottom of sprite** ✅ |

If you change origin → **you must change your math**.

---

## ✅ TL;DR

**Pipes go out of bounds because:**

1. `setOrigin(0, 1)` makes `y` the bottom
2. You didn’t subtract pipe height
3. `RESIZE` + fixed constants is dangerous


------------

Here are **clean, structured notes + code snippets** based exactly on what the lecture explains.
This will help you continue your Flappy-Bird clone in Phaser like the Udemy course.

---

# ✅ **NOTES — Rendering Multiple Pipes & Moving Them Toward Player**

### **1. Goal**

We want:

* Multiple pipes generated ahead of the player
* Each pipe having:

  * random vertical position
  * random gap
* Pipes placed horizontally at different distances
* Pipes moving left (towards the player)

Finally, only some pipes will be visible in the canvas, others will pre-load outside the screen.

---

# ✅ **2. Setting number of pipes**

```js
const PIPES_TO_RENDER = 4;
```

---

# ✅ **3. Creating multiple pipes in a loop**

Instead of creating just one pipe, we loop:

```js
for (let i = 0; i < PIPES_TO_RENDER; i++) {
    createPipe(this, i);
}
```

Each pipe will be placed further to the right based on `i`.

---

# ✅ **4. Horizontal distance between pipes**

We track this:

```js
let pipeHorizontalDistance = 0;
```

Each new pipe is placed `400px` further:

```js
pipeHorizontalDistance += 400;
```

We can later turn this into a random range.

---

# ✅ **5. Updated createPipe() that supports multiple pipes**

Important:

* Each pipe has its own vertical gap
* Each pipe is positioned using the horizontal distance

### ✔ Final snippet:

```js
function createPipe(scene, index) {
  const [minGap, maxGap] = pipeVerticalDistanceRange;
  const gap = Phaser.Math.Between(minGap, maxGap);

  const verticalPos = Phaser.Math.Between(
    PIPE_VERTICAL_MARGIN,
    CANVAS_HEIGHT - PIPE_VERTICAL_MARGIN - gap
  );

  // horizontal offset based on index:
  const xPos = CANVAS_WIDTH + index * 400; // 400 = spacing between pipes

  const upper = scene.physics.add.sprite(xPos, verticalPos, "pipe")
    .setOrigin(0, 1);
  upper.body.allowGravity = false;

  const lower = scene.physics.add.sprite(xPos, verticalPos + gap, "pipe")
    .setOrigin(0, 0);
  lower.body.allowGravity = false;

  // give pipes velocity towards the player
  upper.body.velocity.x = -200;
  lower.body.velocity.x = -200;
}
```

---

# ✅ **6. Moving pipes left**

Just set body velocity:

```js
upperPipe.body.velocity.x = -200;
lowerPipe.body.velocity.x = -200;
```

Now the pipes scroll toward the player.

---

# ✅ **7. What happens now**

✔ Pipes spawn at:

```
x = canvas width + (index * horizontal_distance)
```

✔ Only 1 will be visible at a time.
✔ Others are pre-loaded off-screen.
✔ All pipes move towards the bird.
✔ This creates an infinite-runner feeling.

---

# ⚡ **FULL COMBINED SNIPPET (Ready to paste)**

```js
const PIPES_TO_RENDER = 4;
let pipeHorizontalDistance = 0;

function create() {
  this.bg = this.add.tileSprite(0, 0, config.width, config.height, "sky").setOrigin(0);

  bird = this.physics.add.sprite(INITIAL_BIRD_POSITION.x, INITIAL_BIRD_POSITION.y, "bird")
    .setOrigin(0);
  bird.body.gravity.y = GRAVITY;

  // generate multiple pipes
  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    createPipe(this, i);
  }
}

function createPipe(scene, index) {
  const [minGap, maxGap] = pipeVerticalDistanceRange;
  const gap = Phaser.Math.Between(minGap, maxGap);

  const verticalPos = Phaser.Math.Between(
    PIPE_VERTICAL_MARGIN,
    CANVAS_HEIGHT - PIPE_VERTICAL_MARGIN - gap
  );

  // horizontal offset
  const xPos = CANVAS_WIDTH + index * 400;

  const upper = scene.physics.add.sprite(xPos, verticalPos, "pipe")
    .setOrigin(0, 1);
  upper.body.allowGravity = false;

  const lower = scene.physics.add.sprite(xPos, verticalPos + gap, "pipe")
    .setOrigin(0, 0);
  lower.body.allowGravity = false;

  // pipes move left
  upper.body.velocity.x = -200;
  lower.body.velocity.x = -200;
}
```

---

# Want next lecture’s notes too?

Just say **"continue"** and I’ll give:

* Pipe recycling system
* Collision with pipes
* Score system
* Restart mechanics

Happy coding 🚀

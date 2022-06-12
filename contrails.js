/**
 * Author : Thomas Bach
 * Github : https://github.com/thomasbachdev/contrails.js
 */

import params from "./contrails.json" assert { type: "json" };

const contrails = document.getElementById("contrails");
contrails.style.width = "100%";
contrails.style.height = "100%";
contrails.style.overflow = "hidden";

/* Init canvas */
const size = contrails.getBoundingClientRect();
var canvas = document.createElement("canvas");
canvas.width = size.width;
canvas.height = size.height;
contrails.appendChild(canvas);
const ctx = canvas.getContext("2d");

/* Init plane image */
var planeImg = new Image();
planeImg.src = params["img_path"];

class Plane {
  constructor(position, speed, direction, size) {
    this.pos = position;
    this.speed = speed;
    this.dir = direction;
    this.size = size;
  }

  move() {
    this.pos.x += this.dir.x * this.speed;
    this.pos.y += this.dir.y * this.speed;
  }

  draw() {
    ctx.drawImage(planeImg, this.pos.x, this.pos.y, this.size, this.size);
  }

  update() {
    this.move();
    this.draw();
  }
}

function createPlane() {
  let position = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };
  let direction = { x: 1, y: 0 };
  let speed = params["planes"]["speed"];
  let size = params["planes"]["size"];
  return new Plane(position, speed, direction, size);
}

var plane = createPlane();

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  plane.update();
}

animate();

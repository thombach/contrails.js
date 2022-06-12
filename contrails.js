/**
 * Author : Thomas Bach
 * Github : https://github.com/thomasbachdev/contrails.js
 */

import params from "./contrails.json" assert { type: "json" };

const TO_RADIANS = Math.PI / 180;

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
  constructor(position, speed, size, angle) {
    this.pos = position;
    this.speed = speed;
    this.size = size;
    this.angle = angle;
  }

  move() {
    this.pos.x += Math.cos(this.angle * TO_RADIANS) * this.speed;
    this.pos.y += Math.sin(this.angle * TO_RADIANS) * this.speed;
  }

  draw() {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle * TO_RADIANS);
    ctx.drawImage(
      planeImg,
      -(this.size / 2),
      -(this.size / 2),
      this.size,
      this.size
    );
    ctx.restore();
  }

  update() {
    this.move();
    this.draw();
  }
}

class PlaneManager {
  constructor(number) {
    this.number = number;
    this.planes = [];
    for (let index = 0; index < this.number; index++) {
      this.createPlane();
    }
  }

  createPlane() {
    let position = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    };
    let speed = params["planes"]["speed"];
    let size = params["planes"]["size"];
    let angle = Math.random() * 360;
    this.planes.push(new Plane(position, speed, size, angle));
  }

  update() {
    this.planes.forEach((plane) => {
      plane.update();
    });
  }
}

var pm = new PlaneManager(params["planes"]["number"]);

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pm.update();
}

animate();

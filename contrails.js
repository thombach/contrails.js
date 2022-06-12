/**
 * Author : Thomas Bach
 * Github : https://github.com/thomasbachdev/contrails.js
 */

import parameters from "./contrails.json" assert { type: "json" };

const params = parameters;

const TO_RADIANS = Math.PI / 180;
const fps = params.fps;
const canvasOffset = params.canvas_offset;
const maxParticleNum = params.particles.number;

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

/* Init context */
const ctx = canvas.getContext("2d");

/* Init plane image */
var planeImg = new Image();
planeImg.src = params.img_path;

class Particle {
  constructor(position) {
    this.position = position;
    this.size = params.particles.size;
    this.lifespan = params.particles.lifespan;
    this.life = this.lifespan;
    this.opacity = 1;
    this.color = params.particles.color;
  }

  draw() {
    ctx.save();
    ctx.fillStyle = params.particles.color;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  update() {
    if(this.life > 0){
      this.draw();
      this.life--;
      this.opacity = this.life / this.lifespan;
    }
  }
}

/* Plane object */
class Plane {
  constructor(position, angle) {
    this.pos = position;
    this.speed = params.planes.speed;
    this.size = params.planes.size;
    this.angle = angle;
    this.contrail = [];
  }

  move() {
    // West overflow
    if(-canvasOffset > this.pos.x) {
      this.pos.x = canvas.width + canvasOffset;
    }
    // North overflow
    else if(-canvasOffset > this.pos.y) {
      this.pos.y = canvas.height + canvasOffset;
    }
    // East overflow
    else if(canvasOffset + canvas.width < this.pos.x) {
      this.pos.x = -canvasOffset;
    }
    // South overflow
    else if(canvasOffset + canvas.height < this.pos.y) {
      this.pos.y = -canvasOffset;
    }
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

    if (this.contrail.length < maxParticleNum) {
      this.contrail.push(new Particle(this.position));
    }
    this.contrail.forEach((particle, index) => {
      particle.update();
      if(particle.life <= 0){
        this.contrail.splice(index, 1);
      }
    })
  }
}

/* Create and manage the planes */
class PlaneManager {
  constructor() {
    this.number = params.planes.number;
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
    let angle = Math.random() * 360;
    this.planes.push(new Plane(position, angle));
  }

  update() {
    this.planes.forEach((plane) => {
      plane.update();
    });
  }
}

var pm = new PlaneManager();

function animate() {
  setTimeout(function () {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pm.update();
  }, 1000 / fps);
}

animate();

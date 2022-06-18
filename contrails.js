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

document.body.style.backgroundColor = params.background_color;

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
    this.pos = position;
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
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  moveAndGrow(offset) {
    this.pos.x += offset;
    this.pos.y += offset;
    this.size += offset*0.2;
  }

  update() {
    if (this.life > 0) {
      let r = Math.random();
      if (r < params.particles.move_probability) {
        this.moveAndGrow(r);
      }
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
    this.contrail1 = [];
    this.contrail2 = [];
    this.contrailSpacing = params.planes.contrails_spacing;

    // Particles spawn point will be behind the plane
    let oppositeAngle = ((angle + 180) % 360) * TO_RADIANS;
    if(!params.planes.double_contrails) {
      this.contrail1Pos = {
        x: (this.size / 2) * Math.cos(oppositeAngle),
        y: (this.size / 2) * Math.sin(oppositeAngle),
      };
      this.contrail2Pos = null;
    }
    else {
      this.contrail1Pos = {
        x: (this.size / 2) * Math.cos(oppositeAngle + this.contrailSpacing),
        y: (this.size / 2) * Math.sin(oppositeAngle + this.contrailSpacing),
      };
      this.contrail2Pos = {
        x: (this.size / 2) * Math.cos(oppositeAngle - this.contrailSpacing),
        y: (this.size / 2) * Math.sin(oppositeAngle - this.contrailSpacing),
      };
    }
    
  }

  move() {
    // West overflow
    if (-canvasOffset > this.pos.x) {
      this.pos.x = canvas.width + canvasOffset;
    }
    // North overflow
    else if (-canvasOffset > this.pos.y) {
      this.pos.y = canvas.height + canvasOffset;
    }
    // East overflow
    else if (canvasOffset + canvas.width < this.pos.x) {
      this.pos.x = -canvasOffset;
    }
    // South overflow
    else if (canvasOffset + canvas.height < this.pos.y) {
      this.pos.y = -canvasOffset;
    }
    this.pos.x += Math.cos(this.angle * TO_RADIANS) * this.speed;
    this.pos.y += Math.sin(this.angle * TO_RADIANS) * this.speed;
  }

  draw() {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate((this.angle + params.img_angle) * TO_RADIANS);
    ctx.drawImage(
      planeImg,
      -(this.size / 2),
      -(this.size / 2),
      this.size,
      this.size
    );
    ctx.restore();
  }

  updateContrail(contrail, contrailPos) {
    if(contrailPos == null) {
      return;
    }
    if (contrail.length < maxParticleNum) {
      contrail.push(
        new Particle({
          x: this.pos.x + contrailPos.x,
          y: this.pos.y + contrailPos.y,
        })
      );
    }
    contrail.forEach((particle, index) => {
      particle.update();
      if (particle.life <= 0) {
        contrail.splice(index, 1);
      }
    });

  }

  update() {
    this.move();
    this.draw();
    this.updateContrail(this.contrail1, this.contrail1Pos);
    this.updateContrail(this.contrail2, this.contrail2Pos);   
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

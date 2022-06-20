# contrails.js

## A simple JavaScript library to create airplane contrails animation. 

---

## `Usage`

- Download **contrails.js** and **contrails.json**
- Add contrails.js to your project :
```html
<div id="contrails"></div>
<script type="module" src="contrails.js"></script>
```
- Configure your contrails.json with the values you want

## `Settings`

name | type | note | example
----|---------|-------|---------
img_path | string | The image's path you want to use as plane | "./assets/airplane-blue.svg"
img_angle | number (degree) | Initial rotation of your image | 90
background_color | string | Background color behind canvas | "#87CEEB"
planes.speed | number | Planes move speed | 3
planes.size | number | Planes size | 20
planes.number | number | Number of planes in the canvas | 3
planes.double_contrails | boolean | Whether each plane emits 1 or 2 contrails | true
planes.contrails_spacing | number | Spacing between 2 contrails | 0.2
particles.size | number | Initial size of circle particle in contrails | 0.5
particles.lifespan | number | Lifespan of 1 particle | 200
particles.number | number | Max number of particles per contrail | 200
particles.color | string | Particle color | "#FFFFFF"
particles.move_probability | number | Probability for a particle to move and grow randomly at each update | 0.3
fps | number | Number of times the script has to update the animations per second | 60
canvas_offset | number | Size of the hidden area around the canvas | 50
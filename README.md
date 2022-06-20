# contrails.js

## A simple JavaScript library to create airplane contrails animation. 

---
![Screenshot_20220620_222157](https://user-images.githubusercontent.com/61914032/174673013-941da091-8bf2-4421-ac54-f09e0876618a.png)

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

## `Screenshots`
![Screenshot_20220620_220738](https://user-images.githubusercontent.com/61914032/174671980-47591232-3007-45a4-af9a-0dc19f013ba3.png)
![Screenshot_20220620_215912](https://user-images.githubusercontent.com/61914032/174671992-5d82d73e-66ee-4a7a-8970-75a381ee9a36.png)
![Screenshot_20220620_221143](https://user-images.githubusercontent.com/61914032/174672004-7225c5b0-9729-4b6d-af91-973bc7f9d66d.png)

var planeImg = document.createElement('img');
planeImg.src = 'assets/airplane.png';
planeImg.id = 'plane';
document.getElementById('contrailCanvas').appendChild(planeImg);

let x = 0, y= 0;
var planeAnim = setInterval(movePlane, 5);


function movePlane() {
    var plane = document.getElementById('plane');
    plane.style.left = x + "px";
    x++;
}
const cvs = document.querySelector('canvas');
const c = cvs.getContext('2d');
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

//this ensures it will always fit the screen
window.addEventListener('resize', function () {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
});

//creates a global mouse object and an event listerner
let mouse = {
  x: undefined,
  y: undefined
};
//window.addEventListener('mousemove', function (e) {
//  mouse.x = event.x;
//  mouse.y = event.y;
//});
var isDragging = false;

window.addEventListener('mousedown', e => {
  console.log("down");
  x = e.offsetX;
  y = e.offsetY;
  //x and y are the starting point of the drag / where u clicked
  console.log(c.isPointInPath(x, y));
  isDragging = c.isPointInPath(x, y);
});

window.addEventListener('mousemove', e => {
  if (isDragging === true) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    camera.update(mouse.x, mouse.y);
    //mouse x and y will be the ending point of the dragging
  }
});

window.addEventListener('mouseup', e => {
  console.log("UP");
  if (isDragging === true) {
    //reseting the starting point
    console.log(x, y)

    x = 0;
    y = 0;
    console.log(mouse.x, mouse.y)
    camera.rotate();
    isDragging = false;
  }
});





class Camera {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;

    //these are the points
    this.A = [x - (width/2), y];
    this.B = [x, y - (height - width/3)];
    this.C = [x + (width/2), y];
    this.D = [x, this.y + (width/3)];
    //will need to change when we do scaling :)

    this.width = width
    this.height = height

    //this.initialX = x;
    //this.initialY = y;
  };
  draw = () => {
    c.moveTo(this.x, this.y);

    c.beginPath();

    //c.arc(95, 50, 40, 0, Math.PI, false);
    c.moveTo(this.A[0], this.A[1]);
    c.lineTo(this.B[0], this.B[1]);
    c.lineTo(this.C[0], this.C[1]);
    c.lineTo(this.D[0], this.D[1]);
    //c.lineTo(95, 10);
    //.lineTo(135, 50);
    //c.closePath();
    c.fillStyle = 'blue';
    c.globalAlpha = 0.2;
    c.fill();
    //c.addHitRegion({id: "camera"});
    c.stroke();


    //this.update();
  };
  drag = (xChange, yChange) => {
    this.x = xChange + this.x;
    this.y = yChange + this.y;
    //this.draw(); tthis moves in the
  };
  update = (x, y) => {
    // this is where we control movement and interactivity
    c.clearRect(0, 0, cvs.width, cvs.height);
    //this clears the whole canvas...
    this.A = [x - (this.width/2), y];
    this.B = [x, y - (this.height - this.width/3)];
    this.C = [x + (this.width/2), y];
    this.D = [x, y + (this.width/3)];

    this.x = x;
    this.y = y;
    this.draw();
  };
  rotate = () => {
    console.log("rotate")

    //distance from old point to new point =
    //sqrt(2d^2 - 2d^2cos(rotation))
    //where d is the distance from old point and new point to the rotate about
    //point




  };

};

var camera = new Camera(window.innerWidth / 2, window.innerHeight / 2, 200, 300);
camera.draw();

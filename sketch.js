

let s1, s2;
let gravity = 9.0;
let mass = 2.0;

function setup() {
  createCanvas(500, 500);
  fill(255, 123);
  ellipse(width/2,height/2,20,20)
  // Inputs: x, y, mass, gravity
  s1 = new Spring2D(0.0, width / 2, mass, gravity);
  s2 = new Spring2D(0.0, width / 2, mass, gravity);
}

function draw() {
  background(189,76,230);

  stroke(255,255,160)
  strokeWeight(15); 
  fill(255,255,127,150); 
  ellipse(width/5,height/5,50,50);

  s1.update(mouseX, mouseY);
  s1.display(mouseX, mouseY);
  s2.update(s1.x, s1.y);
  s2.display(s1.x, s1.y);
}


function Spring2D(xpos, ypos, m, g) {
  this.x = xpos;// The x- and y-coordinates
  this.y = ypos;
  this.vx = 5; // The x- and y-axis velocities
  this.vy = 5;
  this.mass = m;
  this.gravity = g;
  this.radius = 35;
  this.stiffness = 0.1; //Determines how close the circles are when they contract
  this.damping = 0.5; //Determines the trail speed of the bottom circle

  this.update = function(targetX, targetY) {
    let forceX = (targetX - this.x) * this.stiffness;
    let ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;
    let forceY = (targetY - this.y) * this.stiffness;
    forceY += this.gravity;
    let ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;
  }

  this.display = function(nx, ny) {
    stroke(0,0,0);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    stroke(255);
    line(this.x, this.y, nx, ny);
  }

}
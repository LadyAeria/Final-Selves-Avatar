let eyeColor = 0;

let myStars = [];

var xPos = 0;


function setup() {
  createCanvas(500, 500);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  
  eyeColor = random(255);
  
  for (let i = 0; i < 20; i++) {
    let x = random(width*0.075,width*0.925);
    let y = random(height*0.075,height*0.925);
    myStars[i] = new star(x,y);
  }
}

function draw() {
  background(164, 210, 255);
  for (let i = 0;  i < 20; i++) {
    myStars[i].display();
    myStars[i].move();
  }
  
  body();
  ears();
  whiskers();
  body();
  mouth();
  nose();
  eyes();
  blush();

  //click to change the eye color to a random color
  if (mouseIsPressed) eyecolor = color(random(255), random(255), random(255));
}

function body() {
  //body
  fill("#000000");
  noStroke();
  circle(250, 250, 250);
}

function ears() {
  //ears
  noStroke();
  fill("#000000");
  triangle(120, 110, 130, 230, 240, 140);

  noStroke();
  fill("#000000");
  triangle(380, 110, 370, 230, 260, 140);

  //inner ear
  noStroke();
  fill(255, 180, 221);
  triangle(140, 140, 150, 230, 220, 160);

  noStroke();
  fill(255, 180, 221);
  triangle(360, 140, 350, 230, 240, 160);
}

//mic reaction making whiskers go up
function whiskers() {
  //whiskers
  console.log("mic level " + mic.getLevel());
  micLevel = mic.getLevel();
  let y = height - micLevel * height;
  let h = map(micLevel, 0, 1, height, 2);
  
  stroke("#000000");
  line(80, h-200, 210, 260);
  stroke("#000000");
  line(70, h-240, 210, 260);
  stroke("#000000");
  line(80, h-280, 210, 260);

  stroke("#000000");
  line(420, h-200, 290, 260);
  stroke("#000000");
  line(430, h-240, 290, 260);
  stroke("#000000");
  line(420, h-280, 290, 260);
}

function eyes() {
  //eyes
  //(set to random color)
  //framecount makes the eyes continuously jiggle with the value going from -1 to 1
  fill(eyeColor);
  stroke(0, 0, 0);
  strokeWeight(3);
  ellipse(210, 210, 25 + sin(frameCount), 54);
  ellipse(290, 210, 25 + sin(frameCount), 54);

  //(black iris)
  fill(0, 0, 0);
  stroke(0, 0, 0);
  strokeWeight(3);
  ellipse(210, 200, 25 + sin(frameCount), 50);
  ellipse(290, 200, 25 + sin(frameCount), 50);

  //(white iris)
  fill(255, 255, 255);
  stroke(0, 0, 0);
  strokeWeight(2);
  ellipse(210, 193, 25 + sin(frameCount), 35);
  ellipse(290, 193, 25 + sin(frameCount), 35);
}

function mouth() {
  //mouth
  //(left)
  noFill();
  stroke(255, 255, 255);
  arc(235, 233, 35, 60, 0.75, 0.75 * Math.PI);
  //(right)
  noFill();
  stroke(255, 255, 255);
  arc(265, 233, 35, 60, 0.75, 0.75 * Math.PI);
}

function nose() {
  //nose
  noStroke();
  fill("#FFD8E4");
  //fill(236, 181, 211);
  triangle(240, 230, 260, 230, 250, 250);
}

function blush() {
  //conditional if your mouse is hovering over specific area, the blush appears
  if (((mouseX) => 170) && mouseX <= 330 && mouseY <= 235 && mouseY > 200) {
    fill(255, 180, 221);
  } else {
    fill("#000000");
  }
  ellipse(170, 235, 50, 25);
  ellipse(330, 235, 50, 25);
}

//function to make the mouse click work
function mousePressed() {
  eyeColor = color(random(255), random(255), random(255));
}

class star {
  constructor(xpos, ypos){
    this.xpos = xpos;
    this.ypos = ypos;
    this.t = int(random(360));
    this.s = random(-100,100);
  }
  display() {
    push();
    translate(this.xpos, this.ypos);
    rotate(this.t);
    //fill(color(random(250), random(250), random(250)));
    fill(255, 204, 0);
    starShape(0, 0, 30, 50, 5);
    pop();

  }
  //falling stars movement
  move() {
    this.t = this.t + this.s;
    this.star++;
    if (this.ypos <= height *1.3)
      {
        this.ypos+= 2;
      }
    else
      {
        this.ypos = -height * .3;
      }
  }
}

//creates the star shape
function starShape(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
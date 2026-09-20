let n;
let r1 = 200;
let r2 = 100;
function setup() {
  createCanvas(420, 420);
}

function draw() {
  n = parseInt(document.getElementById("n").value);
  background(255);
  translate(210, 210);
  stroke("black");
  strokeWeight(1);
  let points1 = [PI / 2];
  let points2 = [(PI * (n + 2)) / (2 * n)];
  for (let i = 1; i < n; i++) {
    points1.push(points1[i - 1] + (2 * PI) / n);
    points2.push(points2[i - 1] + (2 * PI) / n);
  }
  noStroke();
  fill("red");
  beginShape();
  for (let j = 0; j < points1.length; j++) {
    vertex(r1 * cos(points1[j]), -r1 * sin(points1[j]));
    vertex(r2 * cos(points2[j]), -r2 * sin(points2[j]));
  }
  endShape();
}

function saveStar() {
  console.log("save", n);
  saveCanvas(`star${n}`, "png");
}

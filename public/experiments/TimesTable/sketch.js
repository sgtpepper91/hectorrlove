let slider1;
let slider2;
let x0 = 600;
let y0 = 400;
let r = 400;
let slider2Direction = 0; 

function setup() {
  createCanvas(1000, 800);
  slider1 = createSlider(10, 150, 150, 1);
  slider1.position(10, 10);
  slider2 = createSlider(2, 20, 2, 0.2);
  slider2.position(10, 30);
}

function draw() {
  background(255);
  let N = slider1.value();
  let M = slider2.value();
  M += slider2Direction;
    if (M >= 20 || M <= 2) {
        slider2Direction *= -1;
    }
    slider2.value(M);
  // Mostrar el número de términos
  noStroke();
  fill(0);
  textSize(16);
  text("Módulo: " + N, 170, 20);
  text("Múltiplo: " + M, 170, 35);
  //Dibujar un círculo
  stroke(0);
  strokeWeight(1);
  noFill();
  ellipse(x0, y0, 2 * r, 2 * r);
  //Dibujar los puntos
  for (let i = 0; i < N; i++) {
    let angle = (TWO_PI * i) / N;
    let x = x0 + r * cos(angle);
    let y = y0 + r * sin(angle);
    stroke(0);
    strokeWeight(8);
    point(x, y);
    strokeWeight(1);
    //text(i, x - 15, y + 10);
    //Dibujar las líneas
    for (let j = 0; j < N; j++) {
      let angle2 = (((M * i) % N) * TWO_PI) / N;
      let x1 = x0 + r * cos(angle);
      let y1 = y0 + r * sin(angle);
      let x2 = x0 + r * cos(angle2);
      let y2 = y0 + r * sin(angle2);
      stroke(0, 0, 255);
      strokeWeight(1);
      line(x1, y1, x2, y2);
    }
  }
}

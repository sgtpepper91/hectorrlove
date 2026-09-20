let slider;

function setup() {
  createCanvas(800, 400);
  slider = createSlider(1, 51, 1, 2); // Control para el número de términos (solo impares)
  slider.position(10, 10);
}

function draw() {
  background(255);
  let N = slider.value(); // Número de términos en la serie

  // Dibujar el eje horizontal
  stroke(200);
  line(0, height / 2, width, height / 2);

  // Dibujar la función original (onda cuadrada)
  stroke(0);
  noFill();
  beginShape();
  for (let x = 0; x < width; x++) {
    let t = x / width;
    let y = t <= 0.5 ? 1 : -1;
    vertex(x, map(y, -1.5, 1.5, height, 0));
  }
  endShape();

  // Calcular y dibujar la aproximación de Fourier
  stroke(255, 0, 0);
  beginShape();
  for (let x = 0; x < width; x++) {
    let t = x / width;
    let sum = 0;
    for (let n = 1; n <= N; n += 2) {
      sum += (4 / (Math.PI * n)) * Math.sin(2 * Math.PI * n * t);
    }
    let y = sum;
    vertex(x, map(y, -1.5, 1.5, height, 0));
  }
  endShape();

  // Mostrar el número de términos
  noStroke();
  fill(0);
  textSize(16);
  text("Número de términos: " + N, 170, 20);
}

let size = 680;
let arr1 = [];
let arr2 = [];
let n = 10;
function setup() {
  createCanvas(size, size);
  frameRate(1);
}

function draw() {
  background(220);
  arr1 = [];
  arr2 = [];
  getRandom();
  for (let i = 0; i <= size; i += size / n) {
    for (let j = 0; j <= size; j += size / n) {
      point(i, j);
    }
  }
  drawLines();
}

function getRandom() {
  for (let i = 0; i < n; i++) {
    let num1 = random();
    let num2 = random();
    if (num1 >= 0.5) {
      arr1.push(0);
    } else {
      arr1.push(1);
    }
    if (num2 >= 0.5) {
      arr2.push(0);
    } else {
      arr2.push(1);
    }
  }
}
function drawLines() {
  arr1.forEach((x, i) => {
    if (x === 1) {
      for (let j = 0; j < n; j += 2) {
        line(
          (j * size) / n,
          (i * size) / n,
          ((j + 1) * size) / n,
          (i * size) / n
        );
      }
    } else {
      for (let j = 1; j < n; j += 2) {
        line(
          (j * size) / n,
          (i * size) / n,
          ((j + 1) * size) / n,
          (i * size) / n
        );
      }
    }
  });
  arr2.forEach((x, i) => {
    if (x === 1) {
      for (let j = 0; j < n; j += 2) {
        line(
          (i * size) / n,
          (j * size) / n,
          (i * size) / n,
          ((j + 1) * size) / n
        );
      }
    } else {
      for (let j = 1; j < n; j += 2) {
        line(
          (i * size) / n,
          (j * size) / n,
          (i * size) / n,
          ((j + 1) * size) / n
        );
      }
    }
  });
}

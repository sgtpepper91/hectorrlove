let size = 400
let n = 10;
let k = size / n;
let count = 0;
let total = 0;
function setup() {
  createCanvas(size, 400);
  background(220);
  for(i=0; i<=n; i++) {
    line(0, i*k, size, i*k);
  }
}

function draw() {
  let angle = random(0,PI);
  let x1 = random(0, size);
  let y1 = random(0, size);
  let x2 = x1 + k * cos(angle);
  let y2 = y1 + k * sin(angle);
  if(parseInt(y1/k) !== parseInt(y2/k)){
    stroke("red");
    count++;
  } else {
    stroke("black");
  }
  line(x1,y1, x2,y2);
  total++;
  let app = 2*total/count;
  let error = abs(PI-app)/PI
  console.log(total, count, app, error);
  if(count=== 100)
  noLoop()
  
}
let A;
let B;
let C;
let U;
let sax;
let say;
let sbx;
let sby;
let scx;
let scy;
function setup() {
    createCanvas(600, 600);
    //createCanvas(windowHeight, windowHeight);
    sax = createSlider(-width / 2, width / 2, 0, 10);
    say = createSlider(-height / 2, height / 2, 0, 10);
    sbx = createSlider(-width / 2, width / 2, 0, 10);
    sby = createSlider(-height / 2, height / 2, 0, 10);
    scx = createSlider(-width / 2, width / 2, 0, 10);
    scy = createSlider(-height / 2, height / 2, 0, 10);
    //sax.position(10, 10);
    //noLoop();
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    A = createVector(sax.value(), say.value());
    B = createVector(sbx.value(), sby.value());
    C = createVector(scx.value(), scy.value());
    stroke(255, 0, 0);
    strokeWeight(5);
    point(A.x, A.y);
    point(B.x, B.y);
    point(C.x, C.y);
    stroke(255);
    strokeWeight(1);
    line(A.x, A.y, B.x, B.y);
    line(A.x, A.y, C.x, C.y);
    line(C.x, C.y, B.x, B.y);
    mediatriz(A, B);
    mediatriz(A, C);
    mediatriz(C, B);
    let d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    let ux = ((A.x * A.x + A.y * A.y) * (B.y - C.y) + (B.x * B.x + B.y * B.y) * (C.y - A.y) + (C.x * C.x + C.y * C.y) * (A.y - B.y)) / d;
    let uy = ((A.x * A.x + A.y * A.y) * (C.x - B.x) + (B.x * B.x + B.y * B.y) * (A.x - C.x) + (C.x * C.x + C.y * C.y) * (B.x - A.x)) / d;
    U = createVector(ux, uy);
    stroke(255, 255, 100);
    strokeWeight(5);
    point(U.x, U.y);
    r = dist(A.x, A.y, U.x, U.y);
    noFill();
    strokeWeight(2);
    circle(U.x, U.y, 2 * r);
}

function mediatriz(A, B) {
    let p = createVector((A.x + B.x) / 2, (A.y + B.y) / 2);
    stroke(0, 255, 0);
    strokeWeight(5);
    point(p.x, p.y);
    if (A.x - B.x !== 0) {
        let m = (A.y - B.y) / (A.x - B.x);
        if (m !== 0) {
            m = -1 / m;
            let y1 = m * (-width / 2 - p.x) + p.y;
            let y2 = m * (width / 2 - p.x) + p.y;

            stroke(0, 0, 255);
            strokeWeight(1);
            line(-width / 2, y1, width / 2, y2);
        } else {
            stroke(0, 0, 255);
            strokeWeight(1);
            line(p.x, -height / 2, p.x, height / 2);
        }
    } else {
        stroke(0, 0, 255);
        strokeWeight(1);
        line(-width / 2, p.y, width / 2, p.y);
    }
}



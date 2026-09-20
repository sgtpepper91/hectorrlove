class Ball {
  constructor(x, y, r, angle) {
    this.x = x + r * sin(angle);
    this.y = y - r * cos(angle);
    this.r = r
    this.ax = 0;
    this.ay = 0;
    this.vx = 0;
    this.vy = 0;
  }

  moveLine() {
    let s = sin(tetha);
    let c = cos(tetha);
    this.ax = g * s * c;
    this.ay = g * s * s;
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;
  }

  moveParabola() {
    //console.log(a,b,c);
    let m = 2 * a * this.x + b;
    let angle = atan(m);
    let x1 = -this.r * sin(angle);
    let x2 = width - this.r * sin(angle);
    let y1 = m * (x1 - this.x) + this.y + this.r * cos(angle);
    let y2 = m * (x2 - this.x) + this.y + this.r * cos(angle);
    line(-this.r * sin(angle), y1, width + this.r * sin(angle), y2);
    let s = sin(angle);
    let c = cos(angle);
    this.ax = g * s * c;
    this.ay = g * s * s;
    //console.log(this.ax, this.ay);
    let v = sqrt(this.vx * this.vx + this.vy * this.vy);

    this.vx = v * s * c + this.ax;
    this.vy = v * s * s + this.ay;
    this.x += this.vx;
    this.y += this.vy;
  }
  show() {
    stroke(0);
    circle(this.x, this.y, this.r * 2);
  }


}
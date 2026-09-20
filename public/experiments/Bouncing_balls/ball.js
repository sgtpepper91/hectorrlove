class Ball {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.speedx = 1;
    this.speedy = 0;
    this.maxY = y;
    this.color = color(floor(random(256)), floor(random(256)), floor(random(256)));
    this.stopped = false;
  }
  
  show(){
    fill(this.color);
    circle(this.x, this.y, this.d);
    
  }
  
  move() {
    if(this.speedx !== 0 || this.speedy !== 0 || this.posy !== height - this.d/2)  {
      this.speedy += g;
      if(this.speedx >= -0.0001 && this.speedx <= 0.0001 )       {
        this.speedx = 0;
      } else if(this.y == height - this.d/2) {
        this.speedx += this.speedx > 0 ? -m: m;
      }
      if(this.speedy >= -0.0001 && this.speedy <= 0.0001 )       {
        this.speedy = 0;
      }
      this.x += this.speedx;

      this.y += this.speedy;
      //console.log(this.x, this.speedx);
      if(this.x <= this.d/2 || this.x + this.d/2>= width) {
        this.speedx *= -1;
        if(this.x <= this.d/2) {
          this.x = this.d/2;
        } else {
          this.x = width - this.d/2;
        }
      }

      if(this.y + this.d/2>= height) {
        this.speedy *= -1;
        this.y = height - this.d/2;
      }
    } else if(!this.stopped){
      console.log("stop", counter++, this.speedx, this.speedy, this.x, this.y);
      this.stopped = true;
    }
  }
}


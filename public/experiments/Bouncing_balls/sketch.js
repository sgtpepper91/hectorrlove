(() => {
  let lab,
    count,
    bounce,
    balls,
    accumulator = 0,
    resting;
  function reset() {
    accumulator = 0;
    balls = Array.from({ length: count.value }, (_, i) => ({
      x: 20 + Math.random() * 680,
      y: 20 + Math.random() * 310,
      r: 10 + (i % 3) * 3,
      vx: (Math.random() - 0.5) * 160,
      vy: 0,
      resting: false,
      color: i % 3,
    }));
  }
  window.setup = () => {
    lab = Lab.mount(720, 500);
    count = lab.number("Cantidad de pelotas", 15, 1, 60, 1, reset, {
      integer: true,
      reset: true,
    });
    bounce = lab.number("Rebote", 0.75, 0, 0.95, 0.05, reset, { reset: true });
    lab.animation(reset);
    resting = lab.metric("Pelotas en reposo");
    lab.hint(
      "Un rebote menor disipa más energía. Hay fricción en el suelo. Las pelotas son independientes y no chocan entre sí.",
    );
    reset();
  };
  window.draw = () => {
    accumulator += lab.tick();
    while (accumulator >= 1 / 120) {
      for (const b of balls)
        LabMath.stepBall(b, 1 / 120, bounce.value, 720, 475);
      accumulator -= 1 / 120;
    }
    lab.clear();
    stroke(lab.palette.line);
    line(0, 475, width, 475);
    noStroke();
    for (const b of balls) {
      fill([lab.palette.accent, lab.palette.blue, lab.palette.green][b.color]);
      circle(b.x, b.y, b.r * 2);
    }
    resting(`${balls.filter((b) => b.resting).length} / ${balls.length}`);
  };
})();

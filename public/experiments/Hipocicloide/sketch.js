(() => {
  let lab,
    outer,
    inner,
    helpers = true,
    angle = 0,
    points = [],
    accumulator = 0;
  function reset() {
    inner.max(outer.value - 1);
    angle = 0;
    points = [];
    accumulator = 0;
  }
  window.setup = () => {
    lab = Lab.mount(600, 600);
    outer = lab.number("Radio exterior", 200, 80, 240, 1, reset, {
      reset: true,
    });
    inner = lab.number("Radio interior", 50, 1, 199, 1, reset, { reset: true });
    lab.checkbox("Mostrar círculos auxiliares", true, (v) => {
      helpers = v;
    });
    lab.animation(reset);
    lab.hint(
      "El punto está en el borde de la circunferencia interior. Se conservan hasta 12 000 puntos del trazo.",
    );
  };
  window.draw = () => {
    accumulator += lab.tick();
    const R = outer.value,
      r = inner.value,
      ratio = (R - r) / r;
    while (accumulator >= 1 / 120) {
      angle += 0.6 / 120;
      points.push({
        x: (R - r) * Math.cos(angle) + r * Math.cos(ratio * angle),
        y: (R - r) * Math.sin(angle) - r * Math.sin(ratio * angle),
      });
      accumulator -= 1 / 120;
    }
    if (points.length > 12000) points.splice(0, points.length - 12000);
    lab.clear();
    push();
    translate(300, 300);
    noFill();
    stroke(lab.palette.accent);
    strokeWeight(2);
    beginShape();
    for (const p of points) vertex(p.x, p.y);
    endShape();
    if (helpers) {
      stroke(lab.palette.line);
      strokeWeight(1);
      circle(0, 0, 2 * R);
      const x = (R - r) * Math.cos(angle),
        y = (R - r) * Math.sin(angle);
      stroke(lab.palette.blue);
      circle(x, y, 2 * r);
      if (points.length) {
        const p = points[points.length - 1];
        line(x, y, p.x, p.y);
        noStroke();
        fill(lab.palette.accent);
        circle(p.x, p.y, 9);
      }
    }
    pop();
  };
})();

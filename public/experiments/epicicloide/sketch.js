(() => {
  let lab;
  let outer;
  let inner;
  let pointDistance;
  let helpers = true;
  let angle = 0;
  let points = [];
  let accumulator = 0;

  function reset() {
    inner.max(outer.value);
    angle = 0;
    points = [];
    accumulator = 0;
  }

  window.setup = () => {
    lab = Lab.mount(600, 600);
    outer = lab.number("Radio exterior", 200, 80, 240, 1, reset, { reset: true });
    inner = lab.number("Radio interior", 80, 1, 199, 1, reset, { reset: true });
    pointDistance = lab.number(
      "Distancia del punto al centro del círculo pequeño",
      1, 0, 1, 0.05, reset, { reset: true },
    );
    lab.checkbox("Mostrar círculos auxiliares", true, (value) => { helpers = value; });
    lab.animation(reset);
    lab.legend([["Círculo fijo", "line"], ["Círculo móvil", "blue"], ["Epicicloide", "accent"]]);
    lab.hint("El círculo pequeño rueda por fuera del círculo fijo. El punto puede estar entre su centro y su borde; se conservan hasta 12 000 puntos del trazo.");
    reset();
  };

  window.draw = () => {
    accumulator += lab.tick();
    const radius = outer.value;
    const rollingRadius = inner.value;
    const pointRadius = rollingRadius * pointDistance.value;
    const ratio = (radius + rollingRadius) / rollingRadius;
    while (accumulator >= 1 / 120) {
      angle -= (0.6 * Math.PI) / 120;
      const centerX = (radius + rollingRadius) * Math.cos(angle);
      const centerY = (radius + rollingRadius) * Math.sin(angle);
      points.push({
        x: centerX + pointRadius * Math.cos(ratio * angle + Math.PI),
        y: centerY + pointRadius * Math.sin(ratio * angle + Math.PI),
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
    for (const point of points) vertex(point.x, point.y);
    endShape();
    const centerX = (radius + rollingRadius) * Math.cos(angle);
    const centerY = (radius + rollingRadius) * Math.sin(angle);
    const currentPoint = points.at(-1);
    if (helpers) {
      stroke(lab.palette.line); strokeWeight(1); circle(0, 0, radius * 2);
      stroke(lab.palette.blue); circle(centerX, centerY, rollingRadius * 2);
      if (currentPoint) line(centerX, centerY, currentPoint.x, currentPoint.y);
      noStroke(); fill(lab.palette.accent);
      circle(currentPoint?.x ?? centerX, currentPoint?.y ?? centerY, 9);
    }
    pop();
    lab.status(`Radio exterior: ${radius} · Radio interior: ${rollingRadius} · Distancia del punto: ${pointDistance.value.toFixed(2)} radios`);
  };
})();

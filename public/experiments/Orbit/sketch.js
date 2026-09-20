(() => {
  let lab,
    central,
    small,
    velocity,
    body,
    points = [],
    accumulator = 0,
    distance,
    speed;
  const mu = 2000000;
  function reset() {
    body = { x: 0, y: -180, vx: velocity.value, vy: 0, impact: false };
    points = [];
    accumulator = 0;
  }
  window.setup = () => {
    lab = Lab.mount(640, 640);
    central = lab.number("Radio del cuerpo central", 30, 10, 80, 1, reset, {
      reset: true,
    });
    small = lab.number("Radio del objeto", 8, 3, 25, 1, reset, { reset: true });
    velocity = lab.number(
      "Velocidad tangencial inicial",
      100,
      0,
      200,
      1,
      reset,
      { reset: true },
    );
    lab.animation(reset);
    distance = lab.metric("Distancia al centro");
    speed = lab.metric("Velocidad actual");
    lab.legend([
      ["Cuerpo central", "accent"],
      ["Objeto y trayectoria", "blue"],
    ]);
    lab.hint(
      "Unidades de simulación. Los radios cambian el contacto, no la masa. La atracción central permanece fija. La vista se aleja si el objeto se escapa; se guardan hasta 3 000 puntos.",
    );
    reset();
  };
  window.draw = () => {
    accumulator += lab.tick();
    while (accumulator >= 1 / 240) {
      LabMath.stepOrbit(body, 1 / 240, mu, central.value + small.value);
      accumulator -= 1 / 240;
    }
    if (!lab.paused && !document.hidden && !body.impact)
      points.push({ x: body.x, y: body.y });
    if (points.length > 3000) points.shift();
    const viewScale =
      280 / Math.max(280, Math.abs(body.x) + 30, Math.abs(body.y) + 30);
    lab.clear();
    push();
    translate(320, 320);
    scale(viewScale);
    noFill();
    stroke(lab.palette.blue);
    strokeWeight(1 / viewScale);
    beginShape();
    for (const p of points) vertex(p.x, p.y);
    endShape();
    noStroke();
    fill(lab.palette.accent);
    circle(0, 0, central.value * 2);
    fill(lab.palette.blue);
    circle(body.x, body.y, small.value * 2);
    pop();
    distance(Math.hypot(body.x, body.y).toFixed(1));
    speed(Math.hypot(body.vx, body.vy).toFixed(1));
    lab.status(
      body.impact
        ? "Impacto. El objeto alcanzó la superficie. Reinicia para explorar otra trayectoria."
        : "El cuerpo central permanece fijo.",
    );
  };
})();

(() => {
  let lab, points;
  function regenerate() {
    const a = Math.random() * Math.PI * 2,
      b = a + 0.5 + Math.random() * 1.5,
      c = b + 0.4 + Math.random() * 0.7,
      d = c + 0.5 + Math.random();
    points = [a, b, c, d].map((angle) => ({
      x: 240 * Math.cos(angle),
      y: 240 * Math.sin(angle),
    }));
  }
  window.setup = () => {
    lab = Lab.mount(600, 600);
    lab.button("Generar nuevos puntos", regenerate, true);
    lab.legend([
      ["Puntos", "ink"],
      ["Cuerdas", "accent"],
      ["Mediatrices", "blue"],
      ["Centro", "green"],
    ]);
    lab.hint(
      "Cada mediatriz pasa por el punto medio de una cuerda y forma un ángulo recto con ella. Su intersección es el centro.",
    );
    regenerate();
  };
  window.draw = () => {
    lab.clear();
    push();
    translate(300, 300);
    noFill();
    stroke(lab.palette.line);
    circle(0, 0, 480);
    for (let i = 0; i < 4; i += 2) {
      const a = points[i],
        b = points[i + 1],
        m = LabMath.bisector(a, b);
      stroke(lab.palette.accent);
      strokeWeight(2);
      line(a.x, a.y, b.x, b.y);
      stroke(lab.palette.blue);
      strokeWeight(1.5);
      line(
        m.x - m.dx * 700,
        m.y - m.dy * 700,
        m.x + m.dx * 700,
        m.y + m.dy * 700,
      );
    }
    noStroke();
    fill(lab.palette.ink);
    for (const p of points) circle(p.x, p.y, 9);
    fill(lab.palette.green);
    circle(0, 0, 12);
    pop();
  };
})();

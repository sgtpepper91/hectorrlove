(() => {
  let lab,
    controls = [],
    position,
    radius;
  window.setup = () => {
    lab = Lab.mount(640, 640);
    for (const [name, x, y] of [
      ["A", -180, 140],
      ["B", 160, 120],
      ["C", -20, -180],
    ]) {
      const parent = lab.group(`Vértice ${name}`);
      controls.push({
        name,
        x: lab.number(`${name} · X`, x, -250, 250, 10, () => {}, { parent }),
        y: lab.number(`${name} · Y`, y, -250, 250, 10, () => {}, { parent }),
      });
    }
    position = lab.metric("Circuncentro (X, Y)");
    radius = lab.metric("Radio");
    lab.legend([
      ["Triángulo", "ink"],
      ["Mediatrices", "blue"],
      ["Circuncentro y circunferencia", "accent"],
    ]);
    lab.hint(
      "Las coordenadas usan el centro del lienzo como origen, con Y positiva hacia arriba. Mueve los vértices para explorar triángulos distintos.",
    );
  };
  window.draw = () => {
    const points = controls.map((c) => ({ x: c.x.value, y: c.y.value })),
      center = LabMath.circumcenter(...points);
    lab.clear();
    push();
    translate(320, 320);
    scale(1, -1);
    noFill();
    stroke(lab.palette.line);
    line(-320, 0, 320, 0);
    line(0, -320, 0, 320);
    if (center) {
      stroke(lab.palette.accent);
      circle(center.x, center.y, center.r * 2);
    }
    for (let i = 0; i < 3; i++) {
      const a = points[i],
        b = points[(i + 1) % 3],
        m = LabMath.bisector(a, b);
      if (m) {
        stroke(lab.palette.blue);
        strokeWeight(1);
        line(
          m.x - 900 * m.dx,
          m.y - 900 * m.dy,
          m.x + 900 * m.dx,
          m.y + 900 * m.dy,
        );
      }
      stroke(lab.palette.ink);
      strokeWeight(2);
      line(a.x, a.y, b.x, b.y);
    }
    noStroke();
    fill(lab.palette.ink);
    for (const p of points) circle(p.x, p.y, 10);
    if (center) {
      fill(lab.palette.accent);
      circle(center.x, center.y, 12);
    }
    pop();
    fill(lab.palette.ink);
    textSize(16);
    noStroke();
    points.forEach((p, i) => text(controls[i].name, 332 + p.x, 313 - p.y));
    position(
      center ? `${center.x.toFixed(1)}, ${center.y.toFixed(1)}` : "No definido",
    );
    radius(center ? center.r.toFixed(1) : "—");
    lab.status(
      center
        ? "Las tres distancias desde el circuncentro a los vértices son iguales."
        : "Los vértices coinciden o están alineados. No existe una circunferencia única.",
    );
  };
})();

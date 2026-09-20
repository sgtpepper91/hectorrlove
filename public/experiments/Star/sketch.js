(() => {
  let lab, vertices, jump;
  window.setup = () => {
    lab = Lab.mount(600, 600);
    vertices = lab.number(
      "Vértices (p)",
      5,
      3,
      120,
      1,
      () => jump.max(vertices.value - 1),
      { integer: true },
    );
    jump = lab.number("Salto (q)", 2, 1, 4, 1, () => {}, { integer: true });
    lab.button(
      "Descargar PNG",
      () => lab.download(`poligono-${vertices.value}-${jump.value}`),
      true,
    );
    lab.hint(
      "p reparte los vértices sobre la circunferencia; q indica cuántos avanzas en cada conexión. Si comparten divisores, aparecen varios recorridos.",
    );
  };
  window.draw = () => {
    lab.clear();
    const p = vertices.value,
      q = jump.value;
    push();
    translate(300, 300);
    stroke(lab.palette.line);
    noFill();
    circle(0, 0, 480);
    stroke(lab.palette.accent);
    strokeWeight(2);
    for (let i = 0; i < p; i++) {
      const a = (2 * Math.PI * i) / p - Math.PI / 2,
        b = (2 * Math.PI * ((i + q) % p)) / p - Math.PI / 2;
      line(
        240 * Math.cos(a),
        240 * Math.sin(a),
        240 * Math.cos(b),
        240 * Math.sin(b),
      );
    }
    noStroke();
    fill(lab.palette.ink);
    for (let i = 0; i < p; i++)
      circle(
        240 * Math.cos((2 * Math.PI * i) / p - Math.PI / 2),
        240 * Math.sin((2 * Math.PI * i) / p - Math.PI / 2),
        5,
      );
    pop();
  };
})();

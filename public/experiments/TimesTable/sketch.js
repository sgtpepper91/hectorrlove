(() => {
  let lab, count, multiplier;
  window.setup = () => {
    lab = Lab.mount(640, 640);
    count = lab.number("Cantidad de puntos", 150, 10, 300, 1, () => {}, {
      integer: true,
    });
    multiplier = lab.number("Multiplicador", 2, 0, 20, 0.1);
    lab.hint(
      "El punto i se conecta con (multiplicador × i) módulo N. Con multiplicador 2 aparece la envolvente de una cardioide.",
    );
  };
  window.draw = () => {
    lab.clear();
    push();
    translate(320, 320);
    noFill();
    stroke(lab.palette.line);
    circle(0, 0, 540);
    stroke(lab.palette.blue);
    for (let i = 0; i < count.value; i++) {
      const a = (2 * Math.PI * i) / count.value,
        b =
          (2 * Math.PI * ((i * multiplier.value) % count.value)) / count.value;
      line(
        270 * Math.cos(a),
        270 * Math.sin(a),
        270 * Math.cos(b),
        270 * Math.sin(b),
      );
    }
    noStroke();
    fill(lab.palette.ink);
    for (let i = 0; i < count.value; i++)
      circle(
        270 * Math.cos((2 * Math.PI * i) / count.value),
        270 * Math.sin((2 * Math.PI * i) / count.value),
        3,
      );
    pop();
  };
})();

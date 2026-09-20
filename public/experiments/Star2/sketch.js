(() => {
  let lab, count, ratio;
  window.setup = () => {
    lab = Lab.mount(600, 600);
    count = lab.number("Puntas", 5, 3, 60, 1, () => {}, { integer: true });
    ratio = lab.number("Proporción del radio interior", 0.5, 0.1, 0.9, 0.05);
    lab.button(
      "Descargar PNG",
      () => lab.download(`estrella-${count.value}`),
      true,
    );
    lab.hint(
      "La proporción compara el radio interior con el exterior. Un valor pequeño produce puntas más largas.",
    );
  };
  window.draw = () => {
    lab.clear();
    push();
    translate(300, 300);
    noStroke();
    fill(lab.palette.accent);
    beginShape();
    for (let i = 0; i < count.value * 2; i++) {
      const a = (Math.PI * i) / count.value - Math.PI / 2,
        r = i % 2 ? 240 * ratio.value : 240;
      vertex(r * Math.cos(a), r * Math.sin(a));
    }
    endShape(CLOSE);
    pop();
  };
})();

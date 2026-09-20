(() => {
  let lab,
    density,
    horizontal,
    vertical,
    elapsed = 0;
  function regenerate() {
    horizontal = Array.from({ length: density.value + 1 }, () =>
      Math.random() < 0.5 ? 0 : 1,
    );
    vertical = Array.from({ length: density.value + 1 }, () =>
      Math.random() < 0.5 ? 0 : 1,
    );
    elapsed = 0;
  }
  window.setup = () => {
    lab = Lab.mount(640, 640);
    density = lab.number(
      "Divisiones de la cuadrícula",
      10,
      4,
      40,
      1,
      regenerate,
      { integer: true },
    );
    lab.animation();
    lab.button("Generar otro patrón", regenerate);
    lab.hint(
      "Cada segundo aparece una combinación nueva. Pausa para observarla o genera otra manualmente.",
    );
    regenerate();
  };
  window.draw = () => {
    elapsed += lab.tick();
    if (elapsed >= 1) regenerate();
    lab.clear();
    const step = 560 / density.value;
    stroke(lab.palette.line);
    strokeWeight(3);
    for (let i = 0; i <= density.value; i++)
      for (let j = 0; j <= density.value; j++)
        point(40 + i * step, 40 + j * step);
    strokeWeight(2);
    for (let i = 0; i <= density.value; i++) {
      stroke(lab.palette.blue);
      for (let j = horizontal[i]; j < density.value; j += 2)
        line(40 + j * step, 40 + i * step, 40 + (j + 1) * step, 40 + i * step);
      stroke(lab.palette.accent);
      for (let j = vertical[i]; j < density.value; j += 2)
        line(40 + i * step, 40 + j * step, 40 + i * step, 40 + (j + 1) * step);
    }
  };
})();

(() => {
  let lab, terms, harmonic;
  window.setup = () => {
    lab = Lab.mount(800, 480);
    terms = lab.number("Número de términos", 1, 1, 26, 1, () => {}, {
      integer: true,
    });
    harmonic = lab.metric("Último armónico");
    lab.legend([
      ["Onda cuadrada", "muted"],
      ["Aproximación de Fourier", "accent"],
    ]);
    lab.hint(
      "Cada término añade un armónico impar: 1, 3, 5… Las oscilaciones cerca de los saltos son el fenómeno de Gibbs.",
    );
  };
  window.draw = () => {
    lab.clear();
    stroke(lab.palette.line);
    line(40, 240, 760, 240);
    noFill();
    strokeWeight(2);
    stroke(lab.palette.muted);
    beginShape();
    vertex(40, 90);
    vertex(400, 90);
    vertex(400, 390);
    vertex(760, 390);
    endShape();
    stroke(lab.palette.accent);
    beginShape();
    for (let x = 0; x <= 720; x++)
      vertex(40 + x, 240 - 150 * LabMath.fourier(x / 720, terms.value));
    endShape();
    harmonic(2 * terms.value - 1);
  };
})();

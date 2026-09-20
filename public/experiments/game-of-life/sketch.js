(() => {
  const cols = 48,
    rows = 32,
    cell = 15;
  let lab,
    speed,
    board,
    generation = 0,
    elapsed = 0,
    genMetric,
    living;
  function reset() {
    board = Uint8Array.from({ length: cols * rows }, () =>
      Math.random() < 0.3 ? 1 : 0,
    );
    generation = 0;
    elapsed = 0;
  }
  function advance() {
    board = LabMath.lifeStep(board, cols, rows);
    generation++;
  }
  window.setup = () => {
    lab = Lab.mount(720, 480);
    speed = lab.number("Generaciones por segundo", 8, 1, 30, 1);
    lab.animation();
    lab.button("Avanzar una generación", () => {
      lab.setPaused(true);
      elapsed = 0;
      advance();
    });
    lab.button("Nueva población", reset);
    genMetric = lab.metric("Generación");
    living = lab.metric("Células vivas");
    lab.hint(
      "Una célula nace con tres vecinas; sobrevive con dos o tres. Los bordes no se conectan entre sí. Avanzar una generación pausa la animación.",
    );
    reset();
  };
  window.draw = () => {
    elapsed += lab.tick();
    while (elapsed >= 1 / speed.value) {
      advance();
      elapsed -= 1 / speed.value;
    }
    lab.clear();
    noStroke();
    fill(lab.palette.blue);
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++)
        if (board[y * cols + x])
          rect(x * cell + 1, y * cell + 1, cell - 2, cell - 2);
    genMetric(generation);
    living(board.reduce((a, b) => a + b, 0));
  };
})();

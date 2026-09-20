(() => {
  let lab,
    horizontal,
    drop,
    model,
    elapsed = 0,
    running = false,
    start,
    lineTime,
    cycleTime,
    clock;
  function reset() {
    model = LabMath.brachistochrone(horizontal.value, drop.value);
    elapsed = 0;
    running = false;
    if (start) start.disabled = false;
  }
  window.setup = () => {
    lab = Lab.mount(720, 520);
    horizontal = lab.number("Separación horizontal", 6, 1, 10, 0.5, reset, {
      unit: "m",
      reset: true,
    });
    drop = lab.number("Desnivel", 3, 1, 6, 0.5, reset, {
      unit: "m",
      reset: true,
    });
    start = lab.button(
      "Iniciar descenso",
      () => {
        elapsed = 0;
        running = true;
        lab.setPaused(false);
        start.disabled = true;
      },
      true,
    );
    lab.animation(() => {
      reset();
      lab.setPaused(false);
    });
    lineTime = lab.metric("Tiempo por la recta");
    cycleTime = lab.metric("Tiempo por la cicloide");
    clock = lab.metric("Tiempo transcurrido");
    lab.legend([
      ["Recta", "blue"],
      ["Cicloide", "accent"],
    ]);
    lab.hint(
      "Ambas partículas salen del reposo, sin fricción, con gravedad de 9.81 m/s². El tamaño dibujado no interviene en el movimiento.",
    );
    reset();
  };
  window.draw = () => {
    const dt = lab.tick();
    if (running) elapsed = Math.min(model.lineTime, elapsed + dt);
    if (elapsed >= model.lineTime) {
      running = false;
      start.disabled = false;
    }
    const scale = Math.min(
      600 / model.dx,
      390 / Math.max(model.dy, 2 * model.a),
    );
    lab.clear();
    push();
    translate(50, 45);
    noFill();
    strokeWeight(2);
    stroke(lab.palette.blue);
    line(0, 0, model.dx * scale, model.dy * scale);
    stroke(lab.palette.accent);
    beginShape();
    for (let i = 0; i <= 180; i++) {
      const p = LabMath.descentPosition(
        model,
        (model.cycleTime * i) / 180,
        true,
      );
      vertex(p.x * scale, p.y * scale);
    }
    endShape();
    for (const curved of [false, true]) {
      const p = LabMath.descentPosition(model, elapsed, curved);
      noStroke();
      fill(curved ? lab.palette.accent : lab.palette.blue);
      circle(p.x * scale, p.y * scale, curved ? 16 : 10);
    }
    pop();
    lineTime(`${model.lineTime.toFixed(3)} s`);
    cycleTime(`${model.cycleTime.toFixed(3)} s`);
    clock(`${elapsed.toFixed(2)} s`);
    lab.status(
      elapsed >= model.cycleTime
        ? `La cicloide llega primero: ${(model.lineTime - model.cycleTime).toFixed(3)} s antes que la recta.`
        : running
          ? "Descenso en curso."
          : "Pulsa «Iniciar descenso» para comparar los recorridos.",
    );
  };
})();

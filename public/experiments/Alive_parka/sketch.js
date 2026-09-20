(() => {
  let lab,
    speed,
    needles = [],
    total = 0,
    crosses = 0,
    budget = 0,
    launched,
    hits,
    estimate,
    error;
  function reset() {
    needles = [];
    total = crosses = budget = 0;
  }
  window.setup = () => {
    lab = Lab.mount(720, 480);
    speed = lab.number("Lanzamientos por segundo", 60, 10, 600, 10);
    lab.animation(reset);
    launched = lab.metric("Lanzamientos");
    hits = lab.metric("Cruces");
    estimate = lab.metric("Aproximación de π");
    error = lab.metric("Error relativo");
    lab.legend([
      ["Cruza una línea", "accent"],
      ["No cruza", "blue"],
    ]);
    lab.hint(
      "La aguja mide lo mismo que la separación entre líneas. Se estima π = 2 × lanzamientos / cruces. Se muestran los últimos 2 000 trazos; todos cuentan en los resultados.",
    );
  };
  window.draw = () => {
    budget += lab.tick() * speed.value;
    while (budget >= 1) {
      const needle = LabMath.buffonNeedle(Math.random, 720, 480, 40);
      needles.push(needle);
      total++;
      crosses += Number(needle.crosses);
      budget--;
    }
    if (needles.length > 2000) needles.splice(0, needles.length - 2000);
    lab.clear();
    stroke(lab.palette.line);
    for (let y = 0; y <= height; y += 40) line(0, y, width, y);
    for (const n of needles) {
      stroke(n.crosses ? lab.palette.accent : lab.palette.blue);
      line(n.x1, n.y1, n.x2, n.y2);
    }
    launched(total.toLocaleString("es-MX"));
    hits(crosses.toLocaleString("es-MX"));
    estimate(
      crosses ? ((2 * total) / crosses).toFixed(6) : "Sin cruces todavía",
    );
    error(
      crosses
        ? `${((Math.abs((2 * total) / crosses - Math.PI) / Math.PI) * 100).toFixed(3)} %`
        : "—",
    );
  };
})();

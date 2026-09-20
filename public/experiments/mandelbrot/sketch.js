(() => {
  let lab,
    real,
    imaginary,
    c = { re: 0.285, im: -0.01 },
    juliaWorker,
    mandelbrotWorker,
    julia,
    mandelbrot,
    pending = 0,
    parameter,
    juliaSave,
    mandelbrotSave;
  const size = 380,
    left = 20,
    right = 440,
    top = 60;
  function render(mode) {
    if (mode === "julia") {
      if (juliaWorker) juliaWorker.terminate();
      juliaSave.disabled = true;
    } else {
      if (mandelbrotWorker) mandelbrotWorker.terminate();
      mandelbrotSave.disabled = true;
    }
    const worker = new Worker("fractal-worker.js");
    if (mode === "julia") juliaWorker = worker;
    else mandelbrotWorker = worker;
    const request = mode === "julia" ? ++pending : 0;
    lab.status("Calculando los fractales… Puedes seleccionar otro punto.");
    worker.onmessage = ({ data }) => {
      if (mode === "julia" && request !== pending) return;
      const canvas = document.createElement("canvas");
      canvas.width = data.width;
      canvas.height = data.height;
      canvas
        .getContext("2d")
        .putImageData(
          new ImageData(data.pixels, data.width, data.height),
          0,
          0,
        );
      if (mode === "julia") {
        julia = canvas;
        juliaSave.disabled = false;
      } else {
        mandelbrot = canvas;
        mandelbrotSave.disabled = false;
      }
      worker.terminate();
      if (julia && mandelbrot && !juliaSave.disabled)
        lab.status(
          "Selecciona un punto de Mandelbrot o cambia las coordenadas para explorar Julia.",
        );
    };
    worker.onerror = () => {
      worker.terminate();
      lab.status(
        "No se pudo calcular el fractal. Recarga la página para reintentar.",
      );
    };
    worker.postMessage({ mode, ...c, width: size, height: size });
  }
  function update() {
    c = { re: real.value, im: imaginary.value };
    render("julia");
  }
  function download(canvas, filename) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
  window.setup = () => {
    lab = Lab.mount(840, 470);
    real = lab.number("Parte real de c", c.re, -2, 2, 0.001, update);
    imaginary = lab.number("Parte imaginaria de c", c.im, -2, 2, 0.001, update);
    mandelbrotSave = lab.button("Descargar Mandelbrot", () =>
      download(mandelbrot, "mandelbrot.png"),
    );
    juliaSave = lab.button("Descargar Julia", () =>
      download(julia, `julia-${c.re}-${c.im}.png`),
    );
    parameter = lab.metric("Parámetro seleccionado (c)");
    lab.hint(
      "Toca el panel izquierdo para elegir c. Los controles permiten la misma selección con teclado. Cada panel representa de −2 a 2 en ambos ejes.",
    );
    lab.canvas.addEventListener("click", (event) => {
      const p = lab.point(event);
      if (p.x < left || p.x > left + size || p.y < top || p.y > top + size)
        return;
      real.set(-2 + (4 * (p.x - left)) / (size - 1));
      imaginary.set(2 - (4 * (p.y - top)) / (size - 1));
      update();
    });
    render("mandelbrot");
    render("julia");
  };
  window.draw = () => {
    lab.clear();
    noStroke();
    fill(lab.palette.ink);
    textSize(20);
    text("Mandelbrot", left, 34);
    text("Julia", right, 34);
    if (mandelbrot) drawingContext.drawImage(mandelbrot, left, top);
    if (julia) drawingContext.drawImage(julia, right, top);
    if (mandelbrot) {
      const x = left + ((c.re + 2) / 4) * (size - 1),
        y = top + ((2 - c.im) / 4) * (size - 1);
      noFill();
      stroke("#fff");
      strokeWeight(2);
      circle(x, y, 10);
      stroke("#171718");
      strokeWeight(1);
      circle(x, y, 14);
    }
    parameter(
      `${c.re.toFixed(3)} ${c.im < 0 ? "−" : "+"} ${Math.abs(c.im).toFixed(3)}i`,
    );
  };
})();

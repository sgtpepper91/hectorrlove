self.onmessage = ({ data: { mode, re, im, width, height } }) => {
  const pixels = new Uint8ClampedArray(width * height * 4),
    iterations = 150;
  for (let py = 0; py < height; py++)
    for (let px = 0; px < width; px++) {
      const x = -2 + (4 * px) / (width - 1),
        y = 2 - (4 * py) / (height - 1);
      let zx = mode === "julia" ? x : 0,
        zy = mode === "julia" ? y : 0;
      const cx = mode === "julia" ? re : x,
        cy = mode === "julia" ? im : y;
      let n = 0;
      while (zx * zx + zy * zy <= 4 && n < iterations) {
        const nextX = zx * zx - zy * zy + cx;
        zy = 2 * zx * zy + cy;
        zx = nextX;
        n++;
      }
      const index = (py * width + px) * 4;
      if (n < iterations) {
        const t = Math.min(1, n / 45);
        pixels[index] = Math.round(35 + 220 * Math.sqrt(t));
        pixels[index + 1] = Math.round(35 + 175 * t * t);
        pixels[index + 2] = Math.round(90 + 160 * (1 - t));
      }
      pixels[index + 3] = 255;
    }
  self.postMessage({ pixels, width, height }, [pixels.buffer]);
};

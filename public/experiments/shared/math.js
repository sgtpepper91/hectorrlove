/* Pure models shared by the sketches and their regression tests. */
(function (root) {
  const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
  const crossesLine = (y1, y2, spacing) =>
    Math.floor(y1 / spacing) !== Math.floor(y2 / spacing);
  function buffonNeedle(random, width, height, spacing) {
    const x = random() * width,
      y = random() * height,
      angle = random() * Math.PI;
    const dx = (spacing * Math.cos(angle)) / 2,
      dy = (spacing * Math.sin(angle)) / 2;
    return {
      x1: x - dx,
      y1: y - dy,
      x2: x + dx,
      y2: y + dy,
      crosses: crossesLine(y - dy, y + dy, spacing),
    };
  }
  function stepBall(ball, dt, restitution, width, floor) {
    if (ball.resting) return;
    const gravity = 500;
    ball.vy += gravity * dt;
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    if (ball.x < ball.r || ball.x > width - ball.r) {
      ball.x = clamp(ball.x, ball.r, width - ball.r);
      ball.vx = -ball.vx * restitution;
    }
    if (ball.y >= floor - ball.r) {
      ball.y = floor - ball.r;
      ball.vy = -Math.abs(ball.vy) * restitution;
      if (Math.abs(ball.vy) < 16) ball.vy = 0;
      ball.vx *= Math.exp(-8 * dt);
      if (ball.vy === 0 && Math.abs(ball.vx) < 2) {
        ball.vx = 0;
        ball.resting = true;
      }
    }
  }
  function brachistochrone(dx, dy, g = 9.81) {
    if (!(dx > 0 && dy > 0 && g > 0))
      throw new RangeError(
        "Los extremos deben tener separación y desnivel positivos.",
      );
    let low = 0.00001,
      high = 2 * Math.PI - 0.00001;
    for (let i = 0; i < 80; i++) {
      const theta = (low + high) / 2;
      if ((theta - Math.sin(theta)) / (1 - Math.cos(theta)) < dx / dy)
        low = theta;
      else high = theta;
    }
    const theta = (low + high) / 2,
      a = dy / (1 - Math.cos(theta));
    return {
      dx,
      dy,
      g,
      a,
      theta,
      cycleTime: theta * Math.sqrt(a / g),
      lineTime: Math.sqrt((2 * (dx * dx + dy * dy)) / (g * dy)),
    };
  }
  function descentPosition(model, t, cycloid) {
    if (cycloid) {
      const angle = Math.min(
        model.theta,
        Math.max(0, t) * Math.sqrt(model.g / model.a),
      );
      return {
        x: model.a * (angle - Math.sin(angle)),
        y: model.a * (1 - Math.cos(angle)),
      };
    }
    const fraction = Math.min(1, (Math.max(0, t) / model.lineTime) ** 2);
    return { x: model.dx * fraction, y: model.dy * fraction };
  }
  function segmentContact(ax, ay, bx, by, radius) {
    const dx = bx - ax,
      dy = by - ay,
      a = dx * dx + dy * dy;
    if (ax * ax + ay * ay <= radius * radius) return 0;
    if (a === 0) return null;
    const b = 2 * (ax * dx + ay * dy),
      c = ax * ax + ay * ay - radius * radius;
    const disc = b * b - 4 * a * c;
    if (disc < 0) return null;
    const t = (-b - Math.sqrt(disc)) / (2 * a);
    return t >= 0 && t <= 1 ? t : null;
  }
  function stepOrbit(body, dt, mu, contactRadius) {
    if (body.impact) return;
    const r = Math.hypot(body.x, body.y);
    if (r <= contactRadius) {
      body.impact = true;
      return;
    }
    const ax = (-mu * body.x) / r ** 3,
      ay = (-mu * body.y) / r ** 3;
    const x = body.x + body.vx * dt + (ax * dt * dt) / 2;
    const y = body.y + body.vy * dt + (ay * dt * dt) / 2;
    const hit = segmentContact(body.x, body.y, x, y, contactRadius);
    if (hit !== null) {
      body.x += (x - body.x) * hit;
      body.y += (y - body.y) * hit;
      body.vx = 0;
      body.vy = 0;
      body.impact = true;
      return;
    }
    const nextR = Math.hypot(x, y);
    body.vx += ((ax - (mu * x) / nextR ** 3) * dt) / 2;
    body.vy += ((ay - (mu * y) / nextR ** 3) * dt) / 2;
    body.x = x;
    body.y = y;
  }
  function circumcenter(a, b, c) {
    const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
    if (Math.abs(d) < 1e-8) return null;
    const aa = a.x * a.x + a.y * a.y,
      bb = b.x * b.x + b.y * b.y,
      cc = c.x * c.x + c.y * c.y;
    const x = (aa * (b.y - c.y) + bb * (c.y - a.y) + cc * (a.y - b.y)) / d;
    const y = (aa * (c.x - b.x) + bb * (a.x - c.x) + cc * (b.x - a.x)) / d;
    return { x, y, r: Math.hypot(x - a.x, y - a.y) };
  }
  function bisector(a, b) {
    const dx = b.x - a.x,
      dy = b.y - a.y,
      length = Math.hypot(dx, dy);
    if (length < 1e-10) return null;
    return {
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
      dx: -dy / length,
      dy: dx / length,
    };
  }
  function fourier(t, terms) {
    let y = 0;
    for (let k = 0; k < terms; k++) {
      const n = 2 * k + 1;
      y += (4 * Math.sin(2 * Math.PI * n * t)) / (Math.PI * n);
    }
    return y;
  }
  function lifeStep(board, cols, rows) {
    const next = new Uint8Array(board.length);
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx,
              ny = y + dy;
            if ((dx || dy) && nx >= 0 && nx < cols && ny >= 0 && ny < rows)
              count += board[ny * cols + nx];
          }
        next[y * cols + x] =
          count === 3 || (count === 2 && board[y * cols + x]) ? 1 : 0;
      }
    return next;
  }
  root.LabMath = {
    clamp,
    crossesLine,
    buffonNeedle,
    stepBall,
    brachistochrone,
    descentPosition,
    segmentContact,
    stepOrbit,
    circumcenter,
    bisector,
    fourier,
    lifeStep,
  };
})(globalThis);

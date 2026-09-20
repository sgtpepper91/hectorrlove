import test from "node:test";
import assert from "node:assert/strict";
import "../public/experiments/shared/math.js";
const M = globalThis.LabMath;
const near = (actual, expected, tolerance = 1e-8) =>
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${actual} != ${expected}`,
  );

test("Buffon handles negative coordinates and no crossing", () => {
  assert.equal(M.crossesLine(-5, 5, 40), true);
  assert.equal(M.crossesLine(-39, -1, 40), false);
  assert.equal(M.crossesLine(39, 41, 40), true);
  assert.equal(M.crossesLine(1, 39, 40), false);
});
test("Buffon seeded sampling converges to pi without boundary bias", () => {
  let seed = 7341,
    hits = 0;
  const random = () =>
    (seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296;
  for (let i = 0; i < 100000; i++)
    hits += Number(M.buffonNeedle(random, 720, 480, 40).crosses);
  near(200000 / hits, Math.PI, 0.025);
});
test("Floor and wall rebounds dissipate kinetic energy", () => {
  const ball = { x: 89, y: 89, r: 10, vx: 100, vy: 100, resting: false };
  M.stepBall(ball, 0.02, 0.5, 100, 100);
  near(ball.x, 90);
  near(ball.y, 90);
  assert(ball.vx < 0 && ball.vy < 0);
  assert(ball.vx ** 2 + ball.vy ** 2 < 20000);
});
test("All supported restitution levels settle on the floor", () => {
  for (const restitution of [0, 0.75, 0.95]) {
    const ball = { x: 100, y: 40, r: 10, vx: 60, vy: 0, resting: false };
    for (let i = 0; i < 120 * 120; i++)
      M.stepBall(ball, 1 / 120, restitution, 720, 475);
    assert(ball.resting, `restitution ${restitution}`);
    near(ball.y, 465);
    near(ball.vx, 0);
    near(ball.vy, 0);
  }
});
test("Cycloid fits endpoints and beats the straight path", () => {
  for (const [x, y] of [
    [6, 3],
    [1, 6],
    [10, 1],
    [10, 6],
  ]) {
    const m = M.brachistochrone(x, y);
    assert(m.cycleTime < m.lineTime);
    for (const curved of [false, true]) {
      const atStart = M.descentPosition(m, 0, curved),
        end = M.descentPosition(m, 1000, curved);
      near(atStart.x, 0);
      near(atStart.y, 0);
      near(end.x, x);
      near(end.y, y);
    }
  }
});
test("Known cycloid endpoint has analytic time pi * sqrt(a/g)", () => {
  const a = 2,
    g = 9.81,
    m = M.brachistochrone(a * Math.PI, 2 * a, g);
  near(m.theta, Math.PI);
  near(m.a, a);
  near(m.cycleTime, Math.PI * Math.sqrt(a / g));
  assert.throws(() => M.brachistochrone(1, 0), RangeError);
});
test("Orbital integration conserves energy in a circular orbit", () => {
  const mu = 2000000,
    r = 180,
    body = { x: 0, y: -r, vx: Math.sqrt(mu / r), vy: 0, impact: false };
  const initial = (body.vx ** 2 + body.vy ** 2) / 2 - mu / r;
  for (let i = 0; i < 240 * 30; i++) M.stepOrbit(body, 1 / 240, mu, 38);
  const energy =
    (body.vx ** 2 + body.vy ** 2) / 2 - mu / Math.hypot(body.x, body.y);
  assert(!body.impact);
  near(Math.hypot(body.x, body.y), r, 0.01);
  near(energy / initial, 1, 1e-5);
});
test("Orbital impact stops at the combined radii, without tunneling", () => {
  const body = { x: -100, y: 0, vx: 100000, vy: 0, impact: false };
  M.stepOrbit(body, 0.01, 1, 20);
  assert(body.impact);
  near(Math.hypot(body.x, body.y), 20);
  near(body.vx, 0);
  const previous = { ...body };
  M.stepOrbit(body, 1, 1, 20);
  assert.deepEqual(body, previous);
  near(M.segmentContact(-100, 0, 100, 0, 20), 0.4);
  assert.equal(M.segmentContact(-100, 30, 100, 30, 20), null);
});
test("Fourier N means exactly N odd terms", () => {
  const t = 0.13;
  near(M.fourier(t, 1), (4 / Math.PI) * Math.sin(2 * Math.PI * t));
  near(
    M.fourier(t, 2) - M.fourier(t, 1),
    (4 / (3 * Math.PI)) * Math.sin(6 * Math.PI * t),
  );
  near(
    M.fourier(t, 26) - M.fourier(t, 25),
    (4 / (51 * Math.PI)) * Math.sin(102 * Math.PI * t),
  );
});
test("Circumcenter is equidistant; collinear and repeated points return null", () => {
  const a = { x: 0, y: 0 },
    b = { x: 4, y: 0 },
    c = { x: 0, y: 3 };
  const center = M.circumcenter(a, b, c);
  near(center.x, 2);
  near(center.y, 1.5);
  near(center.r, 2.5);
  for (const point of [a, b, c])
    near(Math.hypot(point.x - center.x, point.y - center.y), center.r);
  assert.equal(M.circumcenter(a, a, c), null);
  assert.equal(M.circumcenter(a, b, { x: 8, y: 0 }), null);
});
test("Mediatrices work for vertical and horizontal chords", () => {
  const horizontal = M.bisector({ x: -3, y: 0 }, { x: 3, y: 0 });
  near(horizontal.dx, 0);
  near(horizontal.dy, 1);
  const vertical = M.bisector({ x: 0, y: -3 }, { x: 0, y: 3 });
  near(vertical.dx, -1);
  near(vertical.dy, 0);
  assert.equal(M.bisector({ x: 1, y: 1 }, { x: 1, y: 1 }), null);
});
test("Conway blinker oscillates and a block remains stable", () => {
  const board = new Uint8Array(25);
  board[11] = board[12] = board[13] = 1;
  const next = M.lifeStep(board, 5, 5);
  assert.equal(next[7], 1);
  assert.equal(next[12], 1);
  assert.equal(next[17], 1);
  assert.deepEqual(M.lifeStep(next, 5, 5), board);
  const block = new Uint8Array(25);
  block[6] = block[7] = block[11] = block[12] = 1;
  assert.deepEqual(M.lifeStep(block, 5, 5), block);
});

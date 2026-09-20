// Run against the production build. PLAYWRIGHT_MODULE may point to an installed Playwright ESM entry.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, stat, mkdir, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const root = path.resolve("dist");
const out = process.env.QA_OUTPUT || path.join(os.tmpdir(), "hrlove-lab-qa");
await mkdir(out, { recursive: true });
const server = createServer(async (req, res) => {
  try {
    let file = path.join(
      root,
      decodeURIComponent(new URL(req.url, "http://localhost").pathname),
    );
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    const bytes = await readFile(file);
    res.setHeader(
      "Content-Type",
      {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".png": "image/png",
        ".svg": "image/svg+xml",
      }[path.extname(file)] || "application/octet-stream",
    );
    res.end(bytes);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1366, height: 960 },
    acceptDownloads: true,
  });
  await context.route("**/*", (route) =>
    route.request().url().startsWith(base) ||
    route.request().url().startsWith("data:")
      ? route.continue()
      : route.abort(),
  );
  const hub = await context.newPage();
  await hub.goto(base);
  const cards = hub.locator(".experiment-card");
  await cards.first().waitFor();
  assert.equal(await cards.count(), 15);
  const names = await cards.locator("h3").allTextContents();
  assert.deepEqual(
    names,
    [...names].sort((a, b) => a.localeCompare(b, "es")),
  );
  assert.equal(await cards.locator("p").count(), 15);
  assert.equal(await hub.locator("canvas").count(), 0);
  await cards.first().focus();
  await hub.keyboard.press("Tab");
  assert(await cards.nth(1).evaluate((n) => n.matches(":focus-visible")));
  const popupEvent = hub.waitForEvent("popup");
  await hub.keyboard.press("Enter");
  const popup = await popupEvent;
  await popup.waitForLoadState();
  assert(popup.url().includes("/Falling_ball/"));
  await popup.close();
  await hub
    .locator("#experiments")
    .screenshot({ path: `${out}/hub-desktop.png` });
  await hub.setViewportSize({ width: 390, height: 844 });
  assert(
    await hub.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await hub
    .locator("#experiments")
    .screenshot({ path: `${out}/hub-mobile.png` });
  const directories = (
    await readdir(path.join(root, "experiments"), { withFileTypes: true })
  )
    .filter((e) => e.isDirectory() && !["vendor", "shared"].includes(e.name))
    .map((e) => e.name);
  for (const name of directories.filter(
    (name) =>
      !process.env.QA_ONLY || process.env.QA_ONLY.split(",").includes(name),
  )) {
    const page = await context.newPage(),
      errors = [],
      requests = [],
      downloads = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("requestfailed", (request) => requests.push(request.url()));
    page.on("response", (response) => {
      if (response.status() >= 400)
        requests.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(`${base}/experiments/${name}/index.html`);
    assert.deepEqual(
      await page.locator('script[src*="/vendor/"]').evaluateAll((scripts) =>
        scripts.map((script) => new URL(script.src).pathname),
      ),
      ["/experiments/vendor/2.3.2/p5.min.js"],
      `${name}: should load only the local p5.js v2 library`,
    );
    await page.locator("canvas").waitFor();
    await page.waitForTimeout(150);
    assert.equal(await page.locator("html").getAttribute("lang"), "es");
    assert.equal(
      await page
        .getByRole("link", { name: "Volver a Experimentos" })
        .getAttribute("href"),
      "/#experiments",
    );
    assert(await page.locator("h1").innerText());
    for (const input of await page.locator("input").all()) {
      assert(
        await input.evaluate((el) => el.labels.length > 0),
        `${name}: missing label`,
      );
    }
    const pause = page.getByRole("button", { name: "Pausar", exact: true });
    if (await pause.count()) {
      await pause.click();
      assert(
        await page
          .getByRole("button", { name: "Continuar", exact: true })
          .isVisible(),
      );
    }
    for (const range of await page.locator("input[type=range]").all()) {
      await range.focus();
      const before = Number(await range.inputValue());
      await page.keyboard.press(
        before === Number(await range.getAttribute("max"))
          ? "ArrowLeft"
          : "ArrowRight",
      );
      assert.notEqual(Number(await range.inputValue()), before);
    }
    for (const number of await page.locator("input[type=number]").all()) {
      const before = Number(await number.inputValue()),
        max = Number(await number.getAttribute("max"));
      await number.fill(String(before < max ? before + 1 : before - 1));
      await number.press("Tab");
      assert.notEqual(Number(await number.inputValue()), before);
    }
    if (name === "Alive_parka") {
      await page
        .getByRole("button", { name: "Continuar", exact: true })
        .click();
      await page.waitForTimeout(180);
      await page.getByRole("button", { name: "Pausar", exact: true }).click();
      await page.waitForTimeout(30);
      const before = await page.locator("#metrics").innerText();
      await page.waitForTimeout(150);
      assert.equal(await page.locator("#metrics").innerText(), before);
      await page
        .getByRole("button", { name: "Reiniciar", exact: true })
        .click();
    }
    if (name === 'Alive_parka') {
      await page.evaluate(() => {
        Object.defineProperty(document, 'hidden', { configurable: true, value: true });
        document.dispatchEvent(new Event('visibilitychange'));
      });
      await page.waitForTimeout(50);
      const hiddenMetrics = await page.locator('#metrics').innerText();
      await page.waitForTimeout(150);
      assert.equal(await page.locator('#metrics').innerText(), hiddenMetrics);
      await page.evaluate(() => {
        delete document.hidden;
        document.dispatchEvent(new Event('visibilitychange'));
      });
    }
    if (name === "Falling_ball") {
      await page.getByRole("button", { name: "Iniciar descenso" }).click();
      await page.waitForFunction(
        () =>
          document
            .querySelector("#status")
            .textContent.includes("llega primero"),
        {},
        { timeout: 5000 },
      );
    }
    if (name === "Orbit") {
      const velocity = page.getByLabel("Velocidad tangencial inicial");
      await velocity.focus();
      await velocity.press("Home");
      await page
        .getByRole("button", { name: "Continuar", exact: true })
        .click();
      await page.waitForFunction(
        () =>
          document.querySelector("#status").textContent.startsWith("Impacto"),
        {},
        { timeout: 5000 },
      );
    }
    if (name === "Hipocicloide") {
      const exterior = page.getByLabel("Radio exterior", { exact: true });
      await exterior.focus();
      await exterior.press("Home");
      const interior = page.getByLabel("Radio interior", { exact: true });
      await interior.focus();
      await interior.press("End");
      assert(
        Number(await interior.inputValue()) <
          Number(await exterior.inputValue()),
      );
    }
    if (name === "epicicloide") {
      const exterior = page.getByLabel("Radio exterior", { exact: true });
      const interior = page.getByLabel("Radio interior", { exact: true });
      const distance = page.getByLabel(
        "Distancia del punto al centro del círculo pequeño",
        { exact: true },
      );
      assert.equal(await page.locator("h1").innerText(), "Epicicloide");
      assert(Number(await interior.inputValue()) <= Number(await exterior.inputValue()));
      assert(Number(await distance.inputValue()) <= 1);
      const helpers = page.getByRole("checkbox", {
        name: "Mostrar círculos auxiliares",
      });
      await helpers.uncheck();
      await helpers.check();
      const before = await page.locator("#status").innerText();
      await distance.focus();
      await distance.press("ArrowLeft");
      await page.waitForTimeout(50);
      assert.notEqual(await page.locator("#status").innerText(), before);
      await exterior.focus();
      await exterior.press("Home");
      await page.waitForTimeout(50);
      assert(Number(await interior.inputValue()) <= Number(await exterior.inputValue()));
      await interior.focus();
      await interior.press("End");
      assert.equal(await interior.inputValue(), await exterior.inputValue());
    }
    if (name === "Star") {
      await page.getByLabel("Vértices (p)").fill("2");
      await page.getByLabel("Vértices (p)").press("Tab");
      assert.equal(await page.getByLabel("Vértices (p)").inputValue(), "3");
      await page.getByLabel("Salto (q)").fill("100");
      await page.getByLabel("Salto (q)").press("Tab");
      assert.equal(await page.getByLabel("Salto (q)").inputValue(), "2");
    }
    if (name === "game-of-life") {
      await page
        .getByRole("button", { name: "Avanzar una generación" })
        .click();
      assert(
        await page
          .getByRole("button", { name: "Continuar", exact: true })
          .isVisible(),
      );
      await page.getByRole("button", { name: "Nueva población" }).click();
    }
    if (name === "triangles") {
      for (const input of await page.locator("input[type=range]").all()) {
        await input.focus();
        await input.press("Home");
      }
      await page.waitForFunction(() =>
        document.querySelector("#status").textContent.includes("alineados"),
      );
      assert(!(await page.locator("#metrics").innerText()).includes("NaN"));
      for (const [label, moves] of [
        ["B · X", 10],
        ["C · Y", 20],
      ]) {
        const input = page.getByLabel(label, { exact: true });
        await input.focus();
        for (let i = 0; i < moves; i++) await input.press("ArrowRight");
      }
      await page.waitForFunction(() =>
        document.querySelector("#status").textContent.includes("distancias"),
      );
    }
    if (name === "mandelbrot") {
      await page.waitForFunction(
        () =>
          !Array.from(document.querySelectorAll("button")).some(
            (b) => b.disabled,
          ),
      );
      await page.locator("canvas").click({ position: { x: 140, y: 140 } });
      await page.waitForFunction(
        () =>
          !Array.from(document.querySelectorAll("button")).some(
            (b) => b.disabled,
          ),
      );
      // Rapid updates cancel obsolete work; only the final selection becomes downloadable.
      const re = page.getByLabel("Parte real de c");
      await re.focus();
      for (let i = 0; i < 10; i++) await re.press("ArrowRight");
      await page.waitForFunction(
        () =>
          !Array.from(document.querySelectorAll("button")).some(
            (b) => b.disabled,
          ),
      );
      assert(
        (await page.locator(".metric-value").innerText()).startsWith(
          Number(await re.inputValue()).toFixed(3),
        ),
      );
    }
    for (const button of await page
      .getByRole("button", { name: /Descargar/ })
      .all()) {
      const promise = page.waitForEvent("download");
      await button.click();
      const download = await promise;
      assert.equal(await download.failure(), null);
      downloads.push(download.suggestedFilename());
    }
    await page.screenshot({
      path: `${out}/${name}-desktop.png`,
      fullPage: true,
    });
    const dimensions = await page
      .locator("canvas")
      .evaluate((c) => [c.width, c.height]);
    const values = await page
      .locator("input")
      .evaluateAll((nodes) => nodes.map((n) => n.value));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForTimeout(150);
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `${name}: mobile overflow`,
    );
    assert.deepEqual(
      await page.locator("canvas").evaluate((c) => [c.width, c.height]),
      dimensions,
    );
    assert.deepEqual(
      await page
        .locator("input")
        .evaluateAll((nodes) => nodes.map((n) => n.value)),
      values,
    );
    await page.screenshot({
      path: `${out}/${name}-mobile-dark.png`,
      fullPage: true,
    });
    if (name === "mandelbrot") {
      await page.locator("canvas").scrollIntoViewIfNeeded();
      const box = await page.locator("canvas").boundingBox();
      // Click exact logical center of the Mandelbrot panel at the scaled mobile size.
      await page.mouse.click(
        box.x + (box.width * 209.5) / 840,
        box.y + (box.height * 249.5) / 470,
      );
      await page.waitForFunction(
        () =>
          !Array.from(document.querySelectorAll("button")).some(
            (b) => b.disabled,
          ),
      );
      assert(
        Math.abs(
          Number(await page.getByLabel("Parte real de c").inputValue()),
        ) < 0.025,
      );
      assert(
        Math.abs(
          Number(await page.getByLabel("Parte imaginaria de c").inputValue()),
        ) < 0.025,
      );
    }
    assert.deepEqual(errors, [], name);
    assert.deepEqual(requests, [], name);
    results.push({
      name,
      downloads,
      desktop: true,
      mobile: true,
      errors,
      requests,
    });
    console.log(`PASS ${name}`);
    await page.close();
  }
  await writeFile(`${out}/report.json`, JSON.stringify(results, null, 2));
  console.log(
    `PASS: ${results.length} labs, hub, controls, limits, downloads, responsive coordinates. Evidence: ${out}`,
  );
} finally {
  await browser.close();
  server.closeAllConnections();
  server.close();
}

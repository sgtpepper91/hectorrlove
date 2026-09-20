(function (root) {
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function mount(w = 720, h = 560) {
    pixelDensity(1);
    const renderer = createCanvas(w, h);
    renderer.parent("stage");
    renderer.elt.setAttribute("role", "img");
    renderer.elt.setAttribute(
      "aria-label",
      document.querySelector("h1").textContent,
    );
    const panel = document.querySelector("#controls");
    const actions = el("div", "actions");
    panel.append(actions);
    const metrics = document.querySelector("#metrics");
    const status = document.querySelector("#status");
    const palette = {};
    function colors() {
      const css = getComputedStyle(document.documentElement);
      for (const key of [
        "ink",
        "muted",
        "accent",
        "blue",
        "green",
        "canvas",
        "line",
      ])
        palette[key] = css.getPropertyValue(`--${key}`).trim();
    }
    colors();
    matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      colors,
    );
    let previous = performance.now(),
      paused = false,
      hidden = document.hidden,
      pauseButton;
    document.addEventListener("visibilitychange", () => {
      hidden = document.hidden;
      previous = performance.now();
    });
    let id = 0;
    function group(title) {
      const fieldset = el("fieldset");
      fieldset.append(el("legend", "", title));
      panel.insertBefore(fieldset, actions);
      return fieldset;
    }
    function number(
      label,
      initial,
      min,
      max,
      step = 1,
      callback = () => {},
      options = {},
    ) {
      const wrap = el("div", "control"),
        header = el("div", "control-header");
      const input = el("input"),
        output = el("output"),
        caption = el("label", "", label);
      input.id = `control-${++id}`;
      caption.htmlFor = input.id;
      output.htmlFor = input.id;
      input.type = options.integer ? "number" : "range";
      input.min = min;
      input.max = max;
      input.step = step;
      input.value = initial;
      let value = initial;
      const format = (n) =>
        `${Number(n.toFixed(3)).toLocaleString("es-MX")}${options.unit ? ` ${options.unit}` : ""}`;
      output.textContent = format(value);
      header.append(caption);
      if (!options.integer) header.append(output);
      wrap.append(header, input);
      if (options.reset)
        wrap.append(
          el("div", "note", "Al cambiar este valor se reinicia la simulación."),
        );
      (options.parent || panel).insertBefore(
        wrap,
        options.parent ? null : actions,
      );
      function set(v, notify = false) {
        if (!Number.isFinite(v)) v = value;
        v = Math.max(Number(input.min), Math.min(Number(input.max), v));
        const ticks = Math.round((v - Number(input.min)) / step);
        value = Number((Number(input.min) + ticks * step).toFixed(6));
        input.value = value;
        output.textContent = format(value);
        if (notify) callback(value);
      }
      input.addEventListener(options.integer ? "change" : "input", () =>
        set(input.value === "" ? value : Number(input.value), true),
      );
      input.addEventListener("blur", () =>
        set(input.value === "" ? value : Number(input.value)),
      );
      return {
        get value() {
          return value;
        },
        input,
        set,
        max(v) {
          input.max = v;
          set(value);
        },
      };
    }
    function checkbox(label, initial, callback) {
      const wrap = el("label", "checkbox"),
        input = el("input");
      input.type = "checkbox";
      input.checked = initial;
      wrap.append(input, document.createTextNode(label));
      panel.insertBefore(wrap, actions);
      input.addEventListener("change", () => callback(input.checked));
      return input;
    }
    function button(label, callback, primary = false) {
      const b = el("button", primary ? "primary" : "", label);
      b.type = "button";
      b.addEventListener("click", callback);
      actions.append(b);
      return b;
    }
    function setPaused(value) {
      paused = value;
      previous = performance.now();
      if (pauseButton)
        pauseButton.textContent = paused ? "Continuar" : "Pausar";
    }
    function animation(reset, startPaused = false) {
      pauseButton = button("Pausar", () => setPaused(!paused), true);
      if (reset)
        button("Reiniciar", () => {
          reset();
          setPaused(startPaused);
        });
      setPaused(startPaused);
    }
    function metric(label) {
      const item = el("div", "metric"),
        value = el("span", "metric-value", "—");
      item.append(el("span", "metric-label", label), value);
      metrics.append(item);
      return (text) => {
        if (value.textContent !== String(text)) value.textContent = text;
      };
    }
    function legend(entries) {
      const container = document.querySelector("#legend");
      for (const [label, color] of entries) {
        const key = el("span", "", label);
        key.style.setProperty("--key", `var(--${color})`);
        container.append(key);
      }
    }
    return {
      renderer,
      canvas: renderer.elt,
      palette,
      number,
      checkbox,
      button,
      group,
      animation,
      setPaused,
      get paused() {
        return paused;
      },
      metric,
      legend,
      status(text) {
        if (status.textContent !== text) status.textContent = text;
      },
      hint(text) {
        document.querySelector("#hint").textContent = text;
      },
      tick() {
        const now = performance.now(),
          dt = Math.min((now - previous) / 1000, 0.05);
        previous = now;
        return hidden || paused ? 0 : dt;
      },
      point(event) {
        const rect = renderer.elt.getBoundingClientRect();
        return {
          x: ((event.clientX - rect.left) * w) / rect.width,
          y: ((event.clientY - rect.top) * h) / rect.height,
        };
      },
      clear() {
        background(palette.canvas);
        strokeWeight(1);
      },
      download(name) {
        saveCanvas(renderer.elt, name, "png");
      },
    };
  }
  root.Lab = { mount };
})(globalThis);

export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  url: string;
  number: string;
  logo: "galeria" | "ligamx";
};

export const projects: Project[] = [
  {
    title: "Liga MX HRLV",
    eyebrow: "Football, data & community",
    description:
      "A living home for Mexico’s football: fixtures, teams, stats and stories.",
    url: "https://ligamx.hectorrlove.com",
    number: "01",
    logo: "ligamx",
  },
  {
    title: "Travel Gallery",
    eyebrow: "Places, light & memory",
    description:
      "An editorial space for photographs, journeys and the stories behind them.",
    url: "https://galeria.hectorrlove.com",
    number: "02",
    logo: "galeria",
  },
];

export type Experiment = {
  title: string;
  description: string;
  url: string;
};

export const experiments: Experiment[] = [
  {
    title: "Aguja de Buffon",
    description: "Estima π lanzando agujas al azar sobre líneas paralelas.",
    url: "/experiments/Alive_parka/index.html",
  },
  {
    title: "Braquistócrona",
    description:
      "Compara el tiempo de descenso por una recta y una cicloide entre los mismos puntos.",
    url: "/experiments/Falling_ball/index.html",
  },
  {
    title: "Centro de un círculo",
    description: "Encuentra el centro mediante las mediatrices de dos cuerdas.",
    url: "/experiments/Center_circle/index.html",
  },
  {
    title: "Circuncentro de un triángulo",
    description:
      "Encuentra el centro de la circunferencia que pasa por sus tres vértices.",
    url: "/experiments/triangles/index.html",
  },
  {
    title: "Epicicloide",
    description:
      "Traza la curva de un punto de una circunferencia que rueda por fuera de otra.",
    url: "/experiments/epicicloide/index.html",
  },
  {
    title: "Estrellas de puntas",
    description:
      "Dibuja estrellas alternando vértices exteriores e interiores.",
    url: "/experiments/Star2/index.html",
  },
  {
    title: "Hipocicloide",
    description:
      "Traza la curva de un punto de una circunferencia que rueda dentro de otra.",
    url: "/experiments/Hipocicloide/index.html",
  },
  {
    title: "Juego de la vida",
    description:
      "Observa cómo evoluciona una población de células según las reglas de Conway.",
    url: "/experiments/game-of-life/index.html",
  },
  {
    title: "Mandelbrot y Julia",
    description:
      "Selecciona un punto de Mandelbrot para explorar su conjunto de Julia asociado.",
    url: "/experiments/mandelbrot/index.html",
  },
  {
    title: "Multiplicación modular",
    description:
      "Descubre figuras al conectar puntos de un círculo mediante una multiplicación.",
    url: "/experiments/TimesTable/index.html",
  },
  {
    title: "Órbita gravitacional",
    description:
      "Explora la trayectoria de un objeto atraído por un cuerpo central.",
    url: "/experiments/Orbit/index.html",
  },
  {
    title: "Pelotas con rebote",
    description:
      "Observa cómo varias pelotas caen, rebotan y pierden energía hasta detenerse.",
    url: "/experiments/Bouncing_balls/index.html",
  },
  {
    title: "Polígonos estrellados",
    description:
      "Une puntos de una circunferencia mediante un salto constante.",
    url: "/experiments/Star/index.html",
  },
  {
    title: "Serie de Fourier",
    description:
      "Construye una aproximación de una onda cuadrada sumando armónicos impares.",
    url: "/experiments/Fourier/index.html",
  },
  {
    title: "Tramas aleatorias",
    description:
      "Explora patrones de líneas horizontales y verticales que cambian al azar.",
    url: "/experiments/Brook_ox/index.html",
  },
];

export const links = {
  github: "https://github.com/hectorlv",
  linkedin: "https://www.linkedin.com/in/héctor-lópez-87280247/",
  email: "mailto:hector@hectorrlove.com",
};

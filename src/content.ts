export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  url: string;
  number: string;
  logo: 'galeria' | 'ligamx';
};

export const projects: Project[] = [
  {
    title: 'Liga MX HRLV',
    eyebrow: 'Football, data & community',
    description: 'A living home for Mexico’s football: fixtures, teams, stats and stories.',
    url: 'https://ligamx.hectorrlove.com',
    number: '01',
    logo: 'ligamx'
  },
  {
    title: 'Travel Gallery',
    eyebrow: 'Places, light & memory',
    description: 'An editorial space for photographs, journeys and the stories behind them.',
    url: 'https://galeria.hectorrlove.com',
    number: '02',
    logo: 'galeria'
  }
];

export type Experiment = {
  title: string;
  url: string;
};

export const experiments: Experiment[] = [
  { title: 'Alive_parka', url: '/experiments/Alive_parka/index.html' },
  { title: 'Bouncing_balls', url: '/experiments/Bouncing_balls/index.html' },
  { title: 'Brook_ox', url: '/experiments/Brook_ox/index.html' },
  { title: 'Center_circle', url: '/experiments/Center_circle/index.html' },
  { title: 'Falling_ball', url: '/experiments/Falling_ball/index.html' },
  { title: 'Fourier', url: '/experiments/Fourier/index.html' },
  { title: 'game-of-life', url: '/experiments/game-of-life/index.html' },
  { title: 'Hipocicloide', url: '/experiments/Hipocicloide/index.html' },
  { title: 'mandelbrot', url: '/experiments/mandelbrot/index.html' },
  { title: 'Orbit', url: '/experiments/Orbit/index.html' },
  { title: 'Star', url: '/experiments/Star/index.html' },
  { title: 'Star2', url: '/experiments/Star2/index.html' },
  { title: 'TimesTable', url: '/experiments/TimesTable/index.html' },
  { title: 'triangles', url: '/experiments/triangles/index.html' }
];

export const links = {
  github: 'https://github.com/hectorlv',
  linkedin: 'https://www.linkedin.com/in/héctor-lópez-87280247/',
  email: 'mailto:hector@hectorrlove.com'
};

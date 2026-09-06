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

export const links = {
  github: 'https://github.com/hectorlv',
  linkedin: 'https://www.linkedin.com/in/héctor-lópez-87280247/',
  email: 'mailto:hector@hectorrlove.com'
};

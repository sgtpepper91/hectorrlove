export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  url: string;
  number: string;
  symbol: string;
};

export const projects: Project[] = [
  {
    title: 'Liga MX HRLV',
    eyebrow: 'Football, data & community',
    description: 'A living home for Mexico’s football: fixtures, teams, stats and stories.',
    url: 'https://ligamx.hectorrlove.com',
    number: '01',
    symbol: '∿'
  },
  {
    title: 'World Cup 2026',
    eyebrow: 'The tournament, in real time',
    description: 'Following the world’s game as it arrives in Mexico, Canada and the United States.',
    url: 'https://mundial.hectorrlove.com',
    number: '02',
    symbol: '◐'
  },
  {
    title: 'Travel Gallery',
    eyebrow: 'Places, light & memory',
    description: 'An editorial space for photographs, journeys and the stories behind them.',
    url: 'https://galeria.hectorrlove.com',
    number: '03',
    symbol: '⊹'
  }
];

export const links = {
  github: 'https://github.com/hectorlv',
  linkedin: 'https://www.linkedin.com/in/héctor-lópez-87280247/',
  email: 'mailto:hector@hectorrlove.com'
};

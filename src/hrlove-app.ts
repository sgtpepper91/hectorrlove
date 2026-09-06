import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { links, projects } from './content.js';
import galeriaLogo from './images/galeria-hrlv-logo.png';
import ligaMxLogo from './images/ligamx-hrlv-logo.png';

const projectLogos = {
  galeria: galeriaLogo,
  ligamx: ligaMxLogo
};

@customElement('hrlove-app')
export class HrloveApp extends LitElement {
  static override styles = css`
    :host {
      --ink: #171718;
      --muted: #686561;
      --paper: #f8f7f4;
      --card: #f0eeea;
      --line: #d8d5cf;
      --accent: #d92d3a;
      color: var(--ink);
      display: block;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    * { box-sizing: border-box; }
    a { color: inherit; }
    .page { background: var(--paper); min-height: 100vh; overflow: hidden; }
    .shell { margin: 0 auto; max-width: 1280px; padding: 0 5vw; }
    .nav { align-items: center; display: flex; height: 100px; justify-content: space-between; }
    .brand { font-size: .9rem; font-weight: 800; letter-spacing: .2em; text-decoration: none; }
    .nav-links { display: flex; gap: 1.5rem; }
    .nav-links a, .back-link { color: var(--muted); font-size: .82rem; font-weight: 650; text-decoration: none; }
    a:focus-visible { outline: 2px solid var(--accent); outline-offset: 5px; }
    .hero { min-height: min(680px, calc(100vh - 100px)); padding: 8vh 0 6rem; position: relative; }
    .orbital-note { color: var(--muted); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .68rem; letter-spacing: .08em; margin: 0 0 2rem; text-transform: uppercase; }
    .hero h1 { font-size: clamp(3.8rem, 9.1vw, 8.7rem); font-weight: 600; letter-spacing: -.075em; line-height: .88; margin: 0; max-width: 1050px; }
    .hero h1 span { color: var(--accent); display: block; font-family: Georgia, serif; font-size: .55em; font-style: italic; font-weight: 400; letter-spacing: -.07em; margin: .17em 0 0 .35em; }
    .role { font-size: clamp(1rem, 1.7vw, 1.35rem); margin: 2rem 0 0; }
    .statement { font-size: clamp(1.35rem, 2.7vw, 2.25rem); letter-spacing: -.04em; line-height: 1.1; margin: 7vh 0 0; max-width: 500px; }
    .explore { align-items: center; display: inline-flex; font-size: .85rem; font-weight: 700; gap: .7rem; margin-top: 2.5rem; text-decoration: none; }
    .arrow { color: var(--accent); font-size: 1.4rem; transition: transform .2s ease; }
    .explore:hover .arrow { transform: translateY(4px); }
    .orbit { border: 1px solid var(--line); border-radius: 50%; height: min(31vw, 410px); opacity: .8; position: absolute; right: -9vw; top: 4vh; width: min(31vw, 410px); }
    .orbit::after { background: var(--accent); border-radius: 50%; content: ''; height: 9px; left: 22%; position: absolute; top: 9%; width: 9px; }
    section { border-top: 1px solid var(--line); padding: 6.5rem 0; }
    .section-label { color: var(--muted); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .68rem; letter-spacing: .1em; margin: 0 0 2.5rem; text-transform: uppercase; }
    .projects { display: grid; gap: 1rem; grid-template-columns: repeat(3, 1fr); }
    .project { background: var(--card); display: flex; flex-direction: column; min-height: 335px; padding: 1.5rem; position: relative; text-decoration: none; transition: background .22s ease, transform .22s ease; }
    .project:hover { background: #e8e5df; transform: translateY(-5px); }
    .project-top { color: var(--muted); display: flex; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .7rem; justify-content: space-between; }
    .project-logo { align-items: center; display: flex; flex: 1; margin: 1rem 0; }
    .project-logo img { display: block; height: 84px; max-width: 150px; object-fit: contain; object-position: left center; width: 100%; }
    .project h3 { font-size: 1.5rem; letter-spacing: -.04em; margin: 0; }
    .project p { color: var(--muted); font-size: .88rem; line-height: 1.45; margin: .65rem 0 0; max-width: 270px; }
    .about-grid { display: grid; gap: 3rem; grid-template-columns: 1.1fr .9fr; }
    .about-copy { font-family: Georgia, serif; font-size: clamp(1.65rem, 3vw, 2.7rem); letter-spacing: -.055em; line-height: 1.12; margin: 0; max-width: 650px; }
    .stack { align-content: start; display: flex; flex-wrap: wrap; gap: .55rem; }
    .stack span { border: 1px solid var(--line); border-radius: 999px; font-size: .78rem; padding: .55rem .8rem; }
    .experiment { align-items: end; display: flex; justify-content: space-between; min-height: 180px; }
    .experiment h2 { font-size: clamp(2rem, 4vw, 3.7rem); letter-spacing: -.06em; margin: 0; }
    .experiment p { color: var(--muted); font-size: .9rem; line-height: 1.5; margin: 0; max-width: 320px; }
    footer { border-top: 1px solid var(--line); padding: 2.5rem 0 3rem; }
    .footer-inner { align-items: center; display: flex; justify-content: space-between; }
    .contact { display: flex; gap: 1.25rem; }
    .contact a { font-size: .82rem; font-weight: 700; text-decoration: none; }
    .contact a:hover { color: var(--accent); }
    .copyright { color: var(--muted); font-size: .75rem; }
    @media (prefers-color-scheme: dark) {
      :host { --ink: #f0efec; --muted: #aaa6a0; --paper: #171718; --card: #222122; --line: #383637; --accent: #ff5b64; }
      .project:hover { background: #2a2829; }
    }
    @media (max-width: 720px) {
      .shell { padding: 0 1.4rem; }
      .nav { height: 78px; }
      .hero { min-height: 670px; padding-top: 9vh; }
      .hero h1 { font-size: clamp(3.6rem, 18vw, 5.3rem); }
      .hero h1 span { margin-left: .13em; }
      .orbit { height: 290px; right: -130px; top: 29vh; width: 290px; }
      section { padding: 4.5rem 0; }
      .projects { grid-template-columns: 1fr; }
      .project { min-height: 260px; }
      .about-grid { grid-template-columns: 1fr; }
      .experiment { align-items: start; flex-direction: column; gap: 2rem; min-height: 220px; }
      .footer-inner { align-items: flex-start; flex-direction: column; gap: 1.5rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
    }
  `;

  override render() {
    return html`
      <main class="page">
        <div class="shell">
          <nav class="nav" aria-label="Main navigation">
            <a class="brand" href="#top" aria-label="H R Love, home">H·R·LOVE</a>
            <div class="nav-links"><a href="#projects">Projects</a><a href="#about">Me</a></div>
          </nav>
          <header class="hero" id="top">
            <div class="orbit" aria-hidden="true"></div>
            <p class="orbital-note">CDMX · 19.4326° N, 99.1332° W</p>
            <h1>Héctor Roberto<br />López Velasco <span>Hector R. LoVe</span></h1>
            <p class="role">Software Developer</p>
            <p class="statement">I build things for the web.</p>
            <a class="explore" href="#projects"><span class="arrow">↓</span> Explore projects</a>
          </header>
        </div>
        <section id="projects"><div class="shell">
          <p class="section-label">01 — Featured projects</p>
          <div class="projects">
            ${projects.map(project => html`
              <a class="project" href=${project.url} target="_blank" rel="noreferrer">
                <div class="project-top"><span>${project.number}</span><span>↗</span></div>
                <div class="project-logo" aria-hidden="true"><img src=${projectLogos[project.logo]} alt="" /></div>
                <div><h3>${project.title}</h3><p>${project.description}</p></div>
              </a>
            `)}
          </div>
        </div></section>
        <section id="about"><div class="shell">
          <p class="section-label">02 — About me</p>
          <div class="about-grid">
            <p class="about-copy">I like turning ideas into clear, useful digital experiences — and finding the elegant solution hidden inside a messy problem.</p>
            <div class="stack" aria-label="Technologies"><span>Java</span><span>TypeScript</span><span>Lit</span><span>Firebase</span></div>
          </div>
        </div></section>
        <section><div class="shell experiment">
          <div><p class="section-label">03 — Experiments</p><h2>Still exploring.</h2></div>
          <p>A small space for the ideas that are still taking shape. More soon.</p>
        </div></section>
        <footer><div class="shell footer-inner">
          <div class="contact"><a href=${links.github} target="_blank" rel="noreferrer">GitHub</a><a href=${links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href=${links.email}>Email</a></div>
          <span class="copyright">© ${new Date().getFullYear()} H·R·LOVE</span>
        </div></footer>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'hrlove-app': HrloveApp; }
}

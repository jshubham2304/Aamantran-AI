export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a className="brand" href="#top" aria-label="Aamantran AI home">
          <span className="brand-mark">A</span>
          <span>
            Aamantran AI
            <small>Har Invite, Dil Se</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#solution">Solution</a>
          <a href="#demo">Demo</a>
          <a href="#calculator">Calculator</a>
          <a href="#business">Business</a>
          <a
            className="nav-link-highlight"
            href="https://forms.gle/5NRDvCpgMu94Vmrq8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="nav-link-highlight-dot" aria-hidden="true" />
            RSVP
          </a>
        </nav>

        <a className="btn btn-primary btn-small" href="#waitlist">
          Join Waitlist
        </a>
      </div>
    </header>
  );
}

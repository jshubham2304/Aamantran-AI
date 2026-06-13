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
          <a href="#solution">How it works</a>
          <a href="#demo">Demo</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a className="btn btn-primary btn-small" href="#waitlist">
          Get started
        </a>
      </div>
    </header>
  );
}

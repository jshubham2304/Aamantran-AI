export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-brand">
          <strong>Aamantran AI</strong>
          <p>Har Invite, Dil Se ❤️</p>
          <small>Made for Indian weddings — families and planners alike.</small>
        </div>

        <div className="footer-links">
          <div>
            <span className="footer-heading">Product</span>
            <a href="#solution">How it works</a>
            <a href="#demo">Demo</a>
            <a href="#calculator">Calculator</a>
            <a href="#features">Features</a>
          </div>
          <div>
            <span className="footer-heading">Pricing</span>
            <a href="#pricing">For families</a>
            <a href="#pricing">For planners</a>
            <a href="#faq">FAQ</a>
          </div>
          <div>
            <span className="footer-heading">Contact</span>
            <a href="mailto:hello@aamantran.ai">hello@aamantran.ai</a>
            <a href="#waitlist">Get started</a>
          </div>
        </div>
      </div>
      <div className="container footer-base">
        <small>© {new Date().getFullYear()} Aamantran AI · All rights reserved.</small>
      </div>
    </footer>
  );
}

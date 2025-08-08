import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <nav>
        <h6 className="footer-title"><Link to="/legal">Services</Link></h6>
        <Link className="link link-hover" to="/legal/">Branding</Link>
        <Link className="link link-hover" to="/legal/">Design</Link>
        <Link className="link link-hover" to="/legal/">Marketing</Link>
        <Link className="link link-hover" to="/legal/">Advertisement</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title"><Link to="/legal">Legal</Link></h6>
        <Link className="link link-hover" to="/legal/">Terms of use</Link>
        <Link className="link link-hover" to="/legal/">Privacy policy</Link>
        <Link className="link link-hover" to="/legal/">Cookie policy</Link>
      </nav>
    </div>
  )
}
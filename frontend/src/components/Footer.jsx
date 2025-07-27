import React from "react";
import { Instagram, Youtube, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-base-200 text-base-content p-10">
        <Link to="/">
          <aside>
            <img src="/logo04.png" className="w-10 h-10 flex" alt="Astra" />
            <p>
              Astra | World Canvas.
              <br />
              Providing reliable News since 2025
            </p>
          </aside>
        </Link>
        <nav>
          <h6 className="footer-title">Blog</h6>
          <a className="link link-hover">Tech</a>
          <a className="link link-hover">Music</a>
          <a className="link link-hover">Videos</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a href="/about" className="link link-hover">
            About us
          </a>
          <a href="/contact" className="link link-hover">
            Contact
          </a>
          <a className="link link-hover">Careers</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a href="/legal" className="link link-hover">Terms of use</a>
          <a href="/legal" className="link link-hover">Privacy policy</a>
        </nav>
      </footer>
      <footer className="footer bg-base-200 text-base-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a className="hover:cursor-pointer hover:text-blue-400">
            <Twitter />
          </a>
          <a className="hover:cursor-pointer hover:text-red-500">
            <Youtube />
          </a>
          <a className="hover:cursor-pointer hover:text-pink-400">
            <Instagram />
          </a>
        </nav>
      </footer>
    </>
  );
};

export default Footer;

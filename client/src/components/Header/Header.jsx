import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="outer-container">
      {/* Logo */}
      <div className="inner-container">
        <div className="logo-container">
          <a href="/">
            <img
              src="https://66cf6e20751318039e6352ff--peaceful-dragon-75676e.netlify.app/assets/evangadi-logo-home-D98Zk6nH.png"
              alt="Evangadi Logo"
            />
          </a>
        </div>
        <div>
          {/* Toggle Button with Hamburger Icon */}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>

          {/* Navigation */}

          <nav className={`nav-container ${isMenuOpen ? "open" : ""}`}>
            <ul className="nav-list">
              <li>
                <a href="/">Home</a>
              </li>
              <li className="divider" />
              <li>
                <a href="/how-it-works">How it Works</a>
              </li>
              <li className="divider" />
            </ul>
            <div>
              <button className="button-container">SIGN IN</button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

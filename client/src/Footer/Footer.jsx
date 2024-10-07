import React from "react";
import styles from "./Footer.module.css"; // Import the updated CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import placeholder from "../assets/image/placeholder.png"; // Update with the correct logo path

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Left Section with Logo and Social Icons */}
        <div className={styles.logoAndIcons}>
          <img
            src={placeholder}
            alt="Evangadi Logo"
            className={styles.evandiLogo}
          />
          <div className={styles.footerSocial}>
            <a
              href="https://www.facebook.com/evangaditech/"
              aria-label="Facebook"
              className={styles.socialIcon}
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="" aria-label="Instagram" className={styles.socialIcon}>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.youtube.com/evangaditech"
              aria-label="YouTube"
              className={styles.socialIcon}
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>

        {/* Right Section with Links and Contact Info */}
        <div className={styles.footerLinksContact}>
          <div className={styles.footerLinks}>
            <h3>Useful Links</h3>
            <ul>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>
          <div className={styles.footerContact}>
            <h3>Contact Info</h3>
            <p>
              Email:{" "}
              <a href="mailto:support@evangadi.com">support@evangadi.com</a>
            </p>
            <p>Phone: +1-123-456-7890</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

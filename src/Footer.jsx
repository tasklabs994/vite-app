import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          {/* Top area: Left side (logo + links) and Right side (social + company info) */}
          <div className="footer-logo">
            <a href="https://blog.bouwplaatsautomatisering.nl">
              <img
                src="https://blog.bouwplaatsautomatisering.nl/wp-content/uploads/2024/11/Schermafbeelding-2024-12-09-om-16.30.03.png"
                alt="BPA Logo"
              />
            </a>
          </div>
          <div className="footer-top">
            {/* Left column: Logo + Navigation links */}

            <div className="footer-left">
              <ul className="footer-links">
                <li>
                  <a href="https://bouwplaatsautomatisering.nl/basistraining/">
                    Basistraining
                  </a>
                </li>
                <li>
                  <a href="https://bouwplaatsautomatisering.nl/vervolgtraining/">
                    Vervolgtraining
                  </a>
                </li>
                <li>
                  <a href="https://bouwplaatsautomatisering.nl/oplossingen/">
                    Oplossingen
                  </a>
                </li>
                <li>
                  <a href="https://bouwplaatsautomatisering.nl/support/">
                    Support
                  </a>
                </li>
                <li>
                  <a href="https://bouwplaatsautomatisering.nl/partners/">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="https://bouwplaatsautomatisering.nl/contact/">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="https://www.bluebeam.com/trial/bpa">
                    Proefversie aanvragen
                  </a>
                </li>
                <li>
                  <a href="https://bouwplaatsautomatisering.nl/winkel/">
                    Webshop
                  </a>
                </li>
                <li>
                  <a href="https://bouwplaatsautomatisering.nl/cookie-policy/">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="https://bouwplaatsautomatisering.nl/privacystatement/">
                    Privacystatement
                  </a>
                </li>
              </ul>
            </div>

            {/* Right column: Volg BPA + Social icons + Company info */}
            <div className="footer-right">
              <div className="footer-social">
                <h3 className="social-icons-heading">Volg BPA</h3>
                <div className="social-icons">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/BouwplaatsAutomatisering/?fref=ts"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <svg
                      className="icon"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/emil-k%C3%BCtter-9b8b6752/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="icon"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/user/BluebeamPDFRevu"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                  >
                    <svg
                      className="icon"
                      viewBox="0 0 576 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zM232.145 337.591V175.185l142.739 81.205-142.739 81.201z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="footer-company">
                <p className="company-title">BPA Bouwplaatsautomatisering BV</p>
                <ul className="company-info">
                  <li>Nieuwstraat 16</li>
                  <li>7687 BB Daarlerveen</li>
                  <li>+31 6 317 55 331</li>
                  <li>info@bouwplaatsautomatisering.nl</li>
                  <li>KvK nr: 92270085</li>
                </ul>
              </div>
            </div>
            <div className="footer-image">
              <img
                src="https://blog.bouwplaatsautomatisering.nl/wp-content/uploads/2024/11/Schermafbeelding-2024-11-11-om-16.35.21-1024x390.png"
                alt="Footer Graphic"
              />
            </div>
          </div>

          {/* Bottom image */}
        </div>
      </footer>

      {/* Final row with copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>Alle rechten voorbehouden – Bouwplaatsautomatisering 2024</p>
        </div>
      </div>
    </>
  );
}

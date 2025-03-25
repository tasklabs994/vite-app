import React from "react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#111111] text-white text-base font-sans">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Top area: Left (logo + links), Center (social + company info), and Right (graphic) */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
            {/* Left Column: Logo and Navigation Links */}
            <div className="w-full lg:w-auto mb-8 lg:mb-0 text-center lg:text-left">
              <div className="mb-4">
                <a href="https://blog.bouwplaatsautomatisering.nl">
                  <img
                    className="w-1/2 md:w-1/5 h-auto mx-auto lg:mx-0"
                    src="https://blog.bouwplaatsautomatisering.nl/wp-content/uploads/2024/11/Schermafbeelding-2024-12-09-om-16.30.03.png"
                    alt="BPA Logo"
                  />
                </a>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <ul className="list-none p-0 mb-4 md:mb-0 md:mr-8">
                  <li>
                    <a
                      href="https://bouwplaatsautomatisering.nl/basistraining/"
                      className="no-underline transition-colors duration-200 hover:text-[#ccc] text-white"
                    >
                      Basistraining
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bouwplaatsautomatisering.nl/vervolgtraining/"
                      className="no-underline transition-colors duration-200 hover:text-[#ccc]"
                    >
                      Vervolgtraining
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bouwplaatsautomatisering.nl/oplossingen/"
                      className="no-underline transition-colors duration-200 hover:text-[#ccc]"
                    >
                      Oplossingen
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bouwplaatsautomatisering.nl/support/"
                      className="no-underline transition-colors duration-200 hover:text-[#ccc]"
                    >
                      Support
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bouwplaatsautomatisering.nl/partners/"
                      className="no-underline transition-colors duration-200 hover:text-[#ccc]"
                    >
                      Partners
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bouwplaatsautomatisering.nl/contact/"
                      className="no-underline transition-colors duration-200 hover:text-[#ccc]"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.bluebeam.com/trial/bpa"
                      className="no-underline transition-colors duration-200 hover:text-[#ccc]"
                    >
                      Proefversie aanvragen
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bouwplaatsautomatisering.nl/winkel/"
                      className="no-underline transition-colors duration-200 hover:text-[#ccc]"
                    >
                      Webshop
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bouwplaatsautomatisering.nl/cookie-policy/"
                      className="no-underline transition-colors duration-200 hover:text-[#ccc]"
                    >
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bouwplaatsautomatisering.nl/privacystatement/"
                      className="no-underline transition-colors duration-200 hover:text-[#ccc]"
                    >
                      Privacystatement
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Center Column: Social Icons and Company Info */}
            <div className="w-full lg:w-auto flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="lg:mr-40">
                <h3 className="font-bold mb-2 md:mb-4 text-[#9b9b9b]">
                  Volg BPA
                </h3>
                <div className="flex justify-center md:justify-start items-center gap-4">
                  <a
                    href="https://www.facebook.com/BouwplaatsAutomatisering/?fref=ts"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="transition-colors duration-200 hover:text-[#ccc] rounded-full border-2 border-white p-2"
                  >
                    <FaFacebook className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/emil-k%C3%BCtter-9b8b6752/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="transition-colors duration-200 hover:text-[#ccc] rounded-full border-2 border-white p-2"
                  >
                    <FaLinkedin className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://www.youtube.com/user/BluebeamPDFRevu"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="transition-colors duration-200 hover:text-[#ccc] rounded-full border-2 border-white p-2"
                  >
                    <FaYoutube className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
              <div>
                <div className="font-bold mb-2 text-[#9b9b9b] lg:pt-12">
                  BPA Bouwplaatsautomatisering BV
                </div>
                <ul className="list-none p-0">
                  <li>Nieuwstraat 16</li>
                  <li>7687 BB Daarlerveen</li>
                  <li>+31 6 317 55 331</li>
                  <li>info@bouwplaatsautomatisering.nl</li>
                  <li>KvK nr: 92270085</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Bottom Image */}
            <div className="w-full lg:w-auto mt-8 lg:ml-20">
              <img
                className="w-full  h-auto mx-auto"
                src="https://blog.bouwplaatsautomatisering.nl/wp-content/uploads/2024/11/Schermafbeelding-2024-11-11-om-16.35.21-1024x390.png"
                alt="Footer Graphic"
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Final Bottom Row */}
      <div className="bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto text-center md:text-left text-[#9b9b9b] text-base py-4">
          <p>Alle rechten voorbehouden – Bouwplaatsautomatisering 2024</p>
        </div>
      </div>
    </>
  );
}

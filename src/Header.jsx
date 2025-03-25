import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 w-full bg-white z-[999] shadow">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <img
          className="h-16 w-auto"
          src="https://blog.bouwplaatsautomatisering.nl/wp-content/uploads/2024/11/BPA-logo-e1733760109678.png"
          alt="Logo"
        />
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <a
            href="/"
            className="text-black font-bold text-lg transition-colors duration-300 hover:text-[#0078d7]"
          >
            Home
          </a>
          <a
            href="#"
            className="text-black font-bold text-lg transition-colors duration-300 hover:text-[#0078d7]"
          >
            Oplossingen
          </a>
          <a
            href="#"
            className="text-black font-bold text-lg transition-colors duration-300 hover:text-[#0078d7]"
          >
            Support
          </a>
          <a
            href="#"
            className="text-black font-bold text-lg transition-colors duration-300 hover:text-[#0078d7]"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-black font-bold text-lg transition-colors duration-300 hover:text-[#0078d7]"
          >
            Webshop
          </a>
        </nav>
        {/* Desktop CTA Button */}
        <button className="hidden md:block bg-[#3179c1] py-2 px-4 text-lg text-white font-bold rounded transition-colors duration-300 hover:bg-[#005299]">
          Proefversie Aanvragen
        </button>
        {/* Mobile Hamburger Menu Toggle */}
        <button
          className="md:hidden text-black"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-2 px-4 py-4">
            <a
              href="/"
              className="text-black font-bold text-base transition-colors duration-300 hover:text-[#0078d7]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#"
              className="text-black font-bold text-base transition-colors duration-300 hover:text-[#0078d7]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Oplossingen
            </a>
            <a
              href="#"
              className="text-black font-bold text-base transition-colors duration-300 hover:text-[#0078d7]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </a>
            <a
              href="#"
              className="text-black font-bold text-base transition-colors duration-300 hover:text-[#0078d7]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#"
              className="text-black font-bold text-base transition-colors duration-300 hover:text-[#0078d7]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Webshop
            </a>
            <button
              className="mt-2 bg-[#3179c1] py-2 px-4 text-base text-white font-bold rounded transition-colors duration-300 hover:bg-[#005299]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Proefversie Aanvragen
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}

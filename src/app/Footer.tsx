import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="max-w-7xl mx-auto px-6 py-8 text-gray-500">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            © {new Date().getFullYear()} ScrapeChat — Built by{" "}
            <a
              href="https://github.com/zamanali423"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-500 transition"
            >
              Zaman Ali
            </a>
          </div>
          <div className="flex gap-4">
            <a>Privacy</a>
            <a>Terms</a>
            <a>Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

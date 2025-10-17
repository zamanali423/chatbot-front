import React from "react";
import Image from "next/image";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-6">
        {/* Logo */}
        <div className="w-16 h-16 flex flex-col items-center justify-center shadow-md">
          <Image
            src="/assets/images/logo_single.svg"
            alt="ScrapeChat Logo"
            width={100}
            height={100}
            className="w-full h-full object-contain"
          />
          <p className="text-sm font-bold uppercase">ScrapeChat</p>
        </div>

        {/* Tagline / Description */}
        <p className="max-w-md text-sm text-white">
          Build smarter chatbots. Trained on your data, ready for your customers.
        </p>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-[#2D5BE3] transition">
            Products
          </Link>
          <Link href="/pricing" className="hover:text-[#2D5BE3] transition">
            Integrations
          </Link>
          <Link
            href="/integrations"
            className="hover:text-[#2D5BE3] transition"
          >
            Pricing
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-xl">
          <Link
            href="https://github.com/zamanali423"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2D5BE3] transition"
          >
            <Twitter />
          </Link>
          <Link
            href="https://linkedin.com/in/zamanali423"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2D5BE3] transition"
          >
            <Linkedin />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2D5BE3] transition"
          >
            <Instagram />
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-white border-gray-200 w-full">
          Copyrights © {new Date().getFullYear()}{" "}
          <span className="font-medium">ScrapeChat</span>, All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

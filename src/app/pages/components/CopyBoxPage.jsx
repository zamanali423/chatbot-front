"use client";
import { useState } from "react";

export default function CopyBoxPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const boxText = `<script src="${
    process.env.NEXT_PUBLIC_CHATBOT_URL
  }/widget.js" data-website-id="https://urlshortner-steel.vercel.app" async></script>`;

  return (
    <div className="flex flex-col items-start justify-center min-h-screen bg-gray-50 px-6 md:px-16">
      {/* Page Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
        Your widget is ready!
      </h1>

      {/* Paragraph */}
      <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl">
        Copy this code and place it before the{" "}
        <span className="font-semibold text-gray-800">&lt;/body&gt;</span> tag
        on every page of your website:
      </p>

      {/* Copy Box */}
      <div
        onClick={() => handleCopy(boxText)}
        className="relative group mt-6 w-full max-w-2xl cursor-pointer"
      >
        {/* Box Content */}
        <div className="py-8 px-4 border rounded-xl bg-white shadow text-gray-700 font-mono text-sm md:text-base relative z-10 transition-all duration-300 group-hover:blur-sm">
          {boxText}
        </div>

        {/* Blur Overlay */}
        <div className="absolute inset-0 rounded-xl bg-black/10 opacity-0 group-hover:opacity-100 transition"></div>

        {/* Hover Text */}
        <div className="absolute inset-0 flex items-center justify-center text-black font-semibold text-sm md:text-base opacity-0 group-hover:opacity-100 transition z-20">
          {copied ? "Copied!" : "Copy to Clipboard"}
        </div>
      </div>
    </div>
  );
}

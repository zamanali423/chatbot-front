"use client";
import { useState } from "react";
import { X, Copy } from "lucide-react";

export default function CopyScriptSection({
  showIntegrateLink,
  setShowIntegrateLink,
  websiteUrl,
}) {
  const [copied, setCopied] = useState(false);

  const scriptTag = `<script src="${process.env.NEXT_PUBLIC_CHATBOT_URL}/widget.js" data-website-id="${websiteUrl}" async></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);

    // hide popup after 2s
    setTimeout(() => {
      setCopied(false);
      setShowIntegrateLink(false);
    }, 2000);
  };

  if (!showIntegrateLink || !websiteUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setShowIntegrateLink(false)}
      />

      {/* Popup Card */}
      <div className="relative z-50 w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setShowIntegrateLink(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Copy & Paste this Script into your Website
        </h2>

        {/* Script Box */}
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg border border-gray-300">
          <code className="text-xs text-gray-700 break-all">{scriptTag}</code>
          <button
            onClick={handleCopy}
            className="ml-2 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            <Copy size={16} /> Copy
          </button>
        </div>

        {/* Copied Toast */}
        {copied && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-3 py-2 rounded-lg shadow-md animate-bounce">
            ✅ Copied Successfully!
          </div>
        )}
      </div>
    </div>
  );
}

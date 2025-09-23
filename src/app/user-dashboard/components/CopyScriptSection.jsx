import { useState } from "react";

export default function CopyScriptSection({
  showIntegrateLink,
  scrapedData,
  setShowIntegrateLink,
}) {
  const [copied, setCopied] = useState(false);

  const scriptTag = `<script src="${
    process.env.NEXT_PUBLIC_CHATBOT_URL
  }/widget.js" data-website-id="${
    scrapedData[scrapedData.length - 1].url
  }" async></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);

    // hide after 2s
    setTimeout(() => {
      setCopied(false);
      setShowIntegrateLink(false);
    }, 2000);
  };

  if (!showIntegrateLink || !scrapedData?.length) return null;

  return (
    <p className="text-center text-[#5f6578] font-semibold mb-6">
      Copy this link and paste in your website:{" "}
      <span
        className="relative text-[#2D5BE3] bg-gray-200 px-2 py-1 rounded cursor-pointer"
        onClick={handleCopy}
      >
        {scriptTag}
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow">
            Copied!
          </span>
        )}
      </span>
    </p>
  );
}

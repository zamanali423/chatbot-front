"use client";
import { useEffect } from "react";

export default function ChatbotLoader() {
  useEffect(() => {
    const websiteUrl = window.location.origin;
    const script = document.createElement("script");
    script.src = `${process.env.NEXT_PUBLIC_CHATBOT_URL}/widget.js`;
    script.async = true;
    script.setAttribute("data-website-id", websiteUrl); // your websiteId
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // cleanup
    };
  }, []);

  return null;
}

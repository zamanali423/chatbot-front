"use client";
import Image from "next/image";
import React from "react";

const capabilities = [
  {
    title: "Smart Scrapers",
    color: "#3B82F6",
    desc: "Auto-detect tables & lists, structured output (JSON/CSV), and scheduled crawls.",
    bullets: [
      "Automatic data structure detection",
      "Multiple output formats",
      "Scheduled and on-demand scraping",
      "Custom parsing rules",
    ],
    image: "/assets/images/scraper.svg",
    reverse: false,
  },
  {
    title: "Conversational Memory",
    color: "#DF00DB",
    desc: "Context-aware answers built from live data and historical queries.",
    bullets: [
      "Natural language understanding",
      "Context retention across sessions",
      "Intelligent response generation",
      "Historical query analysis",
    ],
    image: "/assets/images/memory.svg",
    reverse: true,
  },
  {
    title: "Easy Integration",
    color: "#7C3BED",
    desc: "Embed with one script, SDKs for React / Next.js / Node and partner connectors.",
    bullets: [
      "Single-line embedding",
      "Framework-specific SDKs",
      "Webhook support",
      "REST API access",
    ],
    image: "/assets/images/integration.svg",
    reverse: false,
  },
];

const CapabilitiesSection = () => {
  return (
    <section
      className="py-16 px-6 lg:px-20 text-center relative"
      style={{
        backgroundImage: "url('/assets/images/bg_hero.svg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Heading */}
      <div className="mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Powerful <span className="text-[#DF00DB]">Capabilities</span> For{" "}
          <span className="text-[#7C3BED]">Modern Apps</span>
        </h2>
        <p className="text-gray-600 mt-3 text-base md:text-lg">
          Everything you need to build intelligent, data-driven chatbots
        </p>
      </div>

      {/* Capability Blocks */}
      <div className="flex flex-col gap-20">
        {capabilities.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center mx-auto ${
              item.reverse ? "md:flex-row-reverse" : "md:flex-row"
            } items-center justify-between gap-10`}
          >
            {/* Text Section */}
            <div className="md:w-1/2 text-left">
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
              <ul className="text-gray-700 text-sm space-y-2">
                {item.bullets.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="w-2 h-2 mt-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 flex justify-center">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CapabilitiesSection;

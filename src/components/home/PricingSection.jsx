"use client";
import React from "react";

const plans = [
  {
    name: "Starter",
    desc: "Free trial for developers",
    price: "$0",
    period: "/mo",
    features: [
      "Up to 1k pages / month",
      "Advanced scraping & parsing",
      "Community support",
      "1 active chatbot",
      "Standard API access",
    ],
    button: "Start Pro Trial",
    highlight: false,
  },
  {
    name: "Pro",
    desc: "Priority crawls & webhook delivery",
    price: "$49",
    period: "/mo",
    features: [
      "Up to 10k pages / month",
      "Advanced scraping & parsing",
      "Priority support",
      "Unlimited chatbot",
      "Advanced API features",
      "Custom integrations",
      "Webhook notifications",
      "Analytics dashboard",
    ],
    button: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    desc: "Production plans with SLAs",
    price: "Custom",
    period: "",
    features: [
      "Unlimited pages",
      "Dedicated infrastructure",
      "24/7 priority support",
      "Enterprise connectors",
      "SSO & advanced security",
      "Custom SLA",
      "Dedicated account manager",
    ],
    button: "Start Pro Trial",
    highlight: false,
  },
];

export default function PricingSection({id}) {
  return (
    <section
      id={id}
      className=" py-16 text-center"
      style={{
        backgroundImage: "url('/assets/images/bg_hero.svg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-3">
        Start <span className="text-purple-600">Integrating</span> Today
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Free tier for development. Production plans include SLAs, higher crawl
        rates, and enterprise connectors.
      </p>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between border rounded-2xl shadow-sm p-8 w-full md:w-80
              ${
                plan.highlight
                  ? "bg-[#EDE8FF] border-purple-300 shadow-xl scale-105"
                  : "bg-[#EDE8FF] border-gray-200"
              }
              hover:shadow-lg transition-all duration-300`}
          >
            {/* Header */}
            <div>
              <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
              <p className="text-gray-500 mb-6">{plan.desc}</p>

              {/* Price */}
              <div className="text-4xl font-bold mb-4">
                {plan.price}
                <span className="text-base font-normal text-gray-500">
                  {plan.period}
                </span>
              </div>

              {/* Button */}
              <button
                className={`w-full py-2 rounded-md border transition cursor-pointer ${
                  plan.highlight
                    ? "bg-gradient-to-r from-[#DF00DB] to-[#7C3BED] text-white hover:bg-[#b700b8]"
                    : "border-gray-400 hover:bg-[#EDE8FF]"
                }`}
              >
                {plan.button}
              </button>

              {/* Features */}
              <ul className="mt-8 space-y-3 text-gray-700 text-sm text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-purple-500">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

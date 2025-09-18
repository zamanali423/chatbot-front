"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Globe, Layers, Server, Send } from "lucide-react";
import { useRouter } from "next/navigation";

// Drop this file into your Next.js project as pages/index.jsx (or /app/page.jsx for app router).
// Requires: tailwindcss + framer-motion + lucide-react installed.

export default function Introduction() {
  const [openDemo, setOpenDemo] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi — ask me about any website or data source. I can scrape and answer intelligently.",
    },
  ]);
  const router = useRouter();
  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "Nice question — I can fetch that data, summarize it, and even embed in your site.",
        },
      ]);
    }, 900);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eef2f6] to-white text-[#0f1724]">
      {/* NAV */}

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-12">
        <div>
          <motion.h1
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight"
          >
            Build chatbots that can <span className="text-[#2D5BE3]">read</span>
            , <span className="text-[#FFC107]">scrape</span>, and{" "}
            <span className="text-[#2D5BE3]">integrate</span> with any website.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-600 max-w-xl"
          >
            Scrape structured data, transform it into conversational knowledge,
            and embed a smart chatbot on partner sites or internal tools with
            minimal code. Privacy-first, scalable, and developer-friendly.
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setOpenDemo(true)}
              className="inline-flex items-center gap-2 bg-[#2D5BE3] text-white px-5 py-3 rounded-lg shadow hover:scale-[1.02]"
            >
              <Send size={16} /> Try demo
            </button>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 border border-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50"
            >
              Pricing
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-[#2D5BE3]" />
              <div>
                <div className="font-semibold">Real-time</div>
                <div className="text-xs">Live scraping & updates</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe size={18} className="text-[#2D5BE3]" />
              <div>
                <div className="font-semibold">Global</div>
                <div className="text-xs">Cross-domain connectors</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Layers size={18} className="text-[#2D5BE3]" />
              <div>
                <div className="font-semibold">Composable</div>
                <div className="text-xs">Plug into any frontend</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Server size={18} className="text-[#2D5BE3]" />
              <div>
                <div className="font-semibold">Secure</div>
                <div className="text-xs">Tokenized access & audit logs</div>
              </div>
            </div>
          </div>
        </div>

        {/* MOCK PHONE / CHATCARD */}
        <div className="flex justify-center md:justify-end">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">ScrapeChat</div>
                <div className="text-xs text-gray-400">
                  Connected to: brainscraft.com
                </div>
              </div>
              <div className="text-xs text-gray-500">Live</div>
            </div>

            <div className="mt-4 h-[360px] overflow-y-auto pr-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`mb-3 flex ${
                    m.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      m.from === "user"
                        ? "bg-[#2D5BE3] text-white"
                        : "bg-gray-100 text-gray-800"
                    } max-w-[80%] p-3 rounded-xl`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the connected site..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
              />
              <button
                onClick={sendMessage}
                className="bg-[#2D5BE3] text-white px-4 py-2 rounded-lg"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Smart Scrapers"
            text="Auto-detect tables & lists, structured output (JSON/CSV), and scheduled crawls."
          />
          <FeatureCard
            title="Conversational Memory"
            text="Context-aware answers built from live site data and historical queries."
          />
          <FeatureCard
            title="Easy Integration"
            text="Embed with one script, SDKs for React / Next.js / Node and partner connectors."
          />
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="max-w-7xl mx-auto px-6 py-8 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Trusted integrations</h3>
          <a className="text-sm text-[#2D5BE3]">See all</a>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center text-gray-500">
          <div className="p-4 bg-gray-50 rounded-lg text-center">Shopify</div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">WordPress</div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">Stripe</div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            Custom API
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-white to-[#f9fafb] rounded-2xl p-8 shadow-md grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h4 className="text-2xl font-bold">Start integrating today</h4>
            <p className="text-gray-600 mt-3">
              Free tier for development. Production plans include SLAs, higher
              crawl rates, and enterprise connectors.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                className="bg-[#2D5BE3] text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => router.push("/auth/register")}
              >
                Get started - Free
              </button>
              <button className="border border-gray-200 px-4 py-2 rounded-md cursor-pointer">
                Contact sales
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="text-sm">Starter</div>
              <div className="text-2xl font-bold mt-1">$0 / mo</div>
              <div className="text-xs text-gray-500 mt-2">
                Up to 1k pages / month
              </div>
            </div>

            <div className="p-4 border border-gray-100 rounded-lg shadow-sm">
              <div className="text-sm">Pro</div>
              <div className="text-2xl font-bold mt-1">$49 / mo</div>
              <div className="text-xs text-gray-500 mt-2">
                Priority crawls & webhook delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO MODAL */}
      {openDemo && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold">Live demo — Embedded chatbot</div>
              <button
                onClick={() => setOpenDemo(false)}
                className="text-gray-400"
              >
                Close
              </button>
            </div>

            <div className="mt-4">
              <p className="text-gray-600">
                This demo simulates a small embedded chatbot. Replace this
                component with your real integration and websocket or API layer.
              </p>

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`mb-3 flex ${
                      m.from === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`${
                        m.from === "user"
                          ? "bg-[#2D5BE3] text-white"
                          : "bg-white text-gray-800 border border-gray-100"
                      } max-w-[80%] p-3 rounded-xl`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                <div className="mt-4 flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a question..."
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-[#2D5BE3] text-white px-4 py-2 rounded-lg"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-gray-500 mt-2">{text}</div>
    </motion.div>
  );
}

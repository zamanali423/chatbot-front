"use client";
import { motion } from "framer-motion";
import { ArrowRight, Database, MoveRight, Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection = ({ id }) => {
  const router = useRouter();

  return (
    <section
      id={id}
      className="flex flex-col items-center text-center px-4 sm:px-6 md:px-10 lg:px-20 py-28"
      style={{
        backgroundImage: "url('/assets/images/bg_hero.svg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Title Badge */}
      <motion.div
        className="flex items-center gap-2 border border-[#edf1fe] px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#edf1fe]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Sparkles className="text-[#DF00DB] w-4 h-4 sm:w-5 sm:h-5" />
        <p className="text-[#DF00DB] text-xs sm:text-sm md:text-base font-medium">
          Next-Generation AI Chatbot Platform
        </p>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight text-[#212529]"
      >
        Transform Websites <br className="hidden sm:block" /> Into{" "}
        <span className="text-[#DF00DB]">Intelligent</span> Conversations
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed"
      >
        Scrape any data source, build conversational AI that understands{" "}
        <br className="hidden sm:block" />
        context and deploy enterprise-ready chatbots in minutes, not months.
      </motion.p>

      {/* Call to Action Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => router.push("/auth/register")}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DF00DB] to-[#7C3BED] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow hover:scale-[1.03] transition-all cursor-pointer text-sm sm:text-base"
        >
          Start Building Free <MoveRight size={18} />
        </button>
      </div>

      {/* Showcase Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-12 w-full max-w-6xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-200 overflow-hidden"
      >
        {/* Browser Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-2">
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-3 text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium bg-gray-50 border border-gray-200 px-2 py-1 rounded-full truncate">
            https://your-site.com/chat
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col">
            <div className="flex items-center gap-2 p-2 sm:p-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#eee5ee] flex items-center justify-center">
                <Database className="w-5 h-5 text-[#DF00DB]" />
              </div>
              <h4 className="font-semibold text-[#212529] text-base sm:text-lg">
                Data Source
              </h4>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              {[
                { title: "Products API", desc: "Scraping live data..." },
                { title: "Documentation", desc: "Indexed 1,234 pages" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {item.desc}
                    </p>
                  </div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push("/auth/register")}
              className="mt-4 flex gap-2 items-center bg-white text-gray-600 border border-gray-200 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg shadow hover:bg-gray-50 transition w-fit text-sm sm:text-base"
            >
              <Plus size={18} /> Add more sources
            </button>
          </div>

          {/* Right Column */}
          <div className="md:col-span-8 rounded-xl border border-gray-200 shadow-inner bg-white flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-[#F5F7FA] px-3 sm:px-4 py-2 sm:py-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#DF00DB] to-[#7C3BED] flex items-center justify-center text-white font-semibold">
                  <Sparkles size={16} />
                </div>
                <h3 className="text-gray-800 font-semibold text-xs sm:text-sm">
                  AI Assistant
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] sm:text-xs text-green-600 font-medium">
                  Live
                </span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto text-xs sm:text-sm text-gray-700 space-y-4 max-h-[300px] sm:max-h-[400px] md:max-h-[450px]">
              {/* Example messages */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-[#2D5BE3] text-white rounded-full flex items-center justify-center text-xs font-bold">
                  AI
                </div>
                <div className="bg-gray-100 p-3 rounded-xl text-left">
                  <p>
                    👋 Hi there! I’m your AI assistant trained on your business
                    data. Would you like me to generate a chatbot trained on
                    your business data?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 justify-end">
                <div className="bg-[#DF00DB] text-white p-3 rounded-xl max-w-[75%]">
                  <p>Yes, that would be great.</p>
                </div>
                <div className="w-8 h-8 bg-[#2D5BE3] text-white rounded-full flex items-center justify-center text-xs font-bold">
                  U
                </div>
              </div>
            </div>

            {/* Input box */}
            <div className="p-2 sm:p-3 flex items-center gap-2 border-t border-gray-200">
              <input
                type="text"
                placeholder="Type your query..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]"
              />
              <button className="bg-gradient-to-r from-[#DF00DB] to-[#7C3BED] text-white px-3 sm:px-4 py-2 rounded-md hover:opacity-90 transition">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

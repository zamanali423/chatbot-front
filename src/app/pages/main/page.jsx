"use client";

import React from "react";
import { MessageCircle, Ticket, BookOpen, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CenteredCards() {
  const router = useRouter();
  const cards = [
    {
      id: 1,
      title: "Live Chat",
      text: "Add live chat to your website",
      icon: <MessageCircle className="w-8 h-8" />,
      link: "/pages/add-website",
    },
    {
      id: 2,
      title: "Ticketing",
      text: "Ticket management made easy",
      icon: <Ticket className="w-8 h-8" />,
      link: "/pages/main",
    },
    {
      id: 3,
      title: "Knowledge Base",
      text: "Help customers help themselves",
      icon: <BookOpen className="w-8 h-8" />,
      link: "/pages/main",
    },
    {
      id: 4,
      title: "Analytics",
      text: "Actionable metrics that help you improve over time.",
      icon: <BarChart3 className="w-8 h-8" />,
      link: "/pages/main",
    },
  ];

  const nextPage = (link) => {
    router.push(link);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#EEF2F6] p-6">
      <div className="w-full max-w-4xl text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-[#2D5BE3]">
          Which product would you like to setup first?
        </h1>
        <p className="mt-3 text-sm text-[#212529] max-w-2xl mx-auto">
          Clear, concise features shown below!
        </p>

        {/* Cards grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((c) => (
            <article
              key={c.id}
              className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              aria-labelledby={`card-${c.id}-title`}
              onClick={() => nextPage(c.link)}
            >
              {/* Icon left */}
              <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-tr from-[#2D5BE3] to-[#6B8CFF] flex items-center justify-center text-white">
                {c.icon}
              </div>

              {/* Right content */}
              <div className="text-left">
                <h3
                  id={`card-${c.id}-title`}
                  className="text-lg font-medium text-[#212529]"
                >
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-[#6C757D]">{c.text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        {/* <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D5BE3] text-white font-medium shadow hover:brightness-95 transition"
          >
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div> */}
      </div>
    </section>
  );
}

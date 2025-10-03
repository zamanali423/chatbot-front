import React from "react";

// AiThinkingLoader - A sleek "AI thinking / analyzing" loader designed with TailwindCSS.
// Default usage:
// <AiThinkingLoader message="Analyzing..." />

export default function AiThinkingLoader({
  size = 128,
  message = "Analyzing with AI",
}) {
  const svgSize = size;
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex w-full max-w-xl mx-auto flex-col items-center justify-center gap-6 p-6"
    >
      {/* Container with subtle frosted glass look */}
      <div className="relative flex items-center justify-center">
        {/* Soft glowing backdrop ring */}
        <span className="absolute -inset-6 rounded-2xl bg-gradient-to-r from-blue-400/30 via-indigo-300/20 to-purple-400/25 blur-[24px] pointer-events-none" />

        {/* Main card */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/80 backdrop-blur-md p-6 shadow-2xl">
          {/* Animated brain / core SVG */}
          <div className="flex items-center justify-center">
            <svg
              width={svgSize}
              height={svgSize}
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="-rotate-6"
            >
              {/* Outer rotating ring */}
              <g className="animate-rotate-slow">
                <circle
                  cx="60"
                  cy="60"
                  r="44"
                  stroke="url(#grad)"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
              </g>

              {/* Brain-like blob (soft morph animation) */}
              <g className="animate-morph">
                <path
                  d="M45 35c8-8 30-14 40 0 8 12 2 28-6 32-12 6-24 6-36 0-6-3-12-17-4-32z"
                  fill="url(#coreGrad)"
                  fillOpacity="0.95"
                />
              </g>

              {/* Small orbiting dots (thinking particles) */}
              <g>
                <circle
                  cx="18"
                  cy="60"
                  r="2.5"
                  className="animate-orbit delay-0"
                  fill="#60A5FA"
                />
                <circle
                  cx="102"
                  cy="60"
                  r="2.5"
                  className="animate-orbit delay-200"
                  fill="#A78BFA"
                />
                <circle
                  cx="60"
                  cy="18"
                  r="2.5"
                  className="animate-orbit delay-400"
                  fill="#34D399"
                />
              </g>

              <defs>
                <linearGradient id="grad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#F472B6" />
                </linearGradient>
                <linearGradient id="coreGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#EEF2FF" />
                  <stop offset="100%" stopColor="#E9D5FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Animated text + dots */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-800">{message}</h3>

              {/* three pulsing dots */}
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400 animate-pulse-dot delay-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400 animate-pulse-dot delay-150" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400 animate-pulse-dot delay-300" />
              </div>
            </div>

            {/* subtle progress bar (indeterminate) */}
            <div className="w-48 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full w-24 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-pink-400 animate-scroll" />
            </div>
          </div>
        </div>
      </div>

      {/* Accessible live region for screen readers: announces when loader mounts */}
      <span className="sr-only" aria-hidden="false">
        {message} — please wait
      </span>

      {/* Inline styles for animations (kept local so you don't need to edit tailwind config) */}
      <style jsx>{`
        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes morph {
          0% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.05) translateY(-4px);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }
        @keyframes orbit {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateX(0) translateY(-6px) scale(1.2);
            opacity: 0.85;
          }
          100% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes pulse-dot {
          0% {
            transform: scale(0.9);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
          }
          100% {
            transform: scale(0.9);
            opacity: 0.6;
          }
        }
        @keyframes scroll {
          0% {
            transform: translateX(-10%);
          }
          50% {
            transform: translateX(30%);
          }
          100% {
            transform: translateX(-10%);
          }
        }

        .animate-rotate-slow {
          animation: rotate-slow 8s linear infinite;
          transform-origin: 60px 60px;
        }
        .animate-morph {
          animation: morph 2.6s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-orbit {
          animation: orbit 1.8s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-pulse-dot {
          animation: pulse-dot 1s ease-in-out infinite;
          display: inline-block;
        }
        .animate-scroll {
          animation: scroll 2.4s ease-in-out infinite;
        }

        .delay-0 {
          animation-delay: 0ms;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }

        /* small responsive tweak */
        @media (max-width: 420px) {
          div[role="status"] svg {
            width: 96px !important;
            height: 96px !important;
          }
        }
      `}</style>
    </div>
  );
}

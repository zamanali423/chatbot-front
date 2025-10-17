import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const LevelUpSection = () => {
  const router = useRouter();
  return (
    <section className="relative flex justify-center items-center py-16 px-6 sm:px-10 lg:px-20 overflow-hidden">
      {/* --- MAIN CARD --- */}
      <div className="relative w-full max-w-6xl bg-[#EDE8FF]/80 backdrop-blur-md rounded-3xl shadow-lg flex flex-col md:flex-row items-start justify-between gap-10 md:gap-16 p-6 md:p-6 lg:p-8 overflow-visible">
        {/* --- TEXT CONTENT --- */}
        <div className="flex-1 z-10 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Ready To Level Up?
          </h2>

          <p className="text-gray-700 text-base sm:text-lg mb-8 max-w-md">
            Early access is limited — lock in your spot in the waitlist today!
          </p>

          {/* --- BUTTONS --- */}
          <div className="flex flex-wrap gap-4">
            <button
              className="bg-[#DF00DB] text-white px-6 py-3 rounded-md font-medium hover:bg-[#b700b8] transition cursor-pointer"
              onClick={() => router.push("/auth/register")}
            >
              Get Early Access
            </button>
            <button className="border border-gray-400 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* --- IMAGE FLOATING OUTSIDE TOP RIGHT --- */}
      <div className="absolute top-6 right-4 sm:top-8 sm:right-8 md:top-10 md:right-12 lg:top-12 lg:right-20 xl:top-14 xl:right-28 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72">
        <Image
          src="/assets/images/gpt.svg"
          alt="Robot Illustration"
          fill
          className="object-contain drop-shadow-xl"
          priority
        />
      </div>
    </section>
  );
};

export default LevelUpSection;

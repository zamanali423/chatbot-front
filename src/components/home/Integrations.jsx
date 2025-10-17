"use client";
import React from "react";
import Image from "next/image";

const Integrations = ({ id }) => {
  const images = [
    "/assets/icons/Group-153-(1).svg",
    "/assets/icons/Group-153-(2).svg",
    "/assets/icons/Group-153-(3).svg",
    "/assets/icons/Group-153-(4).svg",
    "/assets/icons/Group-153-(5).svg",
    "/assets/icons/Group-153-(6).svg",
    "/assets/icons/Group-153-(7).svg",
    "/assets/icons/Group-153-(8).svg",
    "/assets/icons/Group-153-(9).svg",
    "/assets/icons/Group-153-(10).svg",
    "/assets/icons/Group-153-(11).svg",
    "/assets/icons/Group-153-(12).svg",
    "/assets/icons/Group-153-(13).svg",
    "/assets/icons/Group-153-(14).svg",
    "/assets/icons/Group-153-(15).svg",
    "/assets/icons/Group-153-(1).svg",
    "/assets/icons/Group-153-(2).svg",
    "/assets/icons/Group-153-(3).svg",
    "/assets/icons/Group-153-(4).svg",
    "/assets/icons/Group-153-(5).svg",
  ];

  return (
    <section id={id} className="py-8 md:py-12 lg:py-16 px-6 bg-white text-center">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
        Trusted{" "}
        <span className="bg-gradient-to-r from-[#7C3BED] to-[#DF00DB] bg-clip-text text-transparent">
          Integrations
        </span>
      </h2>

      {/* Image Grid */}
      <div
        className="
          flex
          flex-wrap
          justify-center
          items-center
          max-w-4xl 
          mx-auto
          gap-2
        "
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="
              w-20 h-20 
              bg-[#FAF5FF] 
              rounded-2xl 
              shadow-sm 
              flex 
              items-center 
              justify-center 
              hover:scale-105 
              transition-transform 
              duration-300
            "
          >
            <Image
              src={src}
              alt={`Integration ${index + 1}`}
              width={52}
              height={30}
              className="w-10 h-10 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Integrations;

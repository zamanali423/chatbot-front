"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturesSection = ({ id }) => {
  const features = [
    {
      title: "Real Time",
      desc: "Your chatbot stays instantly updated with your latest data no manual retraining needed. Continuously monitor and update your data sources in real-time",
      link: "/auth/register",
      image: "/assets/images/real_time.svg",
      bgColor: "#EDE8FF",
    },
    {
      title: "Global",
      desc: "Deploy your chatbot anywhere in any language, across any region. ScrapeChat is built to support global businesses, ensuring smooth interactions for users around the world.",
      link: "/auth/register",
      image: "/assets/images/global.svg",
      bgColor: "#EDE8FF",
      },
    {
      title: "Composable",
      desc: "Your data stays private and protected with enterprise-grade encryption and SOC 2 compliance every chat is 100% secure.",
      link: "/auth/register",
      image: "/assets/images/composable.svg",
      bgColor: "#E4F6FF",
    },
    {
      title: "Secure",
      desc: "Build it your way ScrapeChat’s composable architecture lets you customize, extend, and integrate AI chatbots seamlessly into any workflow.",
      link: "/auth/register",
      image: "/assets/images/secure.svg",
      bgColor: "#EDE8FF",
    },
  ];

  return (
    <section
      id={id}
      className="py-16 px-6 text-center"
      style={{
        backgroundImage: "url('/assets/images/bg_features.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Built For <span className="text-[#DF00DB]">Performance</span>
      </h2>

      {/* Paragraph */}
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Real-time data, global reach and enterprise-grade security all in one
        platform.
      </p>

      {/* Feature Boxes */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-2 
          gap-8 
          mt-12 
          max-w-6xl 
          mx-auto
        "
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative rounded-3xl shadow-md p-8 overflow-hidden hover:shadow-xl transition-all duration-300"
            style={{ backgroundColor: feature.bgColor }}
          >
            {/* Text Section */}
            <div className="z-10 relative flex flex-col items-start text-left max-w-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-left">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base mb-4 text-left leading-relaxed">
                {feature.desc}
              </p>
              <Link
                href={feature.link}
                className="text-[#DF00DB] font-medium hover:underline text-left"
              >
                Sign Up Now →
              </Link>
            </div>

            {/* Image Positioned Bottom Right */}
            <div className="absolute bottom-0 right-4 w-40 h-40 md:w-44 md:h-44">
              <Image
                src={feature.image}
                alt={feature.title}
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

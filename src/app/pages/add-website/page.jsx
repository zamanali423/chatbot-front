"use client";
import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function Add_Website() {
  const router = useRouter();
  const nextPage = () => {
    router.push("/pages/customize-widget");
  };
  return (
    <div className="min-h-[80vh] flex bg-[#EEF2F6]">
      {/* Left Sidebar */}
      <Sidebar height="80vh"/>

      {/* Right Content */}
      <main className="flex-1 flex flex-col justify-between p-10">
        {/* Title + Search Bar */}
        <div className="flex flex-col justify-center h-[50vh]">
          <h1 className="text-2xl font-semibold text-[#2D5BE3]">
            What's your website address?
          </h1>
          <div className="mt-6 flex items-center bg-white rounded-full shadow-md overflow-hidden max-w-lg">
            <input
              type="text"
              placeholder="https://"
              className="flex-1 px-4 py-3 text-sm text-[#212529] focus:outline-none"
            />
            <button
              className="px-4 py-3 bg-[#2D5BE3] text-white hover:brightness-95 transition"
              onClick={nextPage}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="flex justify-between items-center mt-10">
          <button className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5F7FA] text-[#212529] shadow hover:bg-[#E4E9F0] transition">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2D5BE3] text-white shadow hover:brightness-95 transition">
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}

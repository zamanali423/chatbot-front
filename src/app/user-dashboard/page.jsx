"use client";
import { useState, useEffect } from "react";
import ScrapingForm from "./components/ScrapingForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import CopyScriptSection from "./components/CopyScriptSection";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [openForm, setOpenForm] = useState(false);
  const [showIntegrateLink, setShowIntegrateLink] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = Cookies.get("token");
  const { data: scrapedData, isLoading } = useQuery({
    queryKey: ["scrapedData"],
    enabled: !!token,
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/scraper/scrape-all`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    },
  });

  const handleWebsiteIntegrateLink = () => {
    if (!scrapedData?.length) return alert("Please add a website link first.");
    setShowIntegrateLink(true);
  };

  // ⛔ Avoid SSR mismatch
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Scraping Data
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition cursor-pointer"
            >
              Add New
            </button>
            <button
              onClick={handleWebsiteIntegrateLink}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition cursor-pointer"
            >
              Integration Link
            </button>
          </div>
        </div>

        <CopyScriptSection
          showIntegrateLink={showIntegrateLink}
          scrapedData={scrapedData}
          setShowIntegrateLink={setShowIntegrateLink}
        />

        {/* {showIntegrateLink && scrapedData[scrapedData.length - 1] && (
          <p className="text-center text-blue-600 font-semibold mb-6">
            Copy this link and paste in your website:{" "}
            <span
              className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(
                  `<script src="${process.env.NEXT_PUBLIC_CHATBOT_URL}/widget.js" async></script>`
                )
              }
            >
              {`<script src="${process.env.NEXT_PUBLIC_CHATBOT_URL}/widget.js" async></script>`}
            </span>
          </p>
        )} */}
        {/* Responsive Table */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="overflow-x-auto w-[95vw] max-w-full hide-scrollbar">
            <table className="w-full table-auto border-collapse text-sm">
              {/* Table Head */}
              <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white sticky top-0 shadow-md">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">Name</th>
                  <th className="py-4 px-6 text-left font-semibold">Email</th>
                  <th className="py-4 px-6 text-left font-semibold">Phone</th>
                  <th className="py-4 px-6 text-left font-semibold">
                    Headlines
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">About</th>
                  <th className="py-4 px-6 text-left font-semibold">
                    Social Links
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">Slogen</th>
                  <th className="py-4 px-6 text-left font-semibold">
                    Website URL
                  </th>
                  <th className="py-4 px-6 text-center font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}

              <tbody>
                {scrapedData?.map((data, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition border-b last:border-b-0"
                  >
                    <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                      <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                        {data.name ? data.name : "N/A"}
                      </div>
                    </td>

                    <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                      <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                        {data.email ? data.email : "N/A"}
                      </div>
                    </td>

                    <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                      <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                        {data.phone ? data.phone : "N/A"}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                      <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                        {data.headlines ? data.headlines : "N/A"}
                      </div>
                    </td>

                    {/* About field with horizontal scrolling if too long */}
                    <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                      <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                        {data.about ? data.about : "N/A"}
                      </div>
                    </td>

                    {/* Social links */}
                    <td className="py-4 px-6 font-medium text-blue-600 max-w-[250px]">
                      <div className="flex flex-col gap-1 whitespace-nowrap">
                        {data.socialLinks?.length > 0
                          ? data.socialLinks?.map((link, i) => (
                              <a
                                key={i}
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                              >
                                {link.includes("facebook")
                                  ? "Facebook"
                                  : link.includes("youtube")
                                  ? "YouTube"
                                  : link.includes("instagram")
                                  ? "Instagram"
                                  : "Link"}
                              </a>
                            ))
                          : "N/A"}
                      </div>
                    </td>

                    <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                      <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                        {data.slogan ? data.slogan : "N/A"}
                      </div>
                    </td>

                    <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                      <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                        <a
                          href={data.url}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Website
                        </a>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-xs font-medium hover:bg-red-200 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {openForm && <ScrapingForm setOpenForm={setOpenForm} />}
    </div>
  );
}

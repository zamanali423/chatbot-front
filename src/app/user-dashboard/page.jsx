"use client";
import { useState, useEffect } from "react";
import ScrapingForm from "./components/ScrapingForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import CopyScriptSection from "./components/CopyScriptSection";
import Cookies from "js-cookie";
import ShowWebsiteData from "./components/ShowWebsiteData";
import AiThinkingLoader from "./components/AiThinkingLoader";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const AllWebsitesData = dynamic(() => import("./components/AllWebsitesData"), {
  ssr: false,
});

export default function Dashboard() {
  const [openForm, setOpenForm] = useState(false);
  const [showIntegrateLink, setShowIntegrateLink] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [mounted, setMounted] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isBotloading, setisBotLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = Cookies.get("token");
  const {
    data: scrapedData,
    isLoading,
    refetch,
  } = useQuery({
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AiThinkingLoader message="Analyzing website with AI" />
      </div>
    );
  }
  if (isBotloading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AiThinkingLoader message="Creating your Ai assistant" />
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
            {/* <button
              onClick={handleWebsiteIntegrateLink}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition cursor-pointer"
            >
              Integration Link
            </button> */}
          </div>
        </div>

        <CopyScriptSection
          showIntegrateLink={showIntegrateLink}
          setShowIntegrateLink={setShowIntegrateLink}
          websiteUrl={websiteUrl}
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
        <Suspense fallback={<Loader2 className="animate-spin" size={40} />}>
          <AllWebsitesData
            scrapedData={scrapedData}
            token={token}
            refetch={refetch}
            setSelectedWebsite={setSelectedWebsite}
            setShowIntegrateLink={setShowIntegrateLink}
            isBotloading={isBotloading}
            setisBotLoading={setisBotLoading}
            setWebsiteUrl={setWebsiteUrl}
          />
        </Suspense>
      </main>

      {openForm && (
        <ScrapingForm setOpenForm={setOpenForm} setLoading={setLoading} />
      )}

      {/* Detail Modal */}
      {selectedWebsite && (
        <ShowWebsiteData
          selectedWebsite={selectedWebsite}
          setSelectedWebsite={setSelectedWebsite}
        />
      )}
    </div>
  );
}

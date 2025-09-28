"use client";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";

export default function ScrapingForm({ setOpenForm }) {
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = Cookies.get("token");
    try {
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/scraper?url=${website}&category=${category}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data, status);
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Overlay */}
      <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
        {/* Modal */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">
          {/* Close Button */}
          <button
            onClick={() => setOpenForm(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          {/* Header */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Integration Setup
          </h1>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Website URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
                placeholder="https://example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                placeholder="e.g e-commerce,education"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin mx-auto block" size={20} />
                ) : (
                  "Start Integration"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

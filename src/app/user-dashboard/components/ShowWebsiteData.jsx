import React from "react";
import { X, Globe, Mail, Phone, Link2, Users } from "lucide-react";

const ShowWebsiteData = ({ selectedWebsite, setSelectedWebsite }) => {
  if (!selectedWebsite) return null;

  // ❌ Links to exclude from "Pages" section
  const excludedLinks = [
    "home",
    "about",
    "services",
    "projects",
    "contact",
    "faq",
    "faqs",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur background */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setSelectedWebsite(null)}
      />

      <div className="relative z-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6 hide-scrollbar">
        {/* Close Button */}
        <button
          onClick={() => setSelectedWebsite(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Website Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-gray-700">
              <Globe size={16} className="text-blue-500" />
              <a
                href={selectedWebsite.url}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                {selectedWebsite.url}
              </a>
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Mail size={16} className="text-blue-500" />
              {selectedWebsite.email || "N/A"}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Phone size={16} className="text-blue-500" />
              {selectedWebsite.phone || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Category:</span>{" "}
              {selectedWebsite.category || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Slogan:</span>{" "}
              {selectedWebsite.slogan || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">All Links:</span>{" "}
              {selectedWebsite?.links?.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-gray-700 max-h-[150px] overflow-y-auto pr-2 hide-scrollbar">
                  {selectedWebsite.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                "N/A"
              )}
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <p>
              <span className="font-semibold text-gray-800">About:</span>{" "}
              {selectedWebsite.about || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Headlines:</span>{" "}
              {selectedWebsite.headlines || "N/A"}
            </p>

            <div>
              <span className="font-semibold text-gray-800">Social Links:</span>
              <div className="flex gap-2 mt-1 flex-wrap">
                {selectedWebsite.socialLinks?.length > 0
                  ? selectedWebsite.socialLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs hover:bg-blue-100"
                      >
                        {link.includes("facebook")
                          ? "Facebook"
                          : link.includes("instagram")
                          ? "Instagram"
                          : link.includes("youtube")
                          ? "YouTube"
                          : "Link"}
                      </a>
                    ))
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Users size={18} className="text-blue-500" /> Portfolio
          </h3>
          {selectedWebsite.team?.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700 max-h-[150px] overflow-y-auto pr-2 hide-scrollbar">
              {selectedWebsite.team
                .filter(
                  (p) =>
                    p.name &&
                    !excludedLinks.some((ex) =>
                      p.name.toLowerCase().includes(ex)
                    )
                )
                .map((member, i) => (
                  <li key={i}>
                    {member.name} {member.role && <span>({member.role})</span>}{" "}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-blue-600 hover:underline ml-1"
                      >
                        {member.email}
                      </a>
                    )}
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500">No portfolio data</p>
          )}
        </div>

        {/* Pages Data */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Link2 size={18} className="text-blue-500" /> Complete Website Data
          </h3>
          <div className="text-sm text-gray-700 space-y-1 max-h-[200px] overflow-y-auto pr-2 hide-scrollbar">
            {selectedWebsite?.pages?.length > 0
              ? selectedWebsite?.pages?.map((p, i) => (
                  <p key={i} className="border-b pb-1">
                    {p.texts}
                  </p>
                ))
              : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowWebsiteData;

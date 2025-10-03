"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Dashboard({
  scrapedData,
  token,
  refetch,
  setSelectedWebsite,
  setShowIntegrateLink,
  setisBotLoading,
  setWebsiteUrl,
}) {
  const router = useRouter();

  const handleWebsiteIntegrateLink = (data) => {
    if (!scrapedData?.length) return alert("Please add a website link first.");
    setShowIntegrateLink(true);
    setWebsiteUrl(data.url);
  };

  const handleCustomizeChatbot = (data) => {
    if (!scrapedData?.length) return alert("Please add a website link first.");
    router.push(`/user-dashboard/chatbot-customization?website=${data.url}`);
  };

  const handleCreateAssistant = async (data) => {
    try {
      setisBotLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/assistants/create?url=${data.url}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        toast.error("Assistant not created due to server issue");
        return;
      }
      toast.success("Assistant created successfully");
      await refetch();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setisBotLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="overflow-x-auto w-[95vw] max-w-full hide-scrollbar">
        <table className="w-full table-auto border-collapse text-sm">
          {/* Table Head */}
          <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white sticky top-0 shadow-md">
            <tr>
              <th className="py-4 px-6 text-left font-semibold">Status</th>
              <th className="py-4 px-6 text-left font-semibold">Name</th>
              <th className="py-4 px-6 text-left font-semibold">Email</th>
              <th className="py-4 px-6 text-left font-semibold">Phone</th>
              <th className="py-4 px-6 text-left font-semibold">Headlines</th>
              <th className="py-4 px-6 text-left font-semibold">About</th>
              <th className="py-4 px-6 text-left font-semibold">
                Social Links
              </th>
              <th className="py-4 px-6 text-left font-semibold">Slogen</th>
              <th className="py-4 px-6 text-left font-semibold">Website URL</th>
              <th className="py-4 px-6 text-left font-semibold">Category</th>
              <th className="py-4 px-6 text-left font-semibold">All Links</th>
              <th className="py-4 px-6 text-left font-semibold">Portfolio</th>
              <th className="py-4 px-6 text-left font-semibold">
                Website Data
              </th>
              <th className="py-4 px-6 text-center font-semibold">Action</th>
              <th className="py-4 px-6 text-center font-semibold">
                Customization
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
                {/* Status */}
                <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                  <div
                    className={`px-2 py-1 rounded text-xs font-semibold text-center w-fit
                           ${
                             data?.status === "Live"
                               ? "bg-green-200 text-green-500"
                               : "bg-blue-200 text-blue-500"
                           }
                         `}
                  >
                    {data?.status}
                  </div>
                </td>
                {/* Name */}
                <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                  <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                    {data.name ? data.name : "N/A"}
                  </div>
                </td>

                {/* Email */}
                <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                  <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                    {data.email ? data.email : "N/A"}
                  </div>
                </td>

                {/* Phone */}
                <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                  <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                    {data.phone ? data.phone : "N/A"}
                  </div>
                </td>

                {/* Headlines */}
                <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                  <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                    {data.headlines ? data.headlines : "N/A"}
                  </div>
                </td>

                {/* About */}
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

                {/* Slogen */}
                <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                  <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                    {data.slogan ? data.slogan : "N/A"}
                  </div>
                </td>

                {/* Website */}
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

                {/* Category */}
                <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                  <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                    {data.category ? data.category : "N/A"}
                  </div>
                </td>

                {/* Links Pages */}
                <td className="py-4 px-6 font-medium text-blue-600 max-w-[250px]">
                  <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                    {data.links?.length > 0
                      ? data.links.map((page, i) => (
                          <a
                            key={i}
                            href={page}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            <span className="pl-2">
                              {page} {i < data.links.length - 1 ? "|" : ""}
                            </span>
                          </a>
                        ))
                      : "N/A"}
                  </div>
                </td>

                {/* Team */}
                <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                  <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                    {data.team?.length > 0
                      ? data.team
                          .filter(
                            (member) =>
                              member.name &&
                              ![
                                "about",
                                "home",
                                "contact",
                                "services",
                                "faqs",
                                "projects",
                              ].some((prefix) =>
                                member.name.toLowerCase().startsWith(prefix)
                              )
                          )
                          .map((member, i) => (
                            <span key={i} className="mr-4">
                              <span className="font-normal">{member.name}</span>
                              {member.role && (
                                <span className="text-normal">
                                  {" "}
                                  ({member.role})
                                </span>
                              )}
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="text-blue-600 text-normal hover:underline ml-1"
                                >
                                  {member.email}
                                </a>
                              )}
                              {member.phone && (
                                <span className="text-normal ml-1">
                                  {member.phone}
                                </span>
                              )}
                              {member.socialLinks?.length > 0 && (
                                <span className="ml-1 text-normal text-blue-600">
                                  {member.socialLinks.map((link, j) => (
                                    <a
                                      key={j}
                                      href={link}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="hover:underline ml-1"
                                    >
                                      {link.includes("facebook")
                                        ? "FB"
                                        : link.includes("linkedin")
                                        ? "LinkedIn"
                                        : link.includes("instagram")
                                        ? "INSTA"
                                        : "Link"}
                                    </a>
                                  ))}
                                </span>
                              )}
                              {i < data.team.length - 1 && (
                                <span className="ml-2">|</span>
                              )}
                            </span>
                          ))
                      : "N/A"}
                  </div>
                </td>

                <td className="py-4 px-6 font-medium text-gray-800 max-w-[250px]">
                  <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
                    {data?.pages?.map((pageText) => pageText.texts).join(" | ")}
                  </div>
                </td>

                {/* Action */}
                <td className="py-3 px-6 text-center flex gap-2 justify-center">
                  {data?.status == "Live" ? (
                    <button
                      className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs font-medium hover:bg-green-200 transition cursor-pointer"
                      onClick={() => handleWebsiteIntegrateLink(data)}
                    >
                      Integrate
                    </button>
                  ) : (
                    <button
                      disabled={isBotloading}
                      className={`${
                        isBotloading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-green-200"
                      } bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs font-medium transition`}
                      onClick={() => handleCreateAssistant(data)}
                    >
                      {isBotloading ? "Creating..." : "Create Assistant"}
                    </button>
                  )}
                  <button
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-200 cursor-pointer"
                    onClick={() => setSelectedWebsite(data)}
                  >
                    View Details
                  </button>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs font-medium hover:bg-green-200 transition cursor-pointer"
                    onClick={() => handleCustomizeChatbot(data)}
                  >
                    Customize Chatbot
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

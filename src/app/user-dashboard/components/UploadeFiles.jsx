"use client";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

export default function UploadFiles({ setIsFile, websiteUrl }) {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);

  //upload files only pdf, excel, doc and docx
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB");
        return;
      }
      if (allowedTypes.includes(file.type)) {
        //read all data correctly with special chacters of file then set
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0]; // first sheet
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          console.log(jsonData);
          toast.info("File selected");
          setFileData(jsonData);
        };
        reader.readAsArrayBuffer(file);
      } else {
        toast.error("Please upload a valid file type (PDF, Excel, DOC, DOCX)");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    setLoading(true);
    console.log(fileData, websiteUrl);
    try {
      if (!fileData || !websiteUrl) {
        toast.error("Please select a file and website url");
        return;
      }
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/scraper/upload-file`,
        { fileData: JSON.stringify(fileData), websiteUrl },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("File uploaded successfully");
      console.log(data);
      setIsFile(false);
    } catch (error) {
      toast.error("Something went wrong in server");
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
            onClick={() => setIsFile(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            ✕
          </button>

          <div className="flex flex-col items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 010 10H7z"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold text-blue-600">
                    Upload your file
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  PDF, Excel, DOC, DOCX Max(10MB)
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.xlsx,.xls,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto block" size={20} />
              ) : (
                "Upload"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

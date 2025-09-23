"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );

      if (status === 201) {
        setSuccessMsg("Login successful! Redirecting...");
        Cookies.set("token", data.access_token, {
          expires: 1,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        // Fire a storage event manually to update state without refresh
        window.dispatchEvent(new Event("storage"));
        router.push("/user-dashboard");
      } else {
        setErrorMsg(data?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="max-w-md w-full border-1 border-gray-300 p-6 rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold text-[#2D5BE3]">Login</h2>
          <p className="mt-2 text-gray-600">
            Login to get started with{" "}
            <span className="font-semibold">ScrapeChat</span>
          </p>

          {/* Alert Messages */}
          {errorMsg && (
            <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#2D5BE3] focus:border-[#2D5BE3] outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#2D5BE3] focus:border-[#2D5BE3] outline-none"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D5BE3] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="text-[#2D5BE3] font-medium hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden md:block md:w-1/2 bg-gray-100">
        <Image
          src="/assets/images/login_page.webp"
          alt="Login illustration"
          width={800}
          height={800}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
}

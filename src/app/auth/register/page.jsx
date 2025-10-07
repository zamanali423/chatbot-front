"use client";

import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GoogleLogin } from "@react-oauth/google";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
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
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        formData,
        { withCredentials: true }
      );

      if (status === 201) {
        setSuccessMsg("Account created successfully! Redirecting...");
        router.push("/auth/verify-otp?email=" + formData.email);
      } else {
        setErrorMsg(data?.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`,
      {
        idToken,
      },
      { withCredentials: true }
    );

    console.log("User logged in:", data);
    localStorage.setItem("token", data.access_token);
    router.push("/user-dashboard");
  };

  const handleError = () => {
    console.error("Google login failed");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="max-w-md w-full border border-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-[#2D5BE3]">
            Create an Account
          </h2>
          <p className="mt-2 text-gray-600">
            Sign up to get started with{" "}
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
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#2D5BE3] focus:border-[#2D5BE3] outline-none"
                required
              />
            </div>

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
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-4">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 transition"
            >
              <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-[#2D5BE3] font-medium hover:underline"
            >
              Login
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

"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const COLORS = {
  primary: "#2D5BE3", // same as your backend theme
  secondary: "#F5F7FA",
};

const OTP_LENGTH = 6;

export default function VerifyOTP() {
  const [values, setValues] = useState(Array(OTP_LENGTH).fill(""));
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const inputsRef = useRef([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get("email") || "");
  }, []);

  // useEffect(() => {
  //   // retrieve stored email from localStorage or query param
  //   const storedEmail =
  //     typeof window !== "undefined"
  //       ? localStorage.getItem("verify_email") || ""
  //       : "";
  //   setEmail(storedEmail);
  // }, []);

  useEffect(() => {
    setCooldown(30); // start timer when screen opens
  }, []);

  // Timer effect
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;
    const newValues = [...values];
    newValues[index] = val.slice(-1);
    setValues(newValues);
    if (index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const newValues = [...values];
      newValues[index - 1] = "";
      setValues(newValues);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const resendOtp = async () => {
    try {
      setCooldown(30);
      setError("");
      setSuccess("");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to resend OTP");
      setSuccess("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.message);
    }
  };

  const submitOtp = async () => {
    const otp = values.join("");
    if (otp.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit code.");
      return;
    }
    try {
      setIsSubmitting(true);
      setError("");
      setSuccess("");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid or expired OTP.");

      setSuccess("OTP verified successfully!");
      localStorage.removeItem("verify_email");

      // Optionally redirect after success
      setTimeout(() => {
        window.location.href = "/user-dashboard";
      }, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-full bg-blue-100 p-3">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M12 2v4M7 7h10M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"
                stroke={COLORS.primary}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Verify your email
            </h2>
            <p className="text-sm text-gray-500">
              Enter the 6-digit code sent to{" "}
              <span className="font-medium text-gray-700">{email}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-4">
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => (inputsRef.current[i] = el)}
              value={values[i]}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="h-12 w-full text-center text-xl font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center mb-2">{error}</p>
        )}
        {success && (
          <p className="text-sm text-green-600 text-center mb-2">{success}</p>
        )}

        <button
          onClick={submitOtp}
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg font-semibold text-white shadow transition-colors"
          style={{ backgroundColor: COLORS.primary }}
        >
          {isSubmitting ? "Verifying..." : "Verify & Continue"}
        </button>

        <div className="mt-4 text-sm text-center">
          <p className="text-gray-500">Didn’t receive the code?</p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <button
              onClick={resendOtp}
              disabled={cooldown > 0}
              className={`px-4 py-2 rounded-md font-medium ${
                cooldown > 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white cursor-pointer"
              }`}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
            </button>
            <button
              onClick={() => {
                setValues(Array(OTP_LENGTH).fill(""));
                inputsRef.current[0]?.focus();
              }}
              className="text-sm text-gray-500 underline"
            >
              Clear
            </button>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}

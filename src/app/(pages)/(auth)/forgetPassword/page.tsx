"use client";

import { EmailContext } from "@/app/Context/emailContext";
import { forgotPasswords } from "@/lib/Services/authentication";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
interface EmailContextType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}
export default function ForgetPassword() {
  const { email, setEmail }= useContext(EmailContext)as EmailContextType;
  const router = useRouter();

  async function sendEmail() {
    try {
      const res = await forgotPasswords({"email": email });
       

      router.push("/verifyCode");
    } catch (error) {
      console.error("Error while sending email:", error);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendEmail();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Forgot Password</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your email to reset your password
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-white hover:text-black hover:border-black border text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
}

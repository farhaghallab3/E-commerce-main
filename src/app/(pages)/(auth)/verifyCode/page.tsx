"use client";

import { verfiyCode } from "@/lib/Services/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type VerifyCodeFormData = {
  resetCode: string;
};

export default function VerifyCode() {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeFormData>({
    mode: "onChange",
  });

  const handleVerifyCode: SubmitHandler<VerifyCodeFormData> = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await verfiyCode({ resetCode: formData.resetCode });
      console.log(formData.resetCode, res);
      if (res.status === "Success") {
        toast.success("Code verified successfully!");
        router.push("/resetPassword");
      } else {
        setError(res.message || "Enter Correct Code");
        toast.error(res.message || "Enter Correct Code");
      }
    } catch (err: any) {
      toast.error("Try Again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Verify Code</h2>
        <p className="text-gray-500 text-center mb-6">
          Please enter the verification code sent to your email
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(handleVerifyCode)}>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-gray-700 font-medium mb-2"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              placeholder="Enter your code"
              {...register("resetCode", {
                required: "Verification code is required",
              })}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCode(e.target.value)
              }
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                errors.resetCode ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.resetCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.resetCode.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-black text-white font-medium py-2 px-4 rounded-lg transition ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white hover:text-black hover:border hover:border-black"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              "Verify"
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            📧 Check your email inbox and spam folder for the verification code.
            It expires after 10 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}

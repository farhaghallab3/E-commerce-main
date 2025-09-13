"use client";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signupUserApi } from "@/lib/Services/authentication";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SignupFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>();

  const router = useRouter();

  async function signupUser(data: SignupFormData) {
    console.log("Signup data:", data);

    const res = await signupUserApi(data);
    console.log("Signup response:", res);

    if (res.error) {
      toast.error(res.error);
    } else if (res.message === "success") {
      toast.success("Account created successfully!");
      reset();
      router.push("/login");
    } else if (res.message?.includes("exist")) {
      toast.error("This email is already registered, please try another one.");
    } else {
      toast.error("Signup failed, please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center p-3 min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center text-xl font-semibold py-4">
          Sign Up
        </CardHeader>
        <CardBody>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(signupUser)}
          >
            {/* Name */}
            <Input
              label="Name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* Email */}
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Phone */}
            <Input
              label="Phone"
              placeholder="Enter your phone"
              type="text"
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}

            {/* Password */}
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^[A-Z][A-Za-z0-9!@#$%^&*]{5,}$/,
                  message: "Password must start with a capital letter",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              placeholder="Re-enter your password"
              type="password"
              {...register("rePassword", {
                required: "Please confirm your password",
              })}
            />
            {errors.rePassword && (
              <p className="text-red-500 text-sm">
                {errors.rePassword.message}
              </p>
            )}

            <Button type="submit" color="primary" className="mt-4 w-full">
              Sign Up
            </Button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-green-500 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

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
  const { register, handleSubmit, reset } = useForm<SignupFormData>();
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
            <Input label="Name" placeholder="Enter your name" {...register("name")} />
            <Input label="Email" placeholder="Enter your email" type="email" {...register("email")} />
            <Input label="Phone" placeholder="Enter your phone" type="text" {...register("phone")} />
            <Input label="Password" placeholder="Enter your password" type="password" {...register("password")} />
            <Input label="Confirm Password" placeholder="Re-enter your password" type="password" {...register("rePassword")} />

            <Button type="submit" color="primary" className="mt-4 w-full">
              Sign Up
            </Button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-green-500 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

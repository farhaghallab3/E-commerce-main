"use client";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginUserApi } from "@/lib/Services/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";

type LoginFormData = { email: string; password: string };

export default function LoginForm() {
  const { register, handleSubmit, reset } = useForm<LoginFormData>();
  const router = useRouter();

  async function loginUser(data: LoginFormData) {
    console.log("Login data:", data);

    const res = await loginUserApi(data);
    console.log("Login response:", res);

    if (res.error) {
      toast.error(res.error);
    } else if (res.message === "success") {
      toast.success("Welcome back!");
      reset();
      router.push("/");
    } else {
      toast.error(res.errors?.msg || res.message || "Login failed");
    }
  }

  return (
    <div className="flex items-center justify-center p-3 min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center text-xl font-semibold py-4">
          Sign In
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(loginUser)}>
            <Input label="Email" placeholder="Enter your email" type="email" {...register("email")} />
            <Input label="Password" placeholder="Enter your password" type="password" {...register("password")} />

            <Button type="submit" color="primary" className="mt-4 w-full">
              Sign In
            </Button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-green-500 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
            <p className="mt-2 text-center text-lg">
              <Link href="/forgetPassword" className="text-red-500 hover:text-red-700 font-semibold hover:underline">
                Forget your password?
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

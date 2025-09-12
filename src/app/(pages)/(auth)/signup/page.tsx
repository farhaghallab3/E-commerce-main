"use client";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { registerUserApi } from "@/lib/Services/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
 
  const schema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters"),
      email: z.email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters ")
        .regex(/^[A-Z][a-z]/,"Password must be contain at least one uppercase letter"),
      rePassword: z.string().min(8, "Confirm password is required"),
      phone: z.string().min(11, "Phone must be 11 digits"),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  
  async function registerUser(data: z.infer<typeof schema>) {
    try {
     
    const res=  await registerUserApi(data);
      toast.success("Account created successfully")
      console.log(res)
      router.push("/login");
    } catch (err: any) {
        toast.error(err.message)
    }
  }

  return (
    <div className="flex items-center  p-3  justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md  shadow-lg rounded-2xl">
        <CardHeader className="text-center text-xl font-semibold py-4">
          Create Account
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(registerUser)}>
       
            <div>
              <Input label="Full Name" placeholder="Enter your name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

         
            <div>
              <Input label="Email" placeholder="Enter your email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
 
            <div>
              <Input label="Password" placeholder="Enter your password" type="password" {...register("password")} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

         
            <div>
              <Input
                label="Confirm Password"
                placeholder="Re-enter your password"
                type="password"
                {...register("rePassword")}
              />
              {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <Input label="Phone" placeholder="Enter your phone number" {...register("phone")} />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            
            <Button type="submit" color="primary" className="mt-4 w-full">
              Sign Up
            </Button>
              <p className="mt-4 text-center text-sm text-gray-600">
             Already have an account?
            <Link href="/login" className="text-green-500 font-semibold hover:underline">
              Sing In 
            </Link>
          
          </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

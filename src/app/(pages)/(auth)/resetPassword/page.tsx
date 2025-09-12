"use client";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ResetPassword } from "@/lib/Services/authentication";
import { useContext } from "react";
import { EmailContext } from "@/app/Context/emailContext";
import { useRouter } from "next/navigation";
interface ResetPasswordData {
  email: string;
  newPassword: string;
}
  
export default function RegisterForm() {
   const router=useRouter();
  const { register, handleSubmit, reset  } = useForm<ResetPasswordData>();
const { email } = useContext(EmailContext) as { email: string };
console.log("email",email)
    async function resetPassword(data: ResetPasswordData) {
    try {
      

      const res = await  ResetPassword(data);
  console.log(res)
      if(res.statusMsg==="fail")
         toast.error(res.errors?.msg||res.message );
           
     else{
 toast.success("Successful");
 
                router.push("/");
              reset();
document.cookie = `token=${res.token}; path=/`;
      }
      
    } catch (err:any) {
       
    toast.error(err.message);
   
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center text-xl font-semibold py-4">
         
         Reset Your Password
        </CardHeader>
        <CardBody>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data) => resetPassword(data as ResetPasswordData))}
          >
           
          <Input
  label="Email"
  placeholder="Enter your email"
  type="email"
  isReadOnly
  value={email}  
  {...register("email")}
  className="mb-4"
/>

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("newPassword" )}
            />
            

            <Button type="submit" color="primary" className="mt-4 w-full">
               submit
            </Button>
             
          
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

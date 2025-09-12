'use client'
import { Input, Button, RadioGroup, Radio } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { checkoutCartCredit, checkoutCartCash } from "@/lib/Services/orders";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

 
import { Suspense } from 'react'
 

function CheckoutContent() {
  const searchParams = useSearchParams()
  const cartId = searchParams.get('cartId');
  const route=useRouter();
    const queryClient = useQueryClient();
  
  const [paymentMethod, setPaymentMethod] = useState('cash'); 
  const { register, handleSubmit } = useForm();

  async function sendData(formData: any) {
    if (!cartId) {
      toast.error("Cart ID not found");
      return;
    }
    
    if (paymentMethod === 'credit') {
      const res = await checkoutCartCredit(cartId, { "shippingAddress": formData });
      if (res?.session?.url) {
    window.location.href = res?.session?.url; // ✅ client-safe redirect
  } 
    } else {
      const res = await checkoutCartCash(cartId, { "shippingAddress": formData });
      toast.success("Order placed successfully! You will pay on delivery.");
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      route.push("/allorders")
    }
  }
  
  return (
     <form onSubmit={handleSubmit(sendData)} className="flex flex-col mx-auto md:w-[75%] m-11 gap-6 bg-white rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-center">Order Details</h2>
      
      <Input
        isRequired
        label="Name"
        placeholder="Enter your name"
        className="rounded-2xl"
        {...register('name')}
      />

      <Input
        isRequired
        type="tel"
        label="Phone"
        placeholder="Enter your phone"
        className="rounded-2xl"
        {...register('phone')}
      />

      <Input
        isRequired
        label="City"
        placeholder="Enter your city"
        className="rounded-2xl"
        {...register('city')}
      />
      
      <RadioGroup 
        label="Select your Payment Method"
        value={paymentMethod}
        onValueChange={setPaymentMethod}
      >
        <Radio value="credit">Credit</Radio>
        <Radio value="cash">Cash</Radio>
      </RadioGroup>

      <Button type="submit" color="primary" variant="bordered" className="mt-2 rounded-2xl hover:bg-black hover:text-white">
        Pay Now
      </Button>
    </form>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
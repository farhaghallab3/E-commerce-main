"use client";
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full py-10">
      <Spinner color="default" label="Loading..." size="lg" />
    </div>
  );
}


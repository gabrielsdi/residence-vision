"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ErrorPage({
  errorStatus,
  handleClick,
}: {
  errorStatus: string;
  handleClick: () => void;
}) {
  const ERROR_PAGE_MESSAGE = "Oops something went wrong";
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white dark:bg-black pt-26 ">
      <Image
        data-testid="error-page-image"
        src="/error-house-image.svg"
        alt="error-page-image"
        width={400}
        height={80}
        className="object-contain"
        priority
      />
      <h1 className="text-primary text-3xl font-bold mb-4">
        {errorStatus || "Error"}
      </h1>
      <p className="text-primary text-2xl">{ERROR_PAGE_MESSAGE}</p>
      <Button
        onClick={handleClick}
        size="lg"
        className="mt-4 cursor-pointer w-30 h-10"
      >
        Go Home
      </Button>
    </div>
  );
}

"use client";
import { useState } from "react";
import { HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { House } from "@/app/types";

export function HouseCard({
  house,
  onLikeToggle,
}: {
  house: House;
  onLikeToggle?: (house: House) => void;
}) {
  const [liked, setLiked] = useState<boolean>(false);
  const { address, homeowner, price, photoURL } = house;
  const formattedPrice = `$${price.toLocaleString()}`;

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedState = !liked;
    setLiked(newLikedState);
    if (onLikeToggle) onLikeToggle(house);
  };

  return (
    <div className="w-[768px] flex flex-row bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
      <div className="relative w-72 h-45 shrink-0">
        <Image
          src={photoURL}
          alt={`Photo of ${address}`}
          fill
          sizes="288px"
          priority
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <span className="text-2xl font-bold">{formattedPrice}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleLike}
              className="rounded-full cursor-pointer"
            >
              <HeartIcon
                className={cn(
                  "w-5 h-5",
                  liked
                    ? "fill-red-500 stroke-red-500"
                    : "stroke-muted-foreground",
                )}
              />
            </Button>
          </div>
          <div>
            <h2 className="text-base font-bold">{address}</h2>
            <p className="text-sm text-muted-foreground">{homeowner}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

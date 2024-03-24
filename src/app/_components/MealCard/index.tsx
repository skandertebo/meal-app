"use client";
import { Meal } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

export interface MealCard {
  meal: Meal;
  onDelete?: (meal: Meal) => Promise<void>;
}

const MealCard: React.FC<MealCard> = ({ meal, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <div className="relative rounded-xl bg-white shadow-xl">
      {onDelete && (
        <div className="absolute right-2 top-2">
          <button
            onClick={async () => {
              setIsDeleting(true);
              try {
                await onDelete?.(meal);
              } finally {
                setIsDeleting(false);
              }
            }}
            className="rounded-full bg-red-500 p-1 text-white"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <AiOutlineLoading className="h-4 w-4 animate-spin" />
            ) : (
              <BiTrash className="h-4 w-4 bg-red-500" />
            )}
          </button>
        </div>
      )}
      <Image
        className="h-40 w-full rounded-t-xl"
        src={meal.thumb || "/meal.png"}
        alt={meal.name}
        objectFit="contain"
        width={300}
        height={160}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-black">
          {meal.name.length > 15 ? `${meal.name.slice(0, 15)}...` : meal.name}
        </h2>
        <p className="text-gray-500">{meal.category}</p>
      </div>
    </div>
  );
};

export default MealCard;

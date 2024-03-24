import { Meal } from "@prisma/client";
import Image from "next/image";

export interface MealCard {
  meal: Meal;
}

const MealCard: React.FC<MealCard> = ({ meal }) => {
  return (
    <div className="rounded-xl bg-white shadow-xl">
      <Image
        className="h-40 w-full rounded-t-xl"
        src={meal.thumb}
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

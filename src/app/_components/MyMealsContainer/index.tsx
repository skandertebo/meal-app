"use client";

import { api } from "@/trpc/react";
import { Meal } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MealCard from "../MealCard";

export interface MyMealsContainerProps {
  meals: Meal[];
}

const MyMealsContainer: React.FC<MyMealsContainerProps> = ({ meals }) => {
  const deleteMeal = api.meal.deleteMeal.useMutation();
  const router = useRouter();
  return (
    <>
      {meals.map((meal, idx) => (
        <Link href={`/mymeals/${meal.id}`} key={idx}>
          <MealCard
            meal={meal}
            onDelete={async (m) => {
              await deleteMeal.mutateAsync(m.id);
              router.refresh();
            }}
          />
        </Link>
      ))}
    </>
  );
};

export default MyMealsContainer;

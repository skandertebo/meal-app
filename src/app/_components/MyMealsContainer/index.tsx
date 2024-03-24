"use client";

import { api } from "@/trpc/react";
import { Meal } from "@prisma/client";
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
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          onDelete={async (m) => {
            await deleteMeal.mutateAsync(m.id as number);
            router.refresh();
          }}
        />
      ))}
    </>
  );
};

export default MyMealsContainer;

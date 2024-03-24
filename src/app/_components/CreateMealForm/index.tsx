"use client";

import { AreaDto } from "@/services/mealservice/dto/listAreasDto";
import { CategoryDto } from "@/services/mealservice/dto/listCategoriesDto";
import { IngredientDto } from "@/services/mealservice/dto/listIngredientDto";
import { api } from "@/trpc/react";
import { Meal } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";
import SearchSelect from "../SearchSelect";
import IngredientItem from "./IngredientItem";

export interface CreateMealFormProps {
  categories: CategoryDto[];
  areas: AreaDto[];
  ingredients: IngredientDto[];
  initialMeal?: Meal & {
    ingredients: { name: string; amount: string; amountUnit: string }[];
  };
}

const CreateMealForm: React.FC<CreateMealFormProps> = ({
  categories,
  areas,
  ingredients,
  initialMeal,
}) => {
  const mealCreateMutation = api.meal.create.useMutation();
  const mealUpdateMutation = api.meal.updateMeal.useMutation();
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  // we can also add logic to upload a meal image as thumb ( in a service like s3 or something similar )
  // but for simplicity we will just use a placeholder image
  const onCreateOrUpdateMeal = async ({
    name,
    category,
    area,
    instructions,
    ingredients,
  }: {
    name: string;
    category: string;
    area: string;
    instructions: string;
    ingredients: {
      name: string;
      amount: string;
      unit: string;
    }[];
  }) => {
    try {
      setIsCreating(true);
      if (initialMeal) {
        await mealUpdateMutation.mutateAsync({
          id: initialMeal.id,
          name,
          category,
          area,
          instructions,
          ingredients,
        });
        window.location.href = "/mymeals";
        return;
      }
      await mealCreateMutation.mutateAsync({
        name,
        category,
        area,
        instructions,
        ingredients,
      });
      router.push("/mymeals");
    } catch (e) {
      console.error(e);
      if (e instanceof TRPCClientError) {
        try {
          const json = JSON.parse(e.message);
          console.log(json);
          if (json.message && typeof json.message === "string") {
            toast.error(json.message as string);
          } else if (json instanceof Array && json.length > 0) {
            if (json[0].path?.length && json[0].message) {
              toast.error(
                `Error at: ${json[0].path.join(".")}, ${json[0].message}`,
              );
            } else if (json[0].message) {
              toast.error(json[0].message as string);
            }
          }
        } catch (error) {
          toast.error(e.message);
        }
      }
    } finally {
      setIsCreating(false);
    }
  };
  const [name, setName] = useState(initialMeal?.name ?? "");
  const [category, setCategory] = useState(initialMeal?.category ?? "");
  const [area, setArea] = useState(initialMeal?.area ?? "");
  const [instructions, setInstructions] = useState(
    initialMeal?.instructions ?? "",
  );
  const [myIngredients, setMyIngredients] = useState<
    {
      name: string;
      amount: string;
      unit: string;
    }[]
  >(
    initialMeal?.ingredients.map((ingredient) => ({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.amountUnit,
    })) ?? [],
  );

  const inputClassName =
    "p-2 border border-gray-300 rounded-md min-w-[250px] w-fit";

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onCreateOrUpdateMeal({
          name,
          category,
          area,
          instructions,
          ingredients: myIngredients,
        });
      }}
      className="flex flex-col gap-2 px-2 pt-6 sm:px-4"
    >
      <h1 className="text-2xl font-semibold">Create Recipe</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className={inputClassName}
      />
      <SearchSelect
        value={category}
        onChange={setCategory}
        placeholder="Category"
        items={categories.map((category) => category.strCategory)}
      />
      <SearchSelect
        value={area}
        onChange={setArea}
        placeholder="Area"
        items={areas.map((area) => area.strArea)}
      />
      <input
        type="text"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
        className={inputClassName}
      />
      <div className="flex flex-col gap-2">
        {myIngredients.map((myIngredient, index) => (
          <IngredientItem
            key={index}
            unit={myIngredient.unit}
            name={myIngredient.name}
            amount={myIngredient.amount}
            ingredientOptions={ingredients}
            onNameChange={(val) =>
              setMyIngredients((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, name: val } : item,
                ),
              )
            }
            onUnitChange={(val) =>
              setMyIngredients((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, unit: val } : item,
                ),
              )
            }
            onAmountChange={(val) => {
              setMyIngredients((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, amount: val } : item,
                ),
              );
            }}
            onDelete={() =>
              setMyIngredients((prev) => prev.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={() =>
            setMyIngredients((prev) => [
              ...prev,
              { name: "", amount: "", unit: "" },
            ])
          }
          type="button"
          className="w-fit rounded-md border border-gray-300 bg-blue-500 p-2 text-white"
        >
          Add Ingredient
        </button>
        <button
          type="submit"
          className="h-[42px] w-fit min-w-[110px] rounded-md border border-gray-300 bg-green-700 p-2 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-800"
          disabled={isCreating}
        >
          {isCreating ? (
            <AiOutlineLoading className="mx-auto animate-spin" />
          ) : initialMeal ? (
            "Update Meal"
          ) : (
            "Create Meal"
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateMealForm;

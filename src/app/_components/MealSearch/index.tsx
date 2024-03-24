"use client";

import { cn } from "@/lib/utils";
import { AreaDto } from "@/services/mealservice/dto/listAreasDto";
import { CategoryDto } from "@/services/mealservice/dto/listCategoriesDto";
import { IngredientDto } from "@/services/mealservice/dto/listIngredientDto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditablePickList from "../SearchSelect";

export interface MealSearchProps {
  search: string | undefined;
  category: string | undefined;
  ingredient: string | undefined;
  area: string | undefined;
  inputClassName?: string;
  inputPlaceholder?: string;
  categories: CategoryDto[];
  areas: AreaDto[];
  ingredients: IngredientDto[];
}

type SearchType = "manual" | "category" | "ingredient" | "area";

const MealSearch: React.FC<MealSearchProps> = ({
  search,
  inputClassName,
  inputPlaceholder,
  categories,
  ingredients,
  areas,
  category: initialCategory,
  ingredient: initialIngredient,
  area: initialArea,
}) => {
  const [searchValue, setSearchValue] = useState(search ?? "");
  const router = useRouter();
  const [searchType, setSearchType] = useState<SearchType>("manual");
  const [category, setCategory] = useState<string>(initialCategory ?? "");
  const [ingredient, setIngredient] = useState<string>(initialIngredient ?? "");
  const [area, setArea] = useState<string>(initialArea ?? "");

  const onClick = () => {
    if (searchType === "manual") {
      router.push(searchValue ? `/?search=${searchValue}` : "/");
    } else if (searchType === "category" && category) {
      router.push(`/?category=${category}`);
    } else if (searchType === "ingredient" && ingredient) {
      router.push(`/?ingredient=${ingredient}`);
    } else if (searchType === "area" && area) {
      router.push(`/?area=${area}`);
    }
  };

  const disableSearch =
    (searchType === "category" && !category) ||
    (searchType === "ingredient" && !ingredient) ||
    (searchType === "area" && !area);

  return (
    <div className="flex w-full justify-center gap-2">
      <select
        className="w-fit rounded-lg p-2 ring-1 ring-slate-400"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value as SearchType)}
      >
        <option value="manual">Manual Search</option>
        <option value="category">Category Search</option>
        <option value="ingredient">Ingredient Search</option>
        <option value="area">Area Search</option>
      </select>
      {searchType === "manual" ? (
        <input
          className={cn(
            "w-1/2 rounded-lg p-2 ring-1 ring-slate-400",
            inputClassName,
          )}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={inputPlaceholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
      ) : searchType === "category" ? (
        <EditablePickList
          items={categories.map((category) => category.strCategory)}
          onChange={(category) => setCategory(category)}
          placeholder="Select a category"
          value={category}
        />
      ) : searchType === "ingredient" ? (
        <EditablePickList
          items={ingredients.map((ingredient) => ingredient.strIngredient)}
          onChange={(ingredient) => setIngredient(ingredient)}
          placeholder="Select an ingredient"
          value={ingredient}
        />
      ) : (
        <EditablePickList
          items={areas.map((area) => area.strArea)}
          onChange={(area) => setArea(area)}
          placeholder="Select an area"
          value={area}
        />
      )}
      <button
        className="rounded-xl bg-blue-500 p-2 text-white disabled:opacity-50"
        onClick={onClick}
        disabled={disableSearch}
      >
        Search
      </button>
    </div>
  );
};

export default MealSearch;

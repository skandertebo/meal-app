import ENDPOINTS from "@/endpoints";
import axios from "axios";
import mealAdapter, { filteredMealAdapter } from "./adapters/mealAdapter";
import { FilterMealsResultDto } from "./dto/filterMealsResultDto";
import { ListAreasDto } from "./dto/listAreasDto";
import { ListCategoriesDto } from "./dto/listCategoriesDto";
import { ListIngredientDto } from "./dto/listIngredientDto";
import { SearchMealsDto } from "./dto/searchMealsResultDto";

export default class MealService {
  static async GetMeals(q: string) {
    const res = (await axios.get<SearchMealsDto>(ENDPOINTS.MEALS.GET_MEALS(q)))
      .data;
    if (!res.meals) return [];
    return res.meals.map((m) => mealAdapter(m));
  }

  static async GetRandomMeal() {
    const res = await axios.get<SearchMealsDto>(
      ENDPOINTS.MEALS.GET_RANDOM_MEAL,
    );
    return mealAdapter(res.data.meals[0]!);
  }

  static async GetMealById(id: string) {
    const res = await axios.get<SearchMealsDto>(
      ENDPOINTS.MEALS.GET_MEAL_BY_ID(id),
    );
    if (!res.data.meals.length) return null;
    return mealAdapter(res.data.meals[0]!);
  }

  static async GetCategories() {
    const res = await axios.get<ListCategoriesDto>(
      ENDPOINTS.MEALS.GET_CATEGORIES,
    );
    return res.data.categories;
  }

  static async GetAreas() {
    const res = await axios.get<ListAreasDto>(ENDPOINTS.MEALS.GET_AREAS);
    return res.data.meals;
  }

  static async GetIngredients() {
    const res = await axios.get<ListIngredientDto>(
      ENDPOINTS.MEALS.GET_INGREDIENTS,
    );
    return res.data.meals;
  }

  static async GetMealByFilter({
    type,
    value,
  }: {
    type: "category" | "area" | "ingredient";
    value: string;
  }) {
    const res = await axios.get<FilterMealsResultDto>(
      ENDPOINTS.MEALS.GET_MEAL_BY_FILTER(type, value),
    );
    if (!res.data.meals) return [];
    return res.data.meals.map((m) => filteredMealAdapter(m, { type, value }));
  }
}

export interface SearchMealsDto {
  meals: Array<DetailedMealDto>;
}

// the Record<string, string> is to handle thee apis weird structuring of the ingredients and their measure
// instead of an array of ingredients, they just put ingredient1, ingredient2, etc
export type DetailedMealDto = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: null | string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource?: string;
  strImageSource: null | string;
  strCreativeCommonsConfirmed: null | string;
  dateModified: null | string;
} & Record<string, string>;

export interface ListIngredientDto {
  meals: Array<IngredientDto>;
}

export interface IngredientDto {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType: string | null;
}

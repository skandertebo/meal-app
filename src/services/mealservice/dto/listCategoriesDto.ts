export interface ListCategoriesDto {
  categories: Array<CategoryDto>;
}

export interface CategoryDto {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

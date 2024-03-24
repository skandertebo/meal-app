const ENDPOINTS = {
  MEALS: {
    GET_MEALS: (q: string) =>
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`,
    GET_RANDOM_MEAL: `https://www.themealdb.com/api/json/v1/1/random.php`,
    GET_MEAL_BY_ID: (id: string) =>
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    GET_CATEGORIES: `https://www.themealdb.com/api/json/v1/1/categories.php`,
    GET_AREAS: `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
    GET_INGREDIENTS: `https://www.themealdb.com/api/json/v1/1/list.php?i=list`,
    GET_MEAL_BY_FILTER: (
      type: "category" | "area" | "ingredient",
      value: string,
    ) => {
      let url = `https://www.themealdb.com/api/json/v1/1/filter.php?`;
      if (type === "category") {
        url += `c=${value}`;
      }
      if (type === "area") {
        url += `a=${value}`;
      }
      if (type === "ingredient") {
        url += `i=${value}`;
      }
      return url;
    },
  },
};

export default ENDPOINTS;

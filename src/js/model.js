import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helper.js";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  // Esta función no va a retornar nada lo unico que va a hacer es cambiar el state oobject que creamos arriba, y ese es el que exportamos a los demas files.
  // 1) Loading recipe form the API.
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err} Error en fetch del helper`);
    throw err; // Lo mandamos a controller que es el que se encarga de enviarlo al view (Luego estamos propagando el error varias veces)
  }
};

export const loadSerachResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} Error en fetch de search`);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  // Por defecto la página que mostramos es la que guardamos en el state que es 1
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; // 10

  return state.search.results.slice(start, end); // ¿Implementar este metodo?
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings; // regla de tres simple
  });
  // Update the servings
  state.recipe.servings = newServings;
};

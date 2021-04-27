import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helper.js";
// import {
//   recipesLl,
//   bookmarks,
//   results,
// } from "./dataStructures/singlyLinkedList.js";

import { ArrayList, recipesAl, results } from "./dataStructures/arrayList.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: results,
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: new ArrayList(0),
};

export const loadRecipe = async function (id) {
  // Esta función no va a retornar nada lo unico que va a hacer es cambiar el state oobject que creamos arriba, y ese es el que exportamos a los demas files.
  // 1) Loading recipe form the API.
  try {
    state.recipe = recipesAl.find(id);
    // console.log(state.recipe);
    // const data = await getJSON(`${API_URL}/${id}`);
    // const { recipe } = data.data;
    // state.recipe = {
    //   id: recipe.id,
    //   title: recipe.title,
    //   publisher: recipe.publisher,
    //   sourceUrl: recipe.source_url,
    //   image: recipe.image_url,
    //   servings: recipe.servings,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };

    // La siguiente condición nos permite a traves del "arrayList" (linkedList) bookmark verificar cuales de ellos renderizar con el id dado por esta función, es decir como estamos rerenderizando la página que viene de recetas con bookmark false, entonces tenemos siempre que cambiar el objeto state.recipe para checkear cuales de ellos estan en state.bookmarks y asi renderizar correctamente.

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // IMPLEMENTACION CON REFERENCIAS (PRUEBA) POR ALGUNA RAZÓN CAMBIA A STATE.BOOKMARKS POSIBLEMENTE PORQUE ES UNA REFERNCIA Y NO ES PROPIAMENTE UN ARRAY
    // console.log(state.bookmarks, "bookmarks lista");
    // if (state.bookmarks.verify(id, state.bookmarks)) {
    //
    //   state.recipe.bookmarked = true;
    // } else {
    //
    //   state.recipe.bookmarked = false;
    // }
  } catch (err) {
    console.error(`${err} Error en fetch del helper`);
    throw err; // Lo mandamos a controller que es el que se encarga de enviarlo al view (Luego estamos propagando el error varias veces)
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    // const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = recipesAl.findAll(query).map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image,
      };
    });
    state.search.page = 1;
    // state.search.results = data.data.recipes.map((rec) => {
    //   return {
    //     id: rec.id,
    //     title: rec.title,
    //     publisher: rec.publisher,
    //     image: rec.image_url,
    //   };
    // });
    // state.search.page = 1;
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

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings; // regla de tres simple
  });
  // Update the servings
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // 1) Add bookmark
  state.bookmarks.pushBack(recipe);
  // state.bookmarks.push(recipe);

  // 2) Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const removeBookmark = function (id) {
  // Delete bookmarked
  const index = state.bookmarks.findIndex((el) => el.id === id);
  // state.bookmarks.splice(index, 1);
  state.bookmarks.remove(index);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = JSON.parse(localStorage.getItem("bookmarks"));
  // console.log(storage); Deja de ser una singlyLinkedList para pasar a ser un objeto, luego necesitamos nuevamente llenar a bookmarks con una linkedlist, entonces:
  if (storage) {
    let count = 0;
    while (count < storage.size) {
      state.bookmarks.pushBack(storage.list[count]); // No podemos simplemente igualar porque debemos incrementar el size
      count++;
    }
  }
};
init();

const clearBookmarks = function () {
  // Function for development
  localStorage.clear("bookmarks");
};
//clearBookmarks();

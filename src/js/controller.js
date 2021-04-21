import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";

import "core-js/stable"; // PARA INSTALARLO TUVE QUE DETENER EL PARCEL, PORQUE AL PARECER HABIAN ERRORES DE SEGURIDAD. Para polyfilling todo lo demas que no es async/await.
import "regenerator-runtime/runtime"; // Sirve para polyfilling async/await
// Los dos anteriores import nos aseguran que la mayoria de browsers corran nuestra aplicación.
//console.log(icons); // http://localhost:1234/icons.760496a2.svg     La ruta nnueva a dist. http://localhost:1234 = dist

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// La siguiente condición no es real JS es algo que me ofrece parcel para que no se me borre la info tras hacer cambios en el código
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // Guard clause:
    if (!id) return;
    recipeView.renderSpiner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());

    // 1) Loading recipe form the API.
    await model.loadRecipe(id);

    // 2) Rendering the recipe
    recipeView.render(model.state.recipe);
    // En vez de utilizar render pudimos hacer const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    // Cogemos el error del throw que viene de model que a su vez viene de helper.js
    // recipeView.renderError(`${err}`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpiner();

    // 1) Get seach query
    const query = searchView.getQuery();
    // if (!query) return; // Si coloco esto no me deja ir al render con el array.length de 0 y por lo tanto no me muestra el error en resultsView

    // 2) Load search results
    await model.loadSerachResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results); Todos los resultados que se obtiviron de la query
    resultsView.render(model.getSearchResultPage()); // Pagination incial que por defecto es 1

    // 4) Render the initial pagination btn´s
    paginationView.render(model.state.search); // Le mandamos todo el objeto search de model
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render new results
  resultsView.render(model.getSearchResultPage(goToPage)); // Actualiza el state.search.page, luego 2) tambien se actualiza.

  // 2) Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings); // Cambiamos el state.recipe.servings y state.recipe.ingredients;

  // Update the recipe view
  //recipeView.render(model.state.recipe); // Gracias al _clear de render podemos hacer como rerenders o sobrescribir código, de esta manera no tenemos que coger elementos HTML por separado y manipularlos. Pero esto conlleva un problema y es precisamente que si queremos actualizar pequeños pedazos del DOM Tree, al cargar todo de nuevo si uno de esos elementos es pesado (una imagen, video etc). Entonces cada rerender conllevara un pequeño lapsus de tiempo que se vera reflejado al cargar la página.
  recipeView.update(model.state.recipe); // Este metodo solo actualizara text atributes en el DOM, lo cual sera mucho mas eficiente
};

const controlAddBookmark = function () {
  // 1) Add or remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  // No queremos renderizar todo el view luego aplicamos update solamente para iluminar el boton de bookmark

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render the bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  // Publisher subscriber pattern
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults); // Para la paginate inicial de 1 cuando se le d al boton buscar
  paginationView._addHandlerClick(controlPagination); // Para cambiar de pagination, cuando se le de a las flechas.
};
init();

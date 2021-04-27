import View from "./View.js";
//import icons from '../img/icons.svg'; Con versiones de parcel 1
import icons from "url:../../img/icons.svg"; // parcel 2, Importamos este archivo porque como con parcel ahora se trabaja es con los archivos del folder dist, entonces no carga los iconos respectivos, porque todavia siguen con la ruta de src. Otra cosa que toca colocar en parcel 2 es url: si y solo si estamos trayendo cosas que no son archivos js.
import { Fraction } from "fractional";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage =
    "No se puedo encontrar la receta. Por favor intente de nuevo!";
  _message = "";

  // Las anteriores son las propiedades que todas las views van a tener en comun.

  addHandlerRender(handler) {
    //window.addEventListener('hashchange', controlRecipes);
    //window.addEventListener('load', controlRecipes); // Como no se activa el evento cuando vamos a la dirección url directamente, porque no se esta haciendo ningun hashchange, debemos poner este otro eventListener.

    // Par ano repetir codigo, por ejemplo una misma función para distintos eventos, podemos hacer:

    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    // Event delegation
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo; // No podemos hacer destructuring por que primero se ejecuta la conversión numerica luego necesita pasarle un string valido.

      // Nuevamente tenemos que conectar la interfaz de usuario con el código para ello usamos data en HTML.
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    // Event delegation para aprovechar la propiedad _parentElement
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    // console.log(this._data, "THIS:_DATA DE RECIPEVIEW");
    return `
        <figure class="recipe__fig">
            <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${this._data.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  this._data.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  this._data.servings
                }</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--update-servings" data-update-to="${
                      this._data.servings - 1
                    }"> 
                        <svg>
                            <use href="${icons}#icon-minus-circle"></use>
                        </svg>
                    </button>
                    <button class="btn--tiny btn--update-servings" data-update-to="${
                      this._data.servings + 1
                    }">
                        <svg>
                            <use href="${icons}#icon-plus-circle"></use>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="recipe__user-generated">
                
            </div>
            <button class="btn--round btn--bookmark">
                <svg class="">
                    <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
                ${this._data.ingredients
                  .map(this._generateMarkupIngredient)
                  .join("")}
            </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__publisher">${
                      this._data.publisher
                    }</span>. Please check out
                    directions at their website.
                </p>
                <a
                    class="btn--small recipe__btn"
                    href="${this._data.sourceUrl}"
                    target="_blank"
                >
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </a>
            </div>
        `;
    //recipeContainer.innerHTML = ''; // Lo que hacemos primero antes de meter la receta es vaciar el contenido anterior que se encontraba en el recipeContainer, para no renderizar dos cosas a la vez.
    //recipeContainer.insertAdjacentHTML('afterbegin', markup); Ya no van aca por que es el metodo render, que hes llamado del controlodar quien se encarga de llamar estas dos funciones, este metodo solo se encarga de generar un HTML string.
  }

  _generateMarkupIngredient(ing) {
    return `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ing.quantity ? new Fraction(ing.quantity).toString() : ""
            }</div>
            <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
            </div>
        </li>
    `;
  }
}

export default new RecipeView(); // NO queremos exportar la clase entera porque entonces se tendria que instanciar en todos los demas files, ademas no queremos que otros files manejen información de lo que se va a renderizar.

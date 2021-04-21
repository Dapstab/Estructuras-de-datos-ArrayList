import View from "./View.js";
import previewView from "./previewView";
import icons from "url:../../img/icons.svg";

class BookmarksView extends View {
  // Esta clase es practicamente igual a la de resultsView y la razón es porque el HTML que vamos a renderizar es el mismo, luego lo unico que cambia es su posicionamiento en la página y eso lo logramos diferenciado el elemnto padre de cada clase (_parentElement).

  // Como tenemos códigos repetidos vamos a refactorizar creando la clase previewView esta clase es la que va a tener el código repetido de bookmarksView y resultsView, es decir el _generateMarkup. Lo que vamos a hacer es vamos a renderizar el _generateMarkup de cada uno llamando a previewView en cada función respectiva. Ahora recordemos que _generateMarkup debe retornar un string, pero si nos damos cuenta el _generateMarkup que se encuentra en este file retorna otra cosa, para arreglar el error que podria salta colocamos un nuevo parametro al metodo render de la clase View que es render (View.render(data, render = true)) por defecto lo dejamos en true y solo cuando salten los _generateMarkups de bookmarksView y resultsViews se pondran en false logrando que retorne la función render de View sin que llegue a haber problemas por no ser un string.

  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage =
    "Ningun receta guardada. Encuentra una deliciosa receta y guardala!";
  _message = "";

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();

import View from "./View.js";
import previewView from "./previewView";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "Ninguna receta encontrada!. Por favor ingresa otra receta";
  _message = "";

  // _generateMarkup() {
  //   return this._data.map(this._generateMarkupPreview).join("");
  // }

  // _generateMarkupPreview(result) {
  //   const id = window.location.hash.slice(1);
  //   return `
  //       <li class="preview">
  //           <a class="preview__link ${
  //             result.id === id ? "preview__link--active" : ""
  //           }" href="#${result.id}">
  //               <figure class="preview__fig">
  //                   <img src="${result.image}" alt="${result.title}" />
  //               </figure>
  //               <div class="preview__data">
  //                   <h4 class="preview__title">${result.title}</h4>
  //                   <p class="preview__publisher">${result.publisher}</p>
  //               </div>
  //           </a>
  //       </li>
  //     `;
  // }

  _generateMarkup() {
    // return this._data
    //   .map((result) => previewView.render(result, false))
    //   .join("");
    // console.log(this._data, "DATA EN RESULTSVIEW");
    const markup = this._data.map((result) =>
      previewView.render(result, false)
    );

    return markup;
  }
}

export default new ResultsView();

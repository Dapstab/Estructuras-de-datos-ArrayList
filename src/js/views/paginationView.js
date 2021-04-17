import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  //   _currentPage = ""; No podemos dejar esta propiedad porque solo se llamria cuando se llame la función generateMarkup y esto no siempre ocurre.

  _addHandlerClick(handler) {
    // Event delegation
    this._parentElement.addEventListener("click", function (e) {
      // No llamamos inmediatamente el handler porque tenemos que mirar cual boton es el que se clickea
      const btn = e.target.closest(".btn--inline"); // Search up in the tree
      if (!btn) return;
      // btn tiene un atributo data que va a ser la conexión entre en DOM y JS para saber a que página ir.
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupNextButton();
    }

    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupPrevButton();
    }

    // Other page
    if (this._data.page < numPages) {
      return `
        ${this._generateMarkupPrevButton()}
        ${this._generateMarkupNextButton()}
      `;
    }

    // Page 1, and there are no other pages
    return "";
  }

  _generateMarkupPrevButton() {
    return `
        <button data-goto="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>
    `;
  }

  _generateMarkupNextButton() {
    return `
        <button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }
}

export default new PaginationView();

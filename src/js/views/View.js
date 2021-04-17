import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();
    // Las siguientes dos lineas de código son las que realizan el rerender de los views
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    // Creamos el nuevo markup con los datos actualizados
    const newMarkup = this._generateMarkup(); // Necesitamos sin embargo un markup para comparar los innerText del antiguo markup con el nuevo que quermos meter sin embargo this._generateMarkup() es un string y hacer una comparación de strings que es complicado e ineficiente.

    // Extraemos su virtual DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup); // Este metodo se encarga de crear DOM Objects, es como un virtual DOM (DOM que no vive en la página pero que si se encuentra en memoria) que nos servira para hacer las comparaciones respectivas.

    // Extraemos todos los HTML elements con su innerHTML actualizado
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    // console.log(newElements); NodeList de elementos HTML virtuales.

    // Antiguo Markup
    const curElements = Array.from(this._parentElement.querySelectorAll("*")); // ¿Implementar esto?

    // Comparar uno por uno
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(newEl.isEqualNode(curEl));

      // Updating the text content
      // Ahora lo que queremos hacer es ver cuales de esos HTML elements son distintos el problema es que si un elemento s es distinto al otro su padre tambien lo sera y como no queremos que se cambien los contenidos para elementos que no tengan texto usamos la popiedad nodeValue que retorna null en los casos que el innerHTML no sea text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updating the attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(
          (attr) => curEl.setAttribute(attr.name, attr.value) // Estamos rremplazando o sobreescribiendo los atributos
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = ""; // Lo que hacemos primero antes de meter la receta es vaciar el contenido anterior que se encontraba en el recipeContainer, para no renderizar dos cosas a la vez.
  }

  renderSpiner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    // Si ningun mensaje se pasa le pasamos por defecto el que tiene esta clase
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    // Si ningun mensaje se pasa le pasamos por defecto el que tiene esta clase
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

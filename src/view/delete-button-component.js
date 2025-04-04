import { createElement } from '../framework/render.js';

function createDeleteComponentTemplate() {
  return `<button class="clear-btn">Очистить</button>`;
}

export default class DeleteComponent {
  getTemplate() {
    return createDeleteComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
} 
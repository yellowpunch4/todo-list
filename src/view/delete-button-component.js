import { AbstractComponent } from '../framework/view/abstarct-component.js';
import { createElement } from '../framework/render.js';

function createDeleteComponentTemplate() {
  return `<button class="clear-btn">Очистить</button>`;
}

export default class DeleteComponent extends AbstractComponent {
  get template() {
    return createDeleteComponentTemplate();
  }
  removeElement() {
    super.removeElement();
  }
}

import { AbstractComponent } from '../framework/view/abstarct-component.js';
import { createElement } from '../framework/render.js';

function createHeaderComponentTemplate() {
  return `<header><h1>Список задач</h1></header>`;
}

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate();
  }

  removeElement() {
    super.removeElement();
  }
}

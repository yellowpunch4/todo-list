import { AbstractComponent } from '../framework/view/abstarct-component.js';
import { createElement } from '../framework/render.js';

function createFormAddTaskComponentTemplate() {
  return `
    <div class="container">
        <div class="new-task">
            <div class="new-task-label">Новая задача</div>
            <div class="input-container">
                <input id="add-task" type="text" placeholder="Название задачи...">
                <button >+ Добавить</button>
            </div>
        </div>
    </div>
  `;
}

export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({onClick}) 
  {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }
  get template() {
    return createFormAddTaskComponentTemplate();
  }
  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  }
  removeElement() {
    super.removeElement();
  }
}

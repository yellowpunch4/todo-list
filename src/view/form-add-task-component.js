import { createElement } from '../framework/render.js';

function createFormAddTaskComponentTemplate() {
  return `
    <div class="container">
        <div class="new-task">
            <div class="new-task-label">Новая задача</div>
            <div class="input-container">
                <input type="text" placeholder="Название задачи...">
                <button>+ Добавить</button>
            </div>
        </div>
        </div>
        `;
}

export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
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
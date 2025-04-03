import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate(title, status) {
  const clearButton = status === "basket" ? `<button class="clear-btn">Очистить</button>`:'';
  return `
    <div class="column ${status}">
      <h2 class="column__title ${status}">${title}</h2>
      <div class="task-list ${status}"></div>
      ${clearButton}
    </div>
  `;
}

export default class TasksListComponent {
  #element = null;
  #title = '';
  #status = '';

  constructor({ title, status }) {
    this.#title = title;
    this.#status = status;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.#title, this.#status);
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }
    return this.#element;
  }

  getTaskContainer() {
    return this.getElement().querySelector('.task-list');
  }

  removeElement() {
    this.#element = null;
  }
}
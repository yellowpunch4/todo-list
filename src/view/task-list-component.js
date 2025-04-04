import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate(title, status) {
  return `
    <div class="column ${status}">
      <h2 class="column__title ${status}">${title}</h2>
      <div class="task-list ${status}"></div>
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
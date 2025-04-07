import { AbstractComponent } from '../framework/view/abstarct-component.js';
import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate(title, status) {
  return `
    <div class="column ${status}">
      <h2 class="column__title ${status}">${title}</h2>
      <div class="task-list ${status}"></div>
    </div>
  `;
}

export default class TasksListComponent extends AbstractComponent {
  #title = '';
  #status = '';

  constructor({ title, status }) {
    super();
    this.#title = title;
    this.#status = status;
  }
  get template() {
    return createTaskListComponentTemplate(this.#title, this.#status);
  }

  getTaskContainer() {
    return this.element.querySelector('.task-list');
  }

  removeElement() {
    super.removeElement();
  }
}

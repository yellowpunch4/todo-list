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
  #onTaskDrop = null;

  constructor({ title, status, onTaskDrop }) {
    super();
    this.#title = title;
    this.#status = status;
    this.#onTaskDrop = onTaskDrop;

    this.#setDropHandlers();
  }

  get template() {
    return createTaskListComponentTemplate(this.#title, this.#status);
  }

  getTaskContainer() {
    return this.element.querySelector('.task-list');
  }

  #setDropHandlers() {
    const container = this.getTaskContainer();

    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      if (this.#onTaskDrop) {
        this.#onTaskDrop(taskId, this.#status);
      }
    });
  }

  removeElement() {
    super.removeElement();
  }
}

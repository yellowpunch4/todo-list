import { createElement } from '../framework/render.js';


function createTaskListComponentTemplate() {
  return `<div class="column backlog">
            <h2>Название блока</h2>
            <div class="task-list"></div>
          </div>`;
}

export default class TaskListComponent {
  constructor() {
    this.tasks = [];
  }

  getTemplate() {
    return createTaskListComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  addTask(taskText) {
    const task = new TaskComponent(taskText);
    this.tasks.push(task);
    this.getElement().querySelector('.task-list').appendChild(task.getElement());
  }

  removeElement() {
    this.element = null;
  }
}

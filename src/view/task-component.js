import { createElement } from '../framework/render.js';

function createTaskComponentTemplate() {
  return `<div class="task">Название первой задачи</div>`;
}

export default class TaskComponent {
  constructor(taskText) {
    this.taskText = taskText;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.taskText);
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

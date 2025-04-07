import { AbstractComponent } from '../framework/view/abstarct-component.js';
import { createElement } from '../framework/render.js';

function createTaskBoardComponentTemplate() {
  return `<div class="task-columns"></div>`;
}

export default class TaskBoardComponent extends AbstractComponent {
  get template() {
    return createTaskBoardComponentTemplate();
  }

  removeElement() {
    super.removeElement();
  }
}

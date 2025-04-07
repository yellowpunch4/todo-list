import { AbstractComponent } from '../framework/view/abstarct-component.js';
import { createElement } from '../framework/render.js';

function createTaskComponentTemplate(task) {
  const { id, title, status } = task;
  return `
    <li class="taskboard__item task task--${status}" data-task-id="${id}">
      <div class="task-body">
        <p class="task-view">${title}</p>
        <input type="text" class="task-input" value="${title}" style="display: none;" />
      </div>
      <button aria-label="Изменить" class="task-edit" type="button"></button>
      <button aria-label="Удалить" class="task-delete" type="button"></button>
    </li>
  `;
}

export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor({ task }) { 
    super();
    this.#task = task;
    this.#initListeners();
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }

  #initListeners() {
    const editButton = this.element.querySelector('.task-edit');
    const deleteButton = this.element.querySelector('.task-delete');
    const taskView = this.element.querySelector('.task-view');
    const taskInput = this.element.querySelector('.task-input');

    editButton.addEventListener('click', () => {
      taskView.style.display = 'none';
      taskInput.style.display = 'block';
      taskInput.focus();
    });

    taskInput.addEventListener('blur', () => {
      taskView.style.display = 'block';
      taskInput.style.display = 'none';
      this.#task.title = taskInput.value;
      taskView.textContent = taskInput.value;
    });

    deleteButton.addEventListener('click', () => {
      this.element.remove();
    });
  }

  removeElement() {
    super.removeElement();
  }
}

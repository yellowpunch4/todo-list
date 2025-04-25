import NoTasksComponent from '../view/no-tasks-component.js';
import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/taskboard-component.js';
import { StatusLabel, Status } from '../const.js';
import DeleteComponent from '../view/delete-button-component.js';
import { render } from '../framework/render.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #boardTasks = [];
  #tasksBoardComponent = new TaskBoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  async init() {
    await this.#tasksModel.init();
    this.#clearBoard();
    this.#renderBoard();
}


  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ 
      task, 
      onTaskDropInside: this.#handleTaskDropInside.bind(this) 
    });
    render(taskComponent, container);
  }
  #handleTaskDropInside(taskId, targetTaskId) {
    this.#tasksModel.moveTaskBefore(taskId, targetTaskId);
  }
  
  

  #renderDeleteComponent(container) {
    const deleteComponent = new DeleteComponent({
      onClick: () => this.#handleDeleteTasksFromBasket()
    });
    render(deleteComponent, container);
  }
  
  #handleDeleteTasksFromBasket() {
    this.#tasksModel.deleteTasksByStatus(Status.BASKET);
  }

  #renderTasksList(status) {
    const tasksListComponent = new TasksListComponent({
      title: StatusLabel[status],
      status,
      onTaskDrop: this.#handleTaskDrop.bind(this)
    });

    render(tasksListComponent, this.#tasksBoardComponent.element);

    const tasksForStatus = this.tasks.filter((task) => task.status === status);

    if (tasksForStatus.length === 0) {
      const noTasksComponent = new NoTasksComponent();
      render(noTasksComponent, tasksListComponent.getTaskContainer());
    } else {
      tasksForStatus.forEach((task) => {
        this.#renderTask(task, tasksListComponent.getTaskContainer());
      });
    }

    if (status === Status.BASKET) {
      this.#renderDeleteComponent(tasksListComponent.getTaskContainer());
    }

    return tasksListComponent.element;
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    Object.values(Status).forEach((status) => {
      this.#renderTasksList(status);
    });
  }

  createTask() {
    const taskTitle = document.querySelector('#add-task').value.trim();
    if (!taskTitle) {
      return;
    }
    this.#tasksModel.addTask(taskTitle);
    document.querySelector('#add-task').value = '';
  }

  #handleTaskDrop(taskId, newStatus) {
    this.#tasksModel.updateTaskStatus(taskId, newStatus);
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }
}

import NoTasksComponent from '../view/no-tasks-component.js';
import LoadingViewComponent from '../view/LoadingViewComponent.js';
import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/taskboard-component.js';
import { StatusLabel, Status } from '../const.js';
import DeleteComponent from '../view/delete-button-component.js';
import { render } from '../framework/render.js';
import { remove } from '../framework/render.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #loadingComponent = new LoadingViewComponent();
  #isLoading = true;
  #tasksModel = null;
  #boardTasks = [];
  #tasksBoardComponent = new TaskBoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  async init() {
    render(this.#loadingComponent, this.#boardContainer);
    await this.#tasksModel.init();
    this.#isLoading = false;
    remove(this.#loadingComponent);

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
  
  async #handleDeleteTasksFromBasket() {
    try {
        await this.#tasksModel.clearBasketTasks();
    } catch (err) {
        console.error('Ошибка при очистке корзины:', err);
    }
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

async createTask() {
    const taskTitle = document.querySelector('#add-task').value.trim();
    if (!taskTitle) {
        return;
    }
    try {
        await this.#tasksModel.addTask(taskTitle);
        document.querySelector('#add-task').value = '';
    } catch (err) {
        console.error('Ошибка при создании задачи:', err);
    }
}


async #handleTaskDrop(taskId, newStatus) {
  try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus);
  } catch (err) {
      console.error('Ошибка при обновлении статуса задачи:', err);
  }
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

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
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.getTasks()];
    render(this.#tasksBoardComponent, this.#boardContainer);
    
    Object.entries(StatusLabel).forEach(([status, title]) => {
      const tasksListComponent = new TasksListComponent({
        title,
        status
      });
      
      render(tasksListComponent, this.#tasksBoardComponent.getElement());
      const tasksContainer = tasksListComponent.getTaskContainer();
      
      this.#boardTasks
        .filter(task => task.status === status)
        .forEach(task => {
          render(new TaskComponent({ task }), tasksContainer);
        });
      
      if (status === Status.BASKET) {
        const deleteComponent = new DeleteComponent();   
        render(deleteComponent, tasksListComponent.getTaskContainer());
      }
    });
  }
}

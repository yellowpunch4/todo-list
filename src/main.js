import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TaskBoardComponent from './view/taskboard-component.js';
import TasksModel from './model/task-model.js';



const bodyContainer = document.querySelector('body');
const headerComponent = new HeaderComponent();
const formAddTaskComponent = new FormAddTaskComponent();
const taskBoardComponent = new TaskBoardComponent();
const boardElement = taskBoardComponent.element;

const tasksModel = new TasksModel();
const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: boardElement,
    tasksModel,
});

render(headerComponent, bodyContainer, RenderPosition.AFTERBEGIN);
render(formAddTaskComponent, bodyContainer);
render(taskBoardComponent, bodyContainer);

taskBoardPresenter.init();
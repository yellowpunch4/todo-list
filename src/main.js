import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TaskBoardComponent from './view/taskboard-component.js';
import TasksModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://680b213dd5075a76d989edc2.mockapi.io';

const bodyContainer = document.querySelector('body');
const headerComponent = new HeaderComponent();

const formAddTaskComponent = new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick
});

const taskBoardComponent = new TaskBoardComponent();
const boardElement = taskBoardComponent.element;

const tasksModel = new TasksModel({
    tasksApiService: new TasksApiService(END_POINT)
});

const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: boardElement,
    tasksModel,
});

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}

render(headerComponent, bodyContainer, RenderPosition.AFTERBEGIN);
render(formAddTaskComponent, bodyContainer);
render(taskBoardComponent, bodyContainer);

taskBoardPresenter.init();

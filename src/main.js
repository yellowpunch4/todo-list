import HeaderComponent from './view/header-component.js';
import TaskListComponent from './view/task-list-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/taskboard-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';


const bodyContainer = document.querySelector('body');
const headerComponent = new HeaderComponent();
const formAddTaskComponent = new FormAddTaskComponent();
const taskBoardComponent = new TaskBoardComponent();

render(headerComponent, bodyContainer, RenderPosition.AFTERBEGIN);
render(formAddTaskComponent, bodyContainer);
render(taskBoardComponent, bodyContainer);


for (let i = 0; i<4;i++){
    const taskListComponent = new TaskListComponent();
    render(taskListComponent, taskBoardComponent.getElement());

    for (let j = 0; j < 4; j++) {
        const taskComponent = new TaskComponent("Название первой задачи");
        render(taskComponent, taskListComponent.getElement().querySelector('.task-list'));
    }
}
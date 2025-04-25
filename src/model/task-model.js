import { Observable } from '../framework/observable.js';
import { generateID } from '../utils.js';
import { UpdateType } from '../const.js';

export default class TasksModel extends Observable {
    #tasksApiService = null;
    #boardtasks = [];

    constructor({ tasksApiService }) {
        super();
        this.#tasksApiService = tasksApiService;
        this.#tasksApiService.tasks.then((tasks) => {
            this.#boardtasks = tasks;
            console.log('Loaded tasks:', tasks);
        });
    }

    get tasks() {
        return this.#boardtasks;
    }
    
    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }

    moveTaskBefore(taskId, targetTaskId) {
        const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
        const targetIndex = this.#boardtasks.findIndex(task => task.id === targetTaskId);
    
        if (taskIndex === -1 || targetIndex === -1) return;
    
        const [task] = this.#boardtasks.splice(taskIndex, 1);
        const targetTask = this.#boardtasks[targetIndex];

        task.status = targetTask.status;
        this.#boardtasks.splice(targetIndex, 0, task);

        this._notify(UpdateType.PATCH);
    }
    
    async addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateID(),
        };

        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UpdateType.MINOR);
            return createdTask;
        } catch (err) {
            console.error('Ошибка при добавлении задачи:', err);
        }
    }

    async deleteTasksByStatus(status) {
        try {
            const tasksToDelete = this.#boardtasks.filter((task) => task.status === status);
            await Promise.all(tasksToDelete.map(task => this.#tasksApiService.deleteTask(task.id)));
            this.#boardtasks = this.#boardtasks.filter((task) => task.status !== status);
            this._notify(UpdateType.MINOR);
        } catch (err) {
            console.error('Ошибка при удалении задач:', err);
        }
    }

    async updateTaskStatus(taskId, newStatus) {
        const task = this.#boardtasks.find(task => task.id === taskId);
        if (task) {
            try {
                const updatedTask = { ...task, status: newStatus };
                await this.#tasksApiService.updateTask(updatedTask);
                task.status = newStatus;
                this._notify(UpdateType.PATCH);
            } catch (err) {
                console.error('Ошибка при обновлении задачи:', err);
            }
        }
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardtasks = tasks;
        } catch(err) {
            this.#boardtasks = [];
        }
        this._notify(UpdateType.INIT);
    }
}

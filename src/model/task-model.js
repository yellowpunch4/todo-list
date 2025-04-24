import { tasks } from '../mock/task.js';
import { generateID } from '../utils.js';

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

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
    
        this._notifyObservers();
    }
    
    addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateID(),
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }

    deleteTasksByStatus(status) {
        this.#boardtasks = this.#boardtasks.filter((task) => task.status !== status);
        this._notifyObservers();
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.#boardtasks.find(task => task.id === taskId);
        if (task) {
            task.status = newStatus;
            this._notifyObservers();
        }
    }
}

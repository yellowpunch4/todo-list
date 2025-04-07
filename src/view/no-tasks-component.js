import { AbstractComponent } from '../framework/view/abstarct-component.js';

export default class NoTasksComponent extends AbstractComponent {
    get template() {
      return `
        <div class="no-tasks">
          <p>Перетащите карточку</p>
        </div>
      `;
    }
  }

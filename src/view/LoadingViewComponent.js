import { AbstractComponent } from '../framework/view/abstarct-component.js';

function createLoadingTemplate() {
    return (
        `<p class="board__no-tasks">
            Loading...
        </p>`
    );
}

export default class LoadingViewComponent extends AbstractComponent {
    get template() {
        return createLoadingTemplate();
    }
}

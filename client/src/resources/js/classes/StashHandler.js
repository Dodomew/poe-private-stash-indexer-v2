import categorize from '../partials/categorizeItems';
import stack from '../partials/stackItems';

let instance = null;

class StashHandler {

    constructor() {
        if (instance) {
            return instance;
        }

        instance = this;
        return instance;
    }

    getInstance() {
        return instance || new StashHandler();
    }

    async initItemsHandler() {
        console.log('INIT ITEMSHANDLER')
        const categorizedItems = await categorize();
        const stackedItems = await stack();
        console.log('STACKED')
        console.log(stackedItems)
        console.log('STACKED END')
    }
}

export default StashHandler;

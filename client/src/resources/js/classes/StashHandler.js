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

    async initItemsHandler(items) {
        console.log('INIT ITEMSHANDLER')
        const categorizedItems = categorize(items);
        console.log(categorizedItems);
        // const stackedItems = stack(categorizedItems);
        // console.log('STACKED BEGIN')
        // console.log(stackedItems)
        // console.log('STACKED END')
    }
}

export default StashHandler;

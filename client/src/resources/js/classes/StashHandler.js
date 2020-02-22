import categorize from '../partials/categorizeItems';
import stack from '../partials/stackItems';
import getPricesPerCategory from '../partials/getPricesPerCategoryFromPoeNinja';

let instance = null;

class StashHandler {

    constructor() {
        if (instance) {
            return instance;
        }

        this.league = null;
        this.modifiers = null;
        this.myStashInventory = null;
        this.poeNinjaItems = null;

        instance = this;
        return instance;
    }

    getMyStashInventory() {
        return this.myStashInventory;
    }

    getPoeNinjaItems() {
        return this.poeNinjaItems;
    }

    getInstance() {
        return instance || new StashHandler();
    }

    setLeague(currentLeague) {
        this.league = currentLeague;
    }

    setModifiersObject(mods) {
        this.modifiers = mods;
    }

    categorizeItems(items) {
        return categorize(items);
    }

    stackItems(categorizedItems) {
        const stackedItems = stack(categorizedItems)
        this.myStashInventory = stackedItems;
        return stackedItems;
    }

    async requestPoeNinjaItems() {
        console.log('INIT ITEMSHANDLER')
        this.poeNinjaItems = await getPricesPerCategory(this.myStashInventory, this.league);
    }
}

export default StashHandler;

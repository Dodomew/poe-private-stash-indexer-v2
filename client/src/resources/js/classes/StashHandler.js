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
        console.log(this.myStashInventory);
        this.poeNinjaItems = await getPricesPerCategory(this.myStashInventory, this.league);
        console.log('this.poeNinjaItems');
        console.log(this.poeNinjaItems);
    }

    assignValuesToMyItems() {
        let organizedItemsArray = Object.values(this.myStashInventory);

        //get my item, then find that item in poeNinja
        for (let i = 0; i < organizedItemsArray.length; i++) {
            for (let j = 0; j < organizedItemsArray[i].length; j++) {
                let item = organizedItemsArray[i][j];
                if(item.category === 'jewels') {
                    // we will request jewel value after everything has loaded
                    // because there might be a lot of jewels, so that's a lot of requests
                    item.chaosValue = 1337;
                    continue;
                }
                this.assignValueToMyItemInPoeNinjaArray(item, i);
            }
        }

        for (let i = 0; i < organizedItemsArray.length; i++) {
            organizedItemsArray[i].sort(this.compareCurrencyValue);
        }

        //return organizedItemsArray;
    }

    compareCurrencyValue(item1, item2) {
        if(!item1.chaosValue || !item2.chaosValue) {
            return 1;
        }
        if (item1.chaosValue > item2.chaosValue) {
            return -1;
        }
        if (item1.chaosValue < item2.chaosValue) {
            return 1;
        }
        // item1 must be equal to item2
        return 0;
    }

    assignValueToMyItemInPoeNinjaArray(item, startIndex) {
        let itemName = item.typeLine;

        for (let i = startIndex; i < this.poeNinjaItems.length; i++) {
            let obj = this.poeNinjaItems[i];
            let innerObj = null;

            try {
                innerObj = obj.body.lines;
            }
            catch (e) {
                console.log(obj)
                console.log(e);
            }

            for (let j = 0; j < innerObj.length; j++) {
                let poeNinjaItemName;

                //is currency
                if(innerObj[j].currencyTypeName) {
                    poeNinjaItemName = innerObj[j].currencyTypeName;
                }
                else {
                    poeNinjaItemName = innerObj[j].name;
                }

                let itemIsFound = this.hasMyItemBeenFound(itemName, poeNinjaItemName)
                if(itemIsFound) {
                    this.assignValueToMyItem(item, innerObj[j]);
                    return;
                }
            }
        }
    }

    assignValueToMyItem(myItem, poeNinjaItem) {
        let value;

        if(poeNinjaItem.hasOwnProperty('receive')) {
            value = poeNinjaItem.receive.value;
        }
        else {
            value = poeNinjaItem.chaosValue;
        }

        myItem.chaosValue = Math.round( value * 10 ) / 10;
    }

    hasMyItemBeenFound(organizedItem, poeNinjaItem) {
        return organizedItem === poeNinjaItem;
    }
}

export default StashHandler;

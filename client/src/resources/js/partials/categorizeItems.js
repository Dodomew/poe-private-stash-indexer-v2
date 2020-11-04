let categorize = (stashItems) => {
    if(!stashItems) {
        console.log('ERROR! stashItems is :');
        console.log(stashItems);
    }

    console.log('INIT CATEGORIZE')
    stashItems = stashItems.body;

    console.log(stashItems);

    let dictionary = {};
    let restrictedItemsArray = ['rings', 'belts', 'amulets', 'quivers', 'armours', 'weapons', 'gems', 'jewels'];
    let pleaseBreakOutOfLoop = false;

    for (let i = 0; i < stashItems.length; i++) {
        for (let j = 0; j < stashItems[i].items.length; j++) {
            pleaseBreakOutOfLoop = false;

            // dictionary will be filled with categories -> items
            let item = stashItems[i].items[j];
            let categoryOfItem;

            //skip these items
            for (let k = 0; k < restrictedItemsArray.length; k++) {
                if(item.icon.toLowerCase().indexOf(restrictedItemsArray[k]) !== -1) {
                    pleaseBreakOutOfLoop = true;
                    break;
                }

                if(item.typeLine.toLowerCase().indexOf('flask') !== -1) {
                    pleaseBreakOutOfLoop = true;
                    break;
                }
            }

            if(pleaseBreakOutOfLoop === true) {
                continue;
            }

            if(!item.hasOwnProperty('category')) {
                item.category = null;
            }

            // split string with linebreak into array for easier looping in list in frontend
            if(item.hasOwnProperty('explicitMods') && !isJewel(item)) {
                let explicitMods = item.explicitMods;
                explicitMods = explicitMods[0].split(/\r?\n/);
                item.explicitMods = explicitMods;
            }

            categoryOfItem = assignCategoryToItem(item);

            if(categoryOfItem === undefined) {
                continue;
            }

            if(!dictionary.hasOwnProperty(categoryOfItem)) {
                dictionary[categoryOfItem] = [];
            }

            item.category = categoryOfItem;
            dictionary[categoryOfItem].push(item);
        }
    }

    return(dictionary);
};

function isBreachSplinter(item) {
    let splinterArray = [
        'splinter of esh',
        'splinter of uul-netol',
        'splinter of tul',
        'splinter of chayula',
        'splinter of xoph'
    ];

    let nameOfItem = item.typeLine.toLowerCase();

    for (let i = 0; i < splinterArray.length; i++) {
        if(nameOfItem.indexOf(splinterArray[i]) !== -1) {
            return true;
        }
    }
}

function isProphecy(item) {
    if (item.hasOwnProperty('prophecyText')) {
        return true;
    }
}

function isDivCard(item) {
    if(item.icon.toLowerCase().indexOf('divination') !== -1 && item.icon.toLowerCase().indexOf('scarab') === -1) {
        return true;
    }
}

function isFragment(item) {
    if(item.icon.toLowerCase().indexOf('maps') !== -1) {
        return true;
    }
}

function isOil(item) {
    if(item.icon.toLowerCase().indexOf('oils') !== -1) {
        return true;
    }
}

function isEssence(item) {
    if (item.typeLine.indexOf('Essence') !== -1 || item.typeLine.indexOf('Remnant') !== -1 && item.icon.toLowerCase().indexOf('essence') !== -1) {
        return true;
    }
}

function isFossil(item) {
    if (item.typeLine.indexOf('Fossil') !== -1 && item.icon.toLowerCase().indexOf('delve') !== -1) {
        return true;
    }
}

function isResonator(item) {
    if (item.typeLine.indexOf('Resonator') !== -1 && item.icon.toLowerCase().indexOf('delve') !== -1) {
        return true;
    }
}

function isScarab(item) {
    if (item.typeLine.indexOf('Scarab') !== -1 && item.icon.toLowerCase().indexOf('currency') !== -1) {
        return true;
    }
}

function isIncubator(item) {
    if (item.typeLine.indexOf('Incubator') !== -1) {
        return true;
    }
}

function isJewel(item) {
    if(item.icon.toLowerCase().indexOf('jewels') !== -1) {
        return true;
    }
}

function isCurrency(item) {
    if(item.icon.toLowerCase().indexOf('currency') !== -1) {
        return true;
    }
}

function assignCategoryToItem(item, categoryOfItem) {
    // prophecies have the currency category; i create prophecy category
    if(isProphecy(item)) {
        return 'prophecies';
    }

    //breach splinter is no longer a fragment, but currency (poeninja)
    else if(isBreachSplinter(item)) {
        return 'currency';
    }

    else if(isDivCard(item)) {
        return 'divination cards';
    }

    else if(isFragment(item)) {
        return 'fragments';
    }

    else if(isOil(item)) {
        return 'oils';
    }

    else if(isEssence(item)) {
        return 'essences';
    }

    else if(isFossil(item)) {
        return 'fossils';
    }

    else if(isResonator(item)) {
        return 'resonators';
    }

    else if(isScarab(item)) {
        return 'scarabs';
    }

    else if(isIncubator(item)) {
        return 'incubator';
    }

    else if(isCurrency(item)) {
        return 'currency';
    }
}

export default categorize;

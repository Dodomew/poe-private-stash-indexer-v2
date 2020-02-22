const axios = require('axios');

const lookupTable = {
    "prophecies": function() {
        return "Prophecy";
    },
    "divination cards": function() {
        return "DivinationCard";
    },
    "skill gems":  function() {
        return "SkillGem";
    },
    "essences": function() {
        return "Essence";
    },
    "maps": function() {
        return "Map";
    },
    "fragments": function() {
        return "Fragment";
    },
    "fossils":  function() {
        return "Fossil";
    },
    "resonators": function() {
        return "Resonator";
    },
    "scarabs": function() {
        return "Scarab";
    },
    "currency": function() {
        return "Currency";
    },
    "incubators": function () {
        return "Incubator";
    },
    "oils": function () {
        return "Oil";
    },
    "gems": function() {
        return "SkillGem";
    },
    "jewels": function () {
        return "Jewels"
    }
};

let getPricesPerCategory = async(items, league) => {
    let poeNinjaItemsArray = [];
    let myCategoriesArray = Object.keys(items);

    for (let i = 0; i < myCategoriesArray.length; i++) {
        let category = myCategoriesArray[i];
        category = category.toLowerCase();

        if(category === 'jewels') {
            poeNinjaItemsArray[i] = { lines: items[category] };
            continue;
        }

        poeNinjaItemsArray[i] = await requestPricesOfCategory(category, league);
    }

    return poeNinjaItemsArray;
};

let requestPricesOfCategory = async (category, league) => {
    let poeNinjaCategory = lookupTable[category]();
    const response = await fetch('/api/get-poe-ninja-category/' + league + '/' + poeNinjaCategory);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
};

export default getPricesPerCategory;

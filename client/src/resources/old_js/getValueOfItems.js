const helper = require('../helper/helper');
const request = require('request');
const EnvironmentVariables = require('../classes/EnvironmentVariables');

let environmentVariables = new EnvironmentVariables().getInstance();

var lookupTable = {
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

let requestApiForValues = (league, category) => new Promise((resolve, reject) => {
    // convert my category string to poe.ninja string
    let url;
    category = lookupTable[category]();

    if(category === 'Fragment' || category === 'Currency') {
        url = 'https://poe.ninja/api/data/currencyoverview?league=' + league + '&type=' + category;
    }
    else {
        url = 'https://poe.ninja/api/data/itemoverview?league=' + league + '&type=' + category;
    }

    request({
            url: url,
        },
        (error, response, body) => {
            if (error) {
                reject(error);
            }
        resolve(JSON.parse(body));
    });
});

module.exports = (organizedItems) => new Promise((resolve, reject) => {
    let league = environmentVariables.getLeague();
    let items = organizedItems;
    let poeNinjaItemsArray = [];
    let categoryArray = Object.keys(items);
    let allRequestPromises = [];

    for (let i = 0; i < categoryArray.length; i++) {
        let type = categoryArray[i];
        type = type.toLowerCase();

        if(type === 'jewels') {
            allRequestPromises[i] = { lines: items[type] };
            continue;
        }
        allRequestPromises[i] = requestApiForValues( league, type);
    }

    /*
     All requests in this file are promises. So when all promises are positively resolved,
     we can resolve the getItems() and return the data for further use
     */
    Promise.all(allRequestPromises).then(function(values) {
        values.forEach((categoryAsJsonObj) => {
            poeNinjaItemsArray.push(categoryAsJsonObj);
        });
        resolve([organizedItems, poeNinjaItemsArray]);
    });
});

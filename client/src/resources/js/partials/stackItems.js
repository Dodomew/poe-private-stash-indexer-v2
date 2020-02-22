/*

 items = object holding object holding array that holds objects

 items = {
 'currency' : [
 {
 w: 1,
 h: 1,
 typeLine: Chaos orb,
 },
 {
 w: 1,
 h: 1,
 typeLine: Scarab
 },
 ],
 'armour' : [{}]
 }

 so to loop through this, we convert it to an array by Object.values and .keys
 items = [
 'currency' = [
 {
 w: 1,
 h: 1,
 typeLine: Chaos Orb,
 }
 ]
 ]

 then you can loop through it like so:
 for() items.length {
 for() items.[i].length {
 let item = items[i][j];
 let name = item.typeLine;
 }
 }
 */

import categorize from "./categorizeItems";

let stack = (categorizedItems) => {

    let resonators = {};
    let prophecies = {};
    let incubators = {};
    let fragments = {};
    let scarabs = {};

    let items = Object.values(categorizedItems);
    let category = Object.keys(categorizedItems);

    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items[i].length; j++) {
            let item = items[i][j];
            let objToFill = {};

            //certain items don't stack, so I ''stack'' them here for better viewing
            switch (item.category) {
                case 'resonators':
                    objToFill = resonators;
                    break;
                case 'prophecies':
                    objToFill = prophecies;
                    break;
                case 'incubators':
                    objToFill = incubators;
                    break;
                case 'fragments': //most fragments actually stack, except for a few :(
                    objToFill = fragments;
                    break;
                case 'scarabs':
                    objToFill = scarabs;
                    break;
                default:
                    continue;
            }

            let itemName = item.typeLine;

            //if the item does not exist yet in our obj, we create it and set amount to 1
            if(!objToFill.hasOwnProperty(itemName)) {
                objToFill[itemName] = item;
                if(!('stackSize' in item)) {
                    objToFill[itemName].stackSize = 1;
                }
            }
            else {
                objToFill[itemName].stackSize++;
            }
        }

        // we add a new key called stackSize to the original filtered object's category
        // that way we can still loop through all the objects, e.g. item.stackSize
        if(category[i] === 'resonators') {
            categorizedItems[category[i]] = Object.values(resonators);
        }
        else if (category[i] === 'prophecies') {
            categorizedItems[category[i]] = Object.values(prophecies);
        }
        else if (category[i] === 'resonators') {
            categorizedItems[category[i]] = Object.values(incubators);
        }
        else if (category[i] === 'fragments') {
            categorizedItems[category[i]] = Object.values(fragments);
        }
        else if (category[i] === 'scarabs') {
            categorizedItems[category[i]] = Object.values(scarabs);
        }
    }
    return(categorizedItems);
};

export default stack;

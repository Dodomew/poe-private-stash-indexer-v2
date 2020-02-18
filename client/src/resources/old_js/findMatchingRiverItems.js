const helper = require('./helper/helper');
const fs = require('fs');
const request = require('request');

function hasNumber(myString) {
    return /\d/.test(myString);
}

function scoreJewel(myJewel, riverJewel) {
    let jewelMods = myJewel.explicitMods;
    let riverJewelMods = riverJewel.explicitMods;

    if(!jewelMods || !riverJewelMods) {
        return 0;
    }

    let matchingScore = 0;
    let differentScore = 0;

    // if our jewel has less mods than river jewel, we add penalty,
    // because we want exactly equal. So if 3 of the 4 mods are a match, thats good but not 100% equal
    if(jewelMods.length < riverJewelMods.length) {
        differentScore += 5 * (riverJewelMods.length - jewelMods.length);

        /*
            jewelMods.length = 1;
            riverJewelmods.length = 4;

            if(1 < 4) {
                5 * (4 -1) = 15;
            }

            differentScore = 15
         */
    }

    // split mod string into seperate words. if myJewel mods length !== river mods length,
    // then it is not worth checking them out as they are already not equal
    for (let j = 0; j < jewelMods.length; j++) {
        let splitJewelMods = jewelMods[j].split(' ');
        let modMatchFound = false;
        let penaltyScore = splitJewelMods.length;

        for (let k = 0; k < splitJewelMods.length; k++) {
            if(riverJewelMods[k] === undefined) {
                continue;
            }

            let splitRiverMods = riverJewelMods[k].split(' ');

            if(splitJewelMods.length !== splitRiverMods.length) {
                continue;
            }

            // we don't want to do double penalty, so we track if we are able to do a penalty
            modMatchFound = true;

            // now check if every word in mod is equal between both jewels
            for (let i = 0; i < splitJewelMods.length; i++) {
                if(splitJewelMods[i] === splitRiverMods[i]) {
                    matchingScore++;
                }

                //if there is no number in string , it means a word is not the same,
                // therefor mod is incorrect, so skip it
                // e.g. "+10 to Intelligence" vs + "12 to Intelligence" = good, slight penalty
                // "+10 to Intelligence" vs "+10 to Strength" = bad, add greater penalty and skip
                else {
                    if(!hasNumber(splitRiverMods[i])) {
                        differentScore += penaltyScore;
                        break;
                    }
                    else {
                        differentScore += 0.5;
                    }
                }
            }
        }

        if(modMatchFound === false) {
            differentScore += penaltyScore;
        }
    }

    let totalScore = {
        "matchingScore" : matchingScore,
        "differentScore" : differentScore,
        "percentage": matchingScore / (matchingScore + 0.01 + differentScore) //no divide by 0 plz
    };

    return totalScore;
}

let getMatchingRiverJewelInfo = (riverJewel) => new Promise((resolve, reject) => {
    let url = process.env.TRADE_API_FETCH_URL;
    let id = riverJewel.id;

    url = url + '' + id;

    console.log("Fetching: " + url)

    request({
        url: url,
    },
    (error, response, body) => {
        if (error) {
            resolve(error);
        }

        resolve(JSON.parse(body));
    });
});

module.exports = (jewel) => new Promise((resolve, reject) => {

    jewel.chaosValue = 42;
    let riverJewelsArray = [];
    let riverJewelApiCalls = [];

    for (let i = 0; i < global.riverArray.length; i++) {
        let riverJewel = global.riverArray[i];

        let score = scoreJewel(jewel, riverJewel);

        if(score.percentage > 0.8) {
            //Dont save the score, this needs to be re evaluated every time


            // console.log(JSON.stringify(riverJewel) + ',');
            // console.log(JSON.stringify(item) + ',');

            if(riverJewelsArray.length > 5) {
                break;
            }
            else {
                riverJewelsArray.push(riverJewel);
            }
        }
        else if (score.percentage > 0.3)
        {
            // console.log("score: " + score.percentage);
            // console.log(JSON.stringify(riverJewel) + ',');
            // console.log(JSON.stringify(item) + ',');

        }
    }

    console.log("Found " + riverJewelsArray.length + " matching jewels");

    for (let i = 0; i < riverJewelsArray.length; i++) {
        if (!riverJewelsArray[i].hasOwnProperty("currencyAmount"))
            riverJewelApiCalls.push(getMatchingRiverJewelInfo(riverJewelsArray[i]));
    }

    Promise.all(riverJewelApiCalls).then(function(requestedRiverItems) {

        //Store api call results in object
        requestedRiverItems.forEach((requestedRiverItem) => {
            // console.log(requestedRiverItem);
            // console.log(requestedRiverItem.result[0].listing);
            if(requestedRiverItem.result[0].listing.price !== null) {
                let requestedRiverInfo = requestedRiverItem.result[0].listing.price;
                // console.log(requestedRiverInfo);
                let currency = requestedRiverInfo.currency;

                //find the same item in our local array.
                // local array: riverJewelsArray
                // we can do this by comparing the id hash
                // requestedRiverItem.result[0].id === riverJewelsArray[i].id

                for (let i = 0; i < riverJewelsArray.length; i++) {
                    // console.log(requestedRiverItem.result[0].id);
                    // console.log(riverJewelsArray[i].id);
                    if(requestedRiverItem.result[0].id === riverJewelsArray[i].id) {
                        let amount = requestedRiverInfo.amount;

                        if(currency === 'chaos') {
                            riverJewelsArray[i].currencyAmount = amount;
                            //console.log("chaos: " + amount);
                        }
                        else if(currency === 'alch') {
                            riverJewelsArray[i].currencyAmount = amount * 0.5; //1 chaos = 2 alch
                            //console.log("alch: " + amount);
                        }
                        else if(currency === 'exa') {
                            riverJewelsArray[i].currencyAmount = amount * 100; //1 chaos = 0.01exa
                            //console.log("alch: " + amount);
                        }
                        else {
                            //console.log(requestedRiverItem.result[0].listing);
                        }
                    }
                }
            }
            else {

            }
        });

        let averagePrice = 0;
        let goodJewels = 0;

        //Find average price
        for (let i = 0; i < riverJewelsArray.length; i++) {
            if (!riverJewelsArray[i].hasOwnProperty("currencyAmount")) {
                continue;
            }
            // console.log('currencyAmount: ' + riverJewelsArray[i].currencyAmount);
            averagePrice += riverJewelsArray[i].currencyAmount;
            goodJewels += 1;
        }

        if(goodJewels > 0) {
            // console.log('jewel.chaosValue 1: ' + jewel.chaosValue);
            // console.log('avgPrice ' + averagePrice);
            // console.log('goodJewels ' + goodJewels);
            jewel.chaosValue =  Math.round( (averagePrice / goodJewels) * 10 ) / 10;
            /*console.log('jewel.chaosValue 2: ' + jewel.chaosValue);*/
        }
        else
        {
            //otherwise this jewel will be shown while it does not have a price
            jewel.chaosValue = 0;
        }

        resolve(requestedRiverItems);
    });
});

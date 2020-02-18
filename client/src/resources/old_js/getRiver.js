const helper = require('../helper/helper');
const request = require('request');
const rp = require('request-promise');
const fs = require('fs');
var nextChangeId = null;

const removeOldItems = (itemDate) => {
    const second = 1000;
    const minute = 60;
    const hour = 60;

    const eightHours = second * minute * hour * 1;
    const eightHoursAgo = Date.now() - eightHours;
    return itemDate < eightHoursAgo;
};

var LastPublicIdOptions = {
    uri: 'http://poe.ninja/api/Data/GetStats',
    json: true // Automatically parses the JSON string in the response
};

const removeOldItemFromArray = () => {
    /*
        Loop through entire river jewel array and check each jewel if they are older than 8 hours. If so,
        remove from the array. This is to keep the array not too large and up to date.
     */
    let itemCount = 0;

    for (let i = 0; i < global.riverArray.length; i++) {
        let dateOfItem = global.riverArray[i].date;

        if(removeOldItems(dateOfItem)) {
            itemCount++;
        }
        else {
            global.riverArray.splice(0, itemCount);
            console.log('removed '+ itemCount + ' items')
            break;
        }
    }
};

const pushItemToArray = (path, data) => {
    let AppendCount = 0;

    for (let i = 0; i < data.stashes.length; i++) {
        let league = data.stashes[i].league;

        if(league === null || league.toLowerCase() !== process.env.LEAGUE.toLowerCase()) {
            continue;
        }

        if(data.stashes[i].accountName === null || data.stashes[i].stash === null || !data.stashes[i].items.length) {
            continue;
        }

        let stashItems = data.stashes[i].items;

        for (let j = 0; j < stashItems.length; j++) {
            let item = stashItems[j];
            if(item.extended.category === 'jewels') {
                let itemObj = {
                    id: item.id,
                    explicitMods: item.explicitMods,
                    date: Date.now()
                };
                AppendCount++;
                riverArray.push(itemObj);
            }
        }
    }
    console.log('appended ' + AppendCount +' jewels');
    console.log(global.riverArray.length);
    removeOldItemFromArray();
};

let getLastPublicId = () => rp(LastPublicIdOptions)
    .then((parsedBody) => {
        nextChangeId = parsedBody.next_change_id;

        let riverOptions = {
            uri: `http://www.pathofexile.com/api/public-stash-tabs?id=${nextChangeId}`,
            json: true // Automatically parses the JSON string in the response
        };

        console.log('poeNinja nextId: ' + nextChangeId);
        console.log(riverOptions.uri);

        requestRiver(riverOptions);
    })
    .catch(() => {
        console.log('error getLastPublicId')
});

let requestRiver = (riverOptions) => rp(riverOptions)
    .then((parsedBody) => {
        console.log('requestRiver before: ' + nextChangeId);
        nextChangeId = parsedBody.next_change_id;
        pushItemToArray('jewels_', parsedBody);
        console.log('requestRiver nextId: ' + nextChangeId)
        setTimeout(() => {
            let riverOptions = {
                uri: `http://www.pathofexile.com/api/public-stash-tabs?id=${nextChangeId}`,
                json: true // Automatically parses the JSON string in the response
            };

            requestRiver(riverOptions);
        }, 10000)
    })
    .catch((err) => {
        console.log(err);
        console.log('error requestRiver')
});

module.exports = () => new Promise((resolve, reject) => {
    getLastPublicId();
});

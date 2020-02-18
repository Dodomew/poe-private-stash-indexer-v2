const request = require('request');
const EnvironmentVariables = require('../classes/EnvironmentVariables');

let environmentVariables = new EnvironmentVariables().getInstance();

/*
    this function contains a promise which returns the data received from the request
 */
let requestStashTab = (accountName, index, sessionID, league) => new Promise((resolve, reject) => {
    request({
                headers: {
                    Referer: 'https://www.pathofexile.com',
                    Cookie: `POESESSID=${sessionID}`
                },
                url: `https://www.pathofexile.com/character-window/get-stash-items?accountName=${accountName}&tabIndex=${index}&league=${league}&tabs=1`,
            }, (error, response, body) => {
        if (error) {
            reject(error);
        }
        resolve(JSON.parse(body).items);
    });
});

/*
    the getItems() (this file) is a promise which resolves when all other promises have resolved
 */

module.exports = (accountName, sessionID) => new Promise((resolve, reject) => {
    let league = environmentVariables.getLeague();
    /*
        send out first request for accountname and all stashes it contains
     */
    request({
                headers: {
                    Referer: 'https://www.pathofexile.com',
                    Cookie: `POESESSID=${sessionID}`
                },
                url: `https://www.pathofexile.com/character-window/get-stash-items?accountName=${accountName}&tabIndex=0&league=${league}&tabs=1`,
            }, (error, response, body) => {
        if (error) {
            reject(error);
        }

        /*
            We received the data from the request, now parse it for further use
         */
        let json, tabs;
        try {
            json = JSON.parse(body);
            tabs = json.tabs;
            amountOfTotalTabs = json.numTabs;
        } catch (error) {}

        if (json) {
            if (json.error && json.error.code === 1) {
                reject(new Error('PoE generic api error'));
            }
        }

        if (!tabs) {
            reject(new Error('Bad Session ID/Account name combination'));
            return;
        }

        /*
            The data received has a prop named numTabs, which is an int.
            We will now loop x amount of times to request each stash tab and
            then we will save the returned data in an array
         */
        let allItemsArray = [];
        let allRequestPromises = [];

        for (let i = 0; i < amountOfTotalTabs; i++) {
            let requestPromise = requestStashTab(accountName, i, sessionID, league);
            allRequestPromises[i] = requestPromise;
        }

        /*
            All requests in this file are promises. So when all promises are positively resolved,
            we can resolve the getItems() and return the data for further use
         */
        Promise.all(allRequestPromises).then(function(values) {
            values.forEach((tabItems) => {
                allItemsArray.push(tabItems);
            });
            resolve(allItemsArray);
        });
    });
});

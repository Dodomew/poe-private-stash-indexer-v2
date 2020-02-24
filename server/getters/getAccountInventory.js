const axios = require('axios');

function buildUrl(accountName, index, league) {
    return `https://www.pathofexile.com/character-window/get-stash-items?accountName=${accountName}&tabIndex=${index}&league=${league}&tabs=1`;
}

requestFirstTab = async (accountName, sessionID, league) => {
    console.log('requestFirstTab')
    const url = buildUrl(accountName, 0, league);
    console.log(url)

    return await axios.get(url, {
        headers: {
            Referer: 'https://www.pathofexile.com',
            Cookie: `POESESSID=${sessionID}`
        }
    })
    .then(async(response) => {
        return response.data;
    })
        .catch(error => {
            throw error;
        });
};

getInventoryPerTab = async (accountName, sessionID, league) => {
    let firstTab = await requestFirstTab(accountName, sessionID, league);
    let numberOfTabs = firstTab.numTabs;
    let inventory = [firstTab];
    let promises = [];

    //we start at i = 1, because we already got the first tab
    for (let i = 1; i < numberOfTabs; i++) {
        let url = buildUrl(accountName, i, league);
        promises.push(axios.get(url, {
            headers: {
                Referer: 'https://www.pathofexile.com',
                Cookie: `POESESSID=${sessionID}`
            }
        }))
    }

    axios.all(promises).then(function(results) {
        results.forEach(function(response, index) {
            inventory.push(response.data);
        })
    });

    return inventory;
};

module.exports = {
    getInventoryPerTab
};

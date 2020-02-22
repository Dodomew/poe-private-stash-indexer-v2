const axios = require('axios');

function buildUrl(accountName, index, league) {
    return `https://www.pathofexile.com/character-window/get-stash-items?accountName=${accountName}&tabIndex=${index}&league=${league}&tabs=1`;
}

request = async (accountName, sessionID, league) => {
    console.log('request')
    const url = buildUrl(accountName, 0, league);
    console.log(url)

    return await axios.get(url, {
        headers: {
            Referer: 'https://www.pathofexile.com',
            Cookie: `POESESSID=${sessionID}`
        }
    })
    .then(async(response) => {
        console.log(response.data.numTabs);
        return response.data.numTabs;
    })
        .catch(error => {
            throw error;
        });
};

getInventoryPerTab = async (accountName, sessionID, league) => {
    let numberOfTabs = await request(accountName, sessionID, league);
    let inventory = [];

    for (let i = 0; i < numberOfTabs; i++) {
        let url = buildUrl(accountName, i, league);
        console.log(url)
        await axios.get(url, {
            headers: {
                Referer: 'https://www.pathofexile.com',
                Cookie: `POESESSID=${sessionID}`
            }
        })
        .then(async(response) => {
            inventory[i] = await response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
    }

    return inventory;
};

module.exports = {
    getInventoryPerTab
};

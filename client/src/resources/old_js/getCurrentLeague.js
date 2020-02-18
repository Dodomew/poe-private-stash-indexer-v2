const request = require('request');

const leagueURL = 'https://www.pathofexile.com/api/trade/data/leagues';

async function get () {
    let league;

    let { body, response } = await retrieveLeague();

    if (response.statusCode !== 200) {
        return {response, body};
    }

    let leagues = JSON.parse(body);
    league = leagues.result[0].id;

    console.log('getters retrieveLeague');
    console.log(league)
    return league;
}

async function retrieveLeague () {
    return new Promise((resolve, reject) => {
        request({ url: leagueURL, method: 'GET' }, (error, response, body) => {
            if (error) {
                return reject(error);
            }

            return resolve({ body, response })
        })
    })
}

module.exports = {
    get
};

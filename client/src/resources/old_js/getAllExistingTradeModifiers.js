const request = require('request');

const statsURL = `https://www.pathofexile.com/api/trade/data/stats`;

async function get () {
    let { body, response } = await retrieveAllStats();

    if (response.statusCode !== 200) {
        return {response, body};
    }

    let parsedStats = JSON.parse(body);

    console.log('getters retrieveAllStats');
    console.log(parsedStats.result[0].label)
    return await parsedStats;
}

async function retrieveAllStats () {
    return new Promise((resolve, reject) => {
        request({ url: statsURL, method: 'GET' }, (error, response, body) => {
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

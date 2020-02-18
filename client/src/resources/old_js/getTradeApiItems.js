const request = require('request');
const EnvironmentVariables = require('../classes/EnvironmentVariables');

let environmentVariables = new EnvironmentVariables().getInstance();

/*
    1) For each item, request tradeAPIUrl with body = item
    2) In returned result is an ID. We make request to https://www.pathofexile.com/api/trade/fetch/RESULT_LINES_HERE?query=ID_HERE
    3) This returns list of items like in the river JS where we can find the price of the item
    3a) You can comma seperate the IDs : https://www.pathofexile.com/api/trade/fetch/e90f6f29233424e9d85b1d488aab29e33edededf06f08a4aaf75d9bb67c251db,dbb04462a152cdf58f5960d9b23a70d2ce30d78ae0b8c71dc13ed392d3fff4c1?query=vnakwfm
 */
let item = {
    "query": {
        "status": {
            "option": "online"
        },
        "name": "The Pariah",
        "type": "Unset Ring",
        "stats": [{
            "type": "and",
            "filters": []
        }]
    },
    "sort": {
        "price": "asc"
    }
};

let getTradeApiItems = () => new Promise((resolve, reject) => {
    let league = environmentVariables.getLeague();
    let tradeApiURL = `https://www.pathofexile.com/api/trade/search/${league}`;

    request({
                url: tradeApiURL,
                body: item,
                method: 'POST',
                json: true
            }, (error, response, body) => {
        if (error) {
            reject(error);
        }
        // console.log(body)

        let id = body.id;

        console.log(tradeApiURL + '/' + id);

        request({
            url: tradeApiURL + '/' + id,
            method: 'POST'
        }, (error, response, body) => {
            if (error) {
                reject(error);
            }
            // console.log(body)
            resolve(body);
        });
    });
});

module.exports = () => new Promise((resolve, reject) => {
    resolve(getTradeApiItems());
});

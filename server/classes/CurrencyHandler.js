const RequestHandler = require('./RequestHandler');
const getCurrentLeague = require('../getters/getCurrentLeague');

let instance = null;
const requestHandler = new RequestHandler().getInstance();

class CurrencyHandler {

    constructor() {
        if (instance) {
            return instance;
        }

        this.league = null;
        this.URL = null;
        this.data = null;

        instance = this;
        return instance;
    }

    getInstance() {
        return instance || new CurrencyHandler();
    }

    constructURL() {
        this.URL =  'https://poe.ninja/api/data/currencyoverview?league=' + this.league + '&type=Currency';
    }

    async getJsonFromAPI() {
        await getCurrentLeague.get().then((league) => {
            this.league = league;
            this.constructURL();
        });

        let result = await requestHandler.enqueueRequest(this.URL, "GET");
        let response = result.response;
        let body = result.data;

        if (result.response.statusCode !== 200) {
            return {response, body};
        }
        return this.data = body;
    }

    getData() {
        console.log('CurrencyHandler getData')
        if(this.data !== null) {
            console.log('return data')
            return this.data;
        }
        else {
            console.log('await getData');
            this.getJsonFromAPI().then((data) => {
                this.data = data;
                return this.data;
            });
        }
    }

    requestCurrency() {
        console.log('getJsonFromApi')
        this.getJsonFromAPI().then(() => {
            setTimeout(() => {
                console.log('requestCurrency')
                this.requestCurrency()
            }, 3600000)
        })
    }
}

module.exports = CurrencyHandler;

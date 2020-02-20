const leagueURL = 'https://www.pathofexile.com/api/trade/data/leagues';
const axios = require('axios');

request = async () => {
    return await axios.get(leagueURL)
         .then(response => {
             return response.data;
         })
         .catch(error => {
             throw error;
         });
};

module.exports = {
    request
};

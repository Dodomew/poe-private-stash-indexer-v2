const statsURL = `https://www.pathofexile.com/api/trade/data/stats`;
const axios = require('axios');

request = async () => {
    return await axios.get(statsURL)
         .then(response => {
             return response;
         })
         .catch(error => {
             throw error;
         });
};

module.exports = {
    request
};

const axios = require('axios');

request = async (category, league) => {
    let url;

    if(category === 'Fragment' || category === 'Currency') {
        url = 'https://poe.ninja/api/data/currencyoverview?league=' + league + '&type=' + category;
    }
    else {
        url = 'https://poe.ninja/api/data/itemoverview?league=' + league + '&type=' + category;
    }

    return await axios.get(url)
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

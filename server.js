const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const getCurrentLeague = require('./server/getters/getCurrentLeague');
const getAllExistingTradeMods = require('./server/getters/getAllExistingTradeModifiers');
const getAccountInventory = require('./server/getters/getAccountInventory');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
    GET
 */

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.get('/api/get-league', (req, res) => {
    getCurrentLeague.request()
        .then((body) => {
            res.send({
                'body': body
            });
        })
        .catch((err) => {
            throw err;
        })
});

app.get('/api/get-stats', (req, res) => {
    getAllExistingTradeMods.request()
    .then((body) => {
        res.send({
            'body': body.data
        });
    })
    .catch((err) => {
        throw err;
    })
});

/*
    POST
 */
app.post('/api/get-account', (req, res) => {
    console.log('get account')
    getAccountInventory.getInventoryPerTab(req.body.accountName, req.body.sessionID, req.body.league)
    .then((body) => {
        console.log('got body')
        // console.log(body)
        res.send({
            'body': body
        });
    }).catch((err) => {
        console.log(err);
    });
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

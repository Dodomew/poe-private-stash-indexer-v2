import React, { useState, useEffect } from 'react';
import Form from '../components/Form/Form';
import StashHandler from "../resources/js/classes/StashHandler";
import './App.css';

const App = () => {
    const [stashInventory, setStashInventory] = useState(null);
    const [league, setLeague] = useState(null);
    const [stats, setStats] = useState(null);
    const [stashHandler, setStashHandler] = useState(null);
    const [poeNinjaItems, setPoeNinjaItems] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Loading...');

    const postAccountInfo = async(accountName, sessionID) => {
        console.log('POSTACCOUNTINFO BEFORE FETCH');

        setIsLoading(true);
        setLoadingMessage('Fetching your stash inventory...');

        const response = await fetch('/api/get-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                 'accountName' : accountName,
                 'sessionID' : sessionID,
                 'league' : league
             }),
        });

        console.log(response);

        console.log('POSTACCOUNTINFO DONE')

        const body = await response.json();

        console.log(body);

        if (response.status !== 200) {
            throw Error(body.message)
        }

        setLoadingMessage('Received your stash inventory...');

        console.log('POSTACCOUNTINFO HANDLESTASH')

        await updateStashHandler(body);
    };

    const updateStashHandler = async(items) => {
        console.log('HANDLESTASH')
        stashHandler.setLeague(league);
        stashHandler.setModifiersObject(stats);
        const categorizedItems = stashHandler.categorizeItems(items);
        stashHandler.stackItems(categorizedItems);

        setStashInventory(stashHandler.getMyStashInventory());
        setLoadingMessage('Fetching PoeNinja items...');

        await stashHandler.requestPoeNinjaItems();

        setPoeNinjaItems(stashHandler.getPoeNinjaItems());
        setStashInventory(stashHandler.assignValuesToMyItems());

        setLoadingMessage('All done');
    };

    useEffect(() => {
        const getLeague = async() => {
            const response = await fetch('/api/get-league');
            const body = await response.json();

            if (response.status !== 200) throw Error(body.message);

            return body;
        };

        const getStats = async() => {
            const response = await fetch('/api/get-stats');
            const body = await response.json();

            if (response.status !== 200) throw Error(body.message);

            return body;
        };

        setStashHandler(new StashHandler().getInstance());

        getLeague()
            .then((data) => {
                setLeague(data.body.result[0].id);
            })
            .catch(err => {
                console.log(err);
            });

        getStats()
            .then((data) => {
                setStats(data.body.result);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="App">
            <p>
                {league}
            </p>
            <p>
                {loadingMessage}
            </p>
            <Form handleData={postAccountInfo}/>
        </div>
    )
};

export default App;

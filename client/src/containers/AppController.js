import React, { useState, useEffect, useRef } from 'react';
import StashHandler from "../resources/js/classes/StashHandler";
import FormController from "../components/Form/FormController";
import List from "../components/Result/Content/List/List";
import App from "./App";
import HeroController from "../components/Hero/HeroController";
import Form from "../components/Form/Form";

const AppController = () => {
    const myStashInventory = useRef(null);
    const [league, setLeague] = useState(null);
    const [stashHandler, setStashHandler] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Loading...');

    // const [stats, setStats] = useState(null);
    // const [poeNinjaItems, setPoeNinjaItems] = useState(null);

    //first time render
    useEffect(() => {
        const getLeague = async() => {
            const response = await fetch('/api/get-league');
            const body = await response.json();

            if (response.status !== 200) throw Error(body.message);

            return body;
        };

        // const getStats = async() => {
        //     const response = await fetch('/api/get-stats');
        //     const body = await response.json();
        //
        //     if (response.status !== 200) throw Error(body.message);
        //
        //     return body;
        // };

        setStashHandler(new StashHandler().getInstance());

        getLeague()
            .then((data) => {
                setLeague(data.body.result[0].id);
            })
            .catch(err => {
                console.log(err);
            });

        // getStats()
        //     .then((data) => {
        //         setStats(data.body.result);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }, []);

    const postAccountInfo = async(accountName, sessionID) => {
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

        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }

        setLoadingMessage('Received your stash inventory...');

        // await updateStashHandler(body);
    };

    const updateStashHandler = async(items) => {
        stashHandler.setLeague(league);
        // stashHandler.setModifiersObject(stats);

        const categorizedItems = stashHandler.categorizeItems(items);
        stashHandler.stackItems(categorizedItems);
        setLoadingMessage('Fetching PoeNinja items...');

        await stashHandler.requestPoeNinjaItems();

        // setPoeNinjaItems(stashHandler.getPoeNinjaItems());
        stashHandler.assignValuesToMyItems();
        myStashInventory.current = stashHandler.getMyStashInventory();
        setLoadingMessage('All done');
    };

    const renderForm = () => {
        return(
            <FormController handleData={postAccountInfo}/>
        )
    };

    const renderList = () => {
        const myStashInventoryArray = Object.keys(myStashInventory.current);
        return myStashInventoryArray.map((category) => {
            return(
                <List key={category} category={category} items={myStashInventory.current[category]} isLoading={false}/>
            )
        });
    };

    return (
        <div>
            <HeroController/>
            <FormController/>
        </div>
    );
};

export default AppController;

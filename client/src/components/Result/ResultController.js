import React, { useState, useEffect, useRef } from 'react';
import StashHandler from "../../resources/js/classes/StashHandler";

const ResultController = (props) => {
    const [stashHandler, setStashHandler] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState(null);
    const [stats, setStats] = useState(null);
    const [poeNinjaItems, setPoeNinjaItems] = useState(null);

    //first time render
    useEffect(() => {
        setStashHandler(new StashHandler().getInstance());

        const getStats = async () => {
            const response = await fetch('/api/get-stats');
            const body = await response.json();

            if (response.status !== 200) throw Error(body.message);

            return body;
        };

        getStats()
            .then((data) => {
                setStats(data.body.result);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    useEffect(() => {
        if(stashHandler) {
            init();
        }
    }, [stashHandler])

    useEffect(() => {
        if(loadingMessage) {
            props.loadingMessageHandler(loadingMessage);
        }
    }, [loadingMessage]);

    const myStash = props.items;
    const league = props.league

    if (myStash === null || league === null) {
        return null;
    }

    const setVarsForMyStash = () => {
        stashHandler.setLeague(league);
        stashHandler.setModifiersObject(stats);
    }

    const organizeMyStash = () => {
        const categorizedItems = stashHandler.categorizeItems(myStash);
        stashHandler.stackItems(categorizedItems);
        setLoadingMessage('Fetching PoeNinja items...');
    }

    const requestPoeNinjaItems = async() => {
        await stashHandler.requestPoeNinjaItems();
        setPoeNinjaItems(stashHandler.getPoeNinjaItems());
    }

    const setValuesOnMyItems = () => {
        stashHandler.assignValuesToMyItems();
        setLoadingMessage('All done');
    }

    const init = async() => {
        setVarsForMyStash();
        organizeMyStash();
        await requestPoeNinjaItems();
        setValuesOnMyItems();
    }

    return (
        <h1>
            I am result
        </h1>
    )
};

export default ResultController;

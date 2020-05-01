import React, { useState, useEffect, useRef } from 'react';
import FormController from "../components/Form/FormController";
import List from "../components/Result/Content/List/List";
import HeroController from "../components/Hero/HeroController";
import ResultController from "../components/Result/ResultController";

const AppController = () => {
    // const myStashInventory = useRef(null);
    const [myStashInventory, setMyStashInventory] = useState(null);
    const [league, setLeague] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(null);
    const [resultIsActive, setResult] = useState(false);

    //first time render
    useEffect(() => {
        const getLeague = async() => {
            const response = await fetch('/api/get-league');
            const body = await response.json();

            if (response.status !== 200) throw Error(body.message);

            return body;
        };

        getLeague()
            .then((data) => {
                setLeague(data.body.result[0].id);
            })
            .catch(err => {
                console.log(err);
            });
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
        // setResult(true);
        // await updateStashHandler(body);
        setMyStashInventory(body);

        if(body !== null || undefined) {
            setResult(true);
        }
    };

    const loadingMessageHandler = (newText) => {
        setLoadingMessage(newText);
    }

    const renderForm = () => {
        return(
            <FormController handleData={postAccountInfo}/>
        )
    };

    // const renderList = () => {
    //     const myStashInventoryArray = Object.keys(myStashInventory.current);
    //     return myStashInventoryArray.map((category) => {
    //         return(
    //             <List key={category} category={category} items={myStashInventory.current[category]} isLoading={false}/>
    //         )
    //     });
    // };

    const appState = () => {
        return(
            <div>
                <HeroController league={league} loadingMessage={loadingMessage}/>
                {
                    resultIsActive ? 
                            <ResultController 
                                items={myStashInventory}
                                league={league}
                                loadingMessageHandler={loadingMessageHandler}
                            />
                        :
                            <FormController handleData={postAccountInfo}/>
                }           
            </div>
        )
    }

    return (
        appState()
    );
};

export default AppController;

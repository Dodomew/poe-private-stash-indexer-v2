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

    const handleStashInventory = () => {

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

        getLeague()
            .then((data) => {
                setLeague(data.body.result[0].id);
            })
            .catch(err => {
                console.log(err);
            })

        getStats()
            .then((data) => {
                setStats(data.body.result);
            })
            .catch(err => {
                console.log(err);
            })
    });

    return (
        <div className="App">
            <p>
                {league}
            </p>
            <p>
                {loadingMessage}
            </p>
            {/*<Form handleData={this.postAccountInfo}/>*/}
        </div>
    )
};

export default App;

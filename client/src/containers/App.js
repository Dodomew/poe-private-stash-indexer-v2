import React, { Component } from 'react';

import logo from '../resources/icons/logo.svg';
import Form from '../components/Form/Form';
import StashHandler from "../resources/js/classes/StashHandler";
import './App.css';

class App extends Component {
    state = {
        stashesInventory: null,
        league: null,
        stats: null,
    };

    componentDidMount() {
        this.getLeague()
            .then((data) => {
                this.setState({
                    league: data.body.result[0].id
                })
            })
            .catch(err => {
                console.log(err)
            })

        this.getStats()
            .then((data) => {
                this.setState({
                    stats: data.body.result
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleStash = async(items) => {
        console.log('HANDLESTASH')
        const StashHandler = new StashHandler.getInstance();
        const kek = await StashHandler.initItemsHandler(items);
    };

    getLeague = async() => {
            const response = await fetch('/api/get-league');
            const body = await response.json();

            if (response.status !== 200) throw Error(body.message);

            return body;
    };

    getStats = async() => {
        const response = await fetch('/api/get-stats');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    postAccountInfo = async(accountName, sessionID) => {
        console.log('POSTACCOUNTINFO BEFORE FETCH')
        const response = await fetch('/api/get-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'accountName' : accountName,
                'sessionID' : sessionID,
                'league' : this.state.league
            }),
        });
        console.log(response)
        console.log('POSTACCOUNTINFO DONE')

        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }

        console.log('POSTACCOUNTINFO HANDLESTASH')
        this.handleStash(body);
    };

    render() {
        return (
            <div className="App">
                <p>
                    {this.state.league}
                </p>
                <Form handleData={this.postAccountInfo}/>
                <p>{this.state.accountName}</p>
            </div>
        );
    }
}

export default App;

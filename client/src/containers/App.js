import React, { Component } from 'react';

import logo from '../resources/icons/logo.svg';
import Form from '../components/Form/Form';
import StashHandler from "../resources/js/classes/StashHandler";
import './App.css';

class App extends Component {
    state = {
        stashInventory: null,
        league: null,
        stats: null,
        stashHandler: null,
        poeNinjaItems: null,
        isLoading: false,
        loadingMessage: 'Loading...'
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
            });

        this.getStats()
            .then((data) => {
                this.setState({
                    stats: data.body.result
                })
            })
            .catch(err => {
                console.log(err)
            });

        this.setState({
            stashHandler: new StashHandler().getInstance()
        });
    }

    handleStash = async(items) => {
        console.log('HANDLESTASH')
        this.state.stashHandler.setLeague(this.state.league);
        this.state.stashHandler.setModifiersObject(this.state.stats);

        const categorizedItems = this.state.stashHandler.categorizeItems(items);
        this.state.stashHandler.stackItems(categorizedItems);

        this.setState({
            stashInventory: this.state.stashHandler.getMyStashInventory(),
            loadingMessage: 'Fetching PoeNinja items...'
        });

        await this.state.stashHandler.requestPoeNinjaItems();

        this.setState({
            poeNinjaItems: this.state.stashHandler.getPoeNinjaItems()
        });

        console.log('HANDLESTASH assignValuesToMyItems')
        this.setState({
            stashInventory: this.state.stashHandler.assignValuesToMyItems(),
            loadingMessage: 'Assigning values...'
        });

        this.setState({
            loadingMessage: 'All done'
        });

        console.log(this.state.stashInventory);
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
        console.log('POSTACCOUNTINFO BEFORE FETCH');
        this.setState({
            isLoading: true,
            loadingMessage: 'Fetching your stash inventory...'
        });

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

        console.log(response);

        console.log('POSTACCOUNTINFO DONE')

        const body = await response.json();

        console.log(body);

        if (response.status !== 200) {
            throw Error(body.message)
        }

        this.setState({
            loadingMessage: 'Received your stash inventory...'
        });

        console.log('POSTACCOUNTINFO HANDLESTASH')
        this.handleStash(body);
    };

    render() {
        return (
            <div className="App">
                <p>
                    {this.state.league}
                </p>
                <p>
                    {this.state.loadingMessage}
                </p>
                <Form handleData={this.postAccountInfo}/>
            </div>
        );
    }
}

export default App;

import React, { Component } from 'react';

import logo from '../resources/icons/logo.svg';

import './App.css';

class App extends Component {
    state = {
        post: '',
        accountName: null,
        sessionID: null,
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

    postAccountInfo = async(e) => {
        e.preventDefault();
        const response = await fetch('/api/get-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });

        const body = await response.text();

        this.setState({
            accountName: body.accountName,
            sessionID: body.sessionID
        });
    };

    render() {
        return (
            <div className="App">
                <p>
                    {this.state.league}
                </p>
                <form onSubmit={this.postAccountInfo}>
                    <input
                        type="text"
                        name="accountName"
                    />
                    <button type="submit">
                        Submit
                    </button>
                </form>
                <p>{this.state.accountName}</p>
            </div>
        );
    }
}

export default App;

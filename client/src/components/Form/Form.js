import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName : null,
            sessionID: null
        };

        this.handleAccountNameChange = this.handleAccountNameChange.bind(this);
        this.handleSessionIDChange = this.handleSessionIDChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAccountNameChange(event) {
        this.setState({
            accountName: event.target.value
        });
    }

    handleSessionIDChange(event) {
        this.setState({
            sessionID: event.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        const accountName = this.state.accountName;
        const sessionID = this.state.sessionID;
        this.props.handleData(accountName, sessionID);
        return false;
    }

    render() {
        return (
            <form method="POST" className="form" onSubmit={(e) => this.handleSubmit(e)}>
                <label className="form__label">
                    Account name
                </label>
                <input
                    type="text"
                    name="accountName"
                    className="form__input"
                    onChange={this.handleAccountNameChange}
                    required />
                <label className="form__label">
                    Session ID
                </label>
                <input
                    type="text"
                    name="sessionID"
                    className="form__input"
                    onChange={this.handleSessionIDChange}
                    required />
                <button type="submit" className="form__submit">
                    Submit
                </button>
            </form>
        )
    }
}

export default Form;

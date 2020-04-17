import React, { useState } from 'react';

const Form = (props) => {
    const [accountName, setAccountName] = useState(null);
    const [sessionID, setSessionID] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit');
        props.handleData(accountName, sessionID);
        return false;
    };

    const handleAccountNameChange = (event) => {
        setAccountName(event.target.value);
    };

    const handleSessionIDChange = (event) => {
        setSessionID(event.target.value);
    };

    return (
        <form method="POST" className="form" onSubmit={handleSubmit}>
            <label className="form__label">
                Account name
            </label>
            <input
                type="text"
                name="accountName"
                className="form__input"
                onChange={handleAccountNameChange}
                required />
            <label className="form__label">
                Session ID
            </label>
            <input
                type="text"
                name="sessionID"
                className="form__input"
                onChange={handleSessionIDChange}
                required />
            <button type="submit" className="form__submit">
                Submit
            </button>
        </form>
    )
};

export default Form;

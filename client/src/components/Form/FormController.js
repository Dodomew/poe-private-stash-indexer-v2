import React, { useState } from 'react';
import Form from "./Form";

const FormController = (props) => {
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
        <Form
            onSubmitHandler={handleSubmit}
            onAccountNameHandler={handleAccountNameChange}
            onSessionIDHandler={handleSessionIDChange}
        />
    )
};

export default FormController;

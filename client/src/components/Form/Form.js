import React from 'react';

const Form = (props) => {
    return (
        <form method="POST" className="form" onSubmit={e => (props.onSubmitHandler(e))}>
            <label className="form__label">
                Account name
            </label>
            <input
                type="text"
                name="accountName"
                className="form__input"
                onChange={e => (props.onAccountNameHandler(e))}
                required />
            <label className="form__label">
                Session ID
            </label>
            <input
                type="text"
                name="sessionID"
                className="form__input"
                onChange={e => (props.onSessionIDHandler(e))}
                required />
            <button type="submit" className="form__submit">
                Submit
            </button>
        </form>
    )
};

export default Form;

import React from 'react';
import './form.scss';

const Form = (props) => {
    return (
        <form method="POST" 
              className={'form' + (props.isLoading ? ' is-loading' : '')}
              onSubmit={e => (props.onSubmitHandler(e))}>
            <div className="form__container">
                <label className="form__label">
                    Account name
                </label>
                <input
                    type="text"
                    name="accountName"
                    className="form__input"
                    onChange={e => (props.onAccountNameHandler(e))}
                    required />
            </div>
            <div className="form__container">
                <label className="form__label">
                    Session ID
                </label>
                <input
                    type="text"
                    name="sessionID"
                    className="form__input"
                    onChange={e => (props.onSessionIDHandler(e))}
                    required />
            </div>
            <button type="submit" className="form__submit">
                Submit
            </button>
        </form>
    )
};

export default Form;

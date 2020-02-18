import React from "react";

function Form() {
    return (
        <form method="POST" className="form">
            <label className="form__label">Account name</label>
            <input type="text" value="Account name" name="accountName" className="form__input" required />
            <label className="form__label">Session ID</label>
            <input type="text" value="Session ID" name="sessionID" className="form__input" required />
            <button type="submit" className="form__submit">Submit</button>
        </form>
    )
}

export default Form;

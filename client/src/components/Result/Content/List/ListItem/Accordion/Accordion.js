import React from 'react';

const Accordion = (props) => {
    let accordion;

    if(!props.itemMods) {
        accordion = null;
    }
    else {
        accordion = props.itemMods.map((value, index) => {
            return(
                <li key={props.itemName + '_mod_' + index}>
                    {value}
                </li>
            )
        })

        accordion = 
            <div className="listitem__accordion">
                <ul>
                    {accordion}
                </ul>
            </div>
    }

    return accordion;
}

export default Accordion;
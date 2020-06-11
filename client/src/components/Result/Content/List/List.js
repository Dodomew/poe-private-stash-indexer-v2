import React from 'react';
import './List.scss';

const List = (props) => {
    let listItems;

    if(props.isLoading) {
        listItems = [];
        for (let i = 0; i < 8; i++) {
            listItems.push(
                <li key={'item_' + i} className="listitem">Loading...</li>
            )
        }
    }
    else if(props.items) {
        listItems = props.items.map((item, index) => {
            let accordion;

            if(!item.explicitMods) {
                accordion = null;
            }
            else {
                accordion = item.explicitMods.map((value, index) => {
                    return(
                        <li key={item.typeLine + '_mod_' + index}>
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
            return (
                <li key={props.category + '' + index} className="listitem">
                    <div className="listitem__content">
                        <img 
                            src={item.icon} 
                            alt={item.typeline}
                            className="listitem__media"></img>
                        <h3 className="listitem__title">
                            {item.typeLine}
                        </h3>
                        <span className="listitem__amount">
                            x{item.stackSize}
                        </span>
                        <span className="listitem__value">
                            {item.chaosValue}
                        </span>
                    </div>
                    {accordion}
                </li>
            )
        })
    }

    return (
        <ul className={'list' + (props.isLoading ? ' is-loading' : '')}>
            {listItems}
        </ul>
    );
};

export default List;

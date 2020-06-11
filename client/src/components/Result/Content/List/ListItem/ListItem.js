import React from 'react';

const ListItem = (props) => {
    return (
        <li key={props.itemKey} className={'listitem'}>
            <div className="listitem__content">
                <img 
                    src={props.itemIcon} 
                    alt={props.itemName}
                    className="listitem__media"></img>
                <h3 className="listitem__title">
                    {props.itemName}
                </h3>
                <span className="listitem__amount">
                    x{props.itemAmount}
                </span>
                <span className="listitem__value">
                    {props.itemValue}
                </span>
                <span className="listitem__value">
                    {props.itemValue * props.itemAmount}
                </span>
                {props.accordionToggle}
            </div>
            {props.accordion}
        </li>
    )
}

export default ListItem;
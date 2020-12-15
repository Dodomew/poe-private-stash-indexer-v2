import React from 'react';

const ListItem = (props) => {
    return (
        <li key={props.itemKey} className={'listitem ' + (!props.isExpanded ? 'is-closed' : '')}>
            <div className="listitem__content">
            {props.accordionToggle}
                <div className="listitem__intro">
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
                </div>
                <div className="listitem__total">
                <img className="listitem__currency-icon" src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png"></img>
                    <span className="listitem__value">
                        {props.itemValue}
                    </span>
                    <span className="listitem__value--total">
                        {Math.round(props.itemValue * props.itemAmount * 100) / 100}
                    </span>
                </div>
            </div>
            {props.accordion}
        </li>
    )
}

export default ListItem;
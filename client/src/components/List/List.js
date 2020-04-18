import React from 'react';

// import './List.scss';

const List = (props) => {
    let list = null;

    if(props.isLoading) {
        console.log('list is loading')
        list = [];
        for (let i = 0; i < 8; i++) {
            list.push(
                <li key={'item_' + i} className="listitem"/>
            )
        }
    }
    else if(props.items) {
        list = props.items.map((item, index) => {
            let bgColor = item.color || '#cacaca';
            let itemName = item.typeLine || '';
            let itemID = item.category + index || index;

            return (
                <li key={itemID} className="listitem" style={{backgroundColor: bgColor}}>
                    <h3 className="listitem__title">
                        {itemName}
                    </h3>
                </li>
            )
        });
    }
    else {
        console.log('items == null')
        list = null;
    }

    return (
        <ul className={'list' + (props.isLoading ? ' is-loading' : '')}>
            {list}
        </ul>
    );
};

export default List;

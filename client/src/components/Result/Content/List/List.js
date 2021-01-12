import React from 'react';
import ListItemController from './ListItem/ListItemController';
import './List.scss';

const List = ( props ) => {
    let listItems;

    if ( props.isLoading ) {
        listItems = [];
        for ( let i = 0; i < 8; i++ ) {
            listItems.push(
                <li key={ 'item_' + i } className="listitem">
                    Loading...
                </li>
            )
        }
    }
    else if ( props.items ) {
        listItems = props.items.map( ( item, index ) => {
            return (
                <ListItemController
                    item={ item }
                    index={ index }
                    key={ ( item.category ?? '_controller_' ) + index }
                />
            )
        } )
    }

    return (
        <ul
            className={ 'js-list list' + ( props.isLoading ? ' is-loading' : '' ) + ( props.activeCategory === props.category ? ' is-active' : "" ) }
            data-category={ props.category }
        >
            {listItems }
        </ul>
    );
};

export default List;

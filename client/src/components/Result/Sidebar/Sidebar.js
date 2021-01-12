import React from 'react';
import './sidebar.scss';

const Sidebar = ( props ) => {
    let sidebar;

    const clickHandler = ( category ) => {
        props.handleActiveCategory( category );
    }

    if ( !props.items ) {
        sidebar = <li key={ 'category' }>Determining categories...</li>
    }
    else {
        const myStashInventory = props.items;
        const myStashInventoryArray = Object.keys( myStashInventory );

        sidebar = myStashInventoryArray.map( ( category ) => {
            return (
                <li key={ category } className="sidebar-list__item">
                    <button onClick={ () => clickHandler( category ) }>
                        { category }
                    </button>
                </li>
            )
        } );
    }

    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                { sidebar }
            </ul>
        </div>
    )
}

export default Sidebar;
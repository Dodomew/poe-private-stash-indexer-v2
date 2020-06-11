import React from 'react';
import './sidebar.scss';

const Sidebar = (props) => {
    let sidebar;

    if(!props.items) {
        sidebar = <li key={'category'}>Category123</li>
    }
    else {
        const myStashInventory = props.items;
        const myStashInventoryArray = Object.keys(myStashInventory);
        sidebar = myStashInventoryArray.map((category) => {
            return(
                <li key={category} className="sidebar-list__item">
                    {category}
                </li>
            )
        });
    }

    return(
        <div className="sidebar">
            <ul className="sidebar-list">
                {sidebar}
            </ul>
        </div>
    )
}

export default Sidebar;
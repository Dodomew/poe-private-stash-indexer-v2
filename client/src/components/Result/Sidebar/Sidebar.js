import React from 'react';

const Sidebar = (props) => {
    if(!props.items) {
        return(
            <div>Category</div>
        )
    }
    else {
        const myStashInventory = props.items;
        const myStashInventoryArray = Object.keys(myStashInventory);
        return myStashInventoryArray.map((category) => {
            return(
                <div>
                    {category}
                </div>
            )
        });
    }
}

export default Sidebar;
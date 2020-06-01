import React from 'react';
import List from "../Content/List/List";
import './content.scss';

const Content = (props) => {
    if(!props.items) {
        return (
            <div>
                Loading...
            </div>
        );
    }
    else {
        const myStashInventory = props.items;
        const myStashInventoryArray = Object.keys(myStashInventory);
        return myStashInventoryArray.map((category) => {
            return(
                <List key={category} category={category} items={myStashInventory[category]} isLoading={false}/>
            )
        });
    }
};

export default Content;
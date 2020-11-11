import React from 'react';
import List from "../Content/List/List";
import './content.scss';

const Content = (props) => {
    let content;

    if(!props.items) {
        content = <List key="skeleton-list" isLoading={true}/>;
    }
    else {
        const myStashInventory = props.items;
        const myStashInventoryArray = Object.keys(myStashInventory);
        content = myStashInventoryArray.map((category) => {
            return(
                <List 
                    key={category} 
                    category={category} 
                    items={myStashInventory[category]} 
                    isLoading={false}
                    activeCategory={props.activeCategory}
                />
            )
        });
    }

    return(
        <div className="result">
            {content}
        </div>
    )
};

export default Content;
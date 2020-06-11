import React, { useState, useEffect, useRef } from 'react';
import Accordion from './Accordion/Accordion';
import ListItem from './ListItem';

const ListItemController = (props) => {
    const [isExpanded, toggleExpansion] = useState(false);

    function toggleAccordion() {
        toggleExpansion(!isExpanded);
        console.log('toggle accordion')
    }

    const item = props.item;
    const index = props.index;

    const itemIcon = item.icon ?? "http://placekitten.com/50/50";
    const itemName = item.typeLine ?? "Item name unknown";
    const itemAmount = item.stackSize ?? 1;
    const itemValue = item.chaosValue ?? 9999;
    const category = item.category ?? 'Unknown category';
    const itemMods = item.explicitMods ?? null;

    const accordion = itemMods ? 
        <Accordion 
            itemMods={itemMods} 
            itemName={itemName}
        /> 
    : null;

    const accordionToggle = itemMods ?
        <button className="listitem__toggle"
                onClick={toggleAccordion}>
            Klik
        </button>
    : null;

    return (
        <ListItem 
            itemIndex={index}
            category={category}
            itemIcon={itemIcon}
            itemName={itemName}
            itemAmount={itemAmount}
            itemValue={itemValue}
            itemMods={itemMods}
            accordion={accordion}
            accordionToggle={accordionToggle}
        />
    )
}

export default ListItemController;
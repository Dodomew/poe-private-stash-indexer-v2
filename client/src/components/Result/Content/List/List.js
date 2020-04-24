import React from 'react';

// import './List.scss';

const List = (props) => {
    return (
        <ul className={'list' + (props.isLoading ? ' is-loading' : '')}>
            {
                props.items.map((item, index) => {
                    return (
                        <li key={props.category + '' + index} className="listitem">
                            <h3 className="listitem__title">
                                {item.typeLine}
                            </h3>
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default List;

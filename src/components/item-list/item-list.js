import React from 'react';

import './item-list.css';

const ItemList = (props) => {
    const { data, onItemSelected, children: renderLabel } = props;

    const items = data.map((item) => {
        const { id } = item;
        const label = renderLabel(item);
        return (

            <li className="item-list__item list-group-item"
                key={id}
                onClick={() => onItemSelected(id)}>
                {label}
            </li>
        )
    });

    return (
        <React.Fragment>
            <br />
            <ul className="item-list list-group">
                {items}
            </ul>
        </React.Fragment>
    );
}

export default ItemList;
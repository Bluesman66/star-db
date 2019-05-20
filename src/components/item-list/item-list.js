import React, { Component } from 'react';

import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {

    state = {
        itemList: null 
    }

    componentDidMount = () => {

        const { getData } = this.props;

        getData()            
            .then((itemList) => {
                this.setState({
                    itemList
                });
            });
    }

    renderItems = (arr) => {
        return arr.map((person) => {
            return (
                <li className="item-list__item list-group-item"
                    key={person.id}
                    onClick={() => this.props.onItemSelected(person.id)}>
                    {person.name}
                </li>
            )
        });
    }

    render() {

        const { itemList: peopleList } = this.state;

        if (!peopleList) {
            return <Spinner />
        }

        const items = this.renderItems(peopleList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
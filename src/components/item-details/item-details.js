import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

import './item-details.css';

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount = () => {
        this.updateItem();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemLoaded = (item) => {
        this.setState({
            item,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    updateItem = () => {      

        const { itemId, getData } = this.props;

        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        });

        getData(itemId)
            .then(this.onItemLoaded)
            .catch(this.onError);
    }

    render() {

        if (!this.state.item) {
            return <span>Select an item from a list</span>;
        }

        const { item, loading, error } = this.state;        
        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;        
        const content = hasData ? <ItemView item={item} /> : null;

        return (
            <div className="item-details card">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const ItemView = ({ item }) => {

    const { id, name, gender, birthYear, eyeColor } = item;

    return (
        <React.Fragment>
            <img className="item-details__image"
                src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

            <div className="item-details__body card-body">
                <h4>{name}</h4>
                <ul className="item-details__list list-group list-group-flush">
                    <li className="item-details__item list-group-item">
                        <span className="item-details__term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="item-details__item list-group-item">
                        <span className="item-details__term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="item-details__item list-group-item">
                        <span className="item-details__term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    )
}

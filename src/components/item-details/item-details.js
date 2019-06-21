import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

import './item-details.css';

export const Record = ({ item, field, label }) => {
    return (
        <li className="item-details__item list-group-item">
            <span className="item-details__term">{label}</span>
            <span>{field}</span>
        </li>
    )
}

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
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

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    updateItem = () => {

        const { itemId, getData, getImageUrl } = this.props;

        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        });

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item),
                    loading: false
                });
            })
            .catch(this.onError);
    }

    render() {

        if (!this.state.item) {
            return <span>Select an item from a list</span>;
        }

        const { item, image, loading, error } = this.state;
        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <ItemView item={item} image={image} /> : null;

        return (
            <div className="item-details card">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

class ItemView extends Component {
    render() {
        const { id, name, gender, birthYear, eyeColor } = this.props.item;
        return (
            <React.Fragment>
                <img className="item-details__image" src={this.props.image} />

                <div className="item-details__body card-body">
                    <h4>{name}</h4>
                    <ul className="item-details__list list-group list-group-flush">
                        {this.props.children}
                    </ul>
                    <ErrorButton />
                </div>
            </React.Fragment>
        );
    }
}
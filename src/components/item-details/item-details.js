import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

import './item-details.css';

export const Record = ({ item, field, label }) => {
    return (
        <li className="item-details__item list-group-item">
            <span className="item-details__term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export default class ItemDetails extends Component {
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
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
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
            return (
                <div>
                    <br /> <span>Select an item from a list</span>
                </div>
            );
        }

        const { item, image, loading, error } = this.state;
        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <ItemView item={item} image={image} children={this.props.children} /> : null;

        return (
            <React.Fragment>
                <br />
                <div className="item-details card">
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
            </React.Fragment>
        )
    }
}

class ItemView extends Component {
    render() {
        const item = this.props.item;
        return (
            <React.Fragment>
                <img className="item-details__image" src={this.props.image} alt="" />

                <div className="item-details__body card-body">
                    <h4>{this.props.name}</h4>
                    <ul className="item-details__list list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, { item });
                            })
                        }
                    </ul>
                    <ErrorButton />
                </div>
            </React.Fragment>
        );
    }
}
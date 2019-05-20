import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

import './person-details.css';

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: true,
        error: false
    }

    componentDidMount = () => {
        this.updatePerson();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    onPersonLoaded = (person) => {
        this.setState({
            person,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    updatePerson = () => {      

        const { personId } = this.props;

        if (!personId) {
            return;
        }

        this.setState({
            loading: true
        });

        this.swapiService
            .getPerson(personId)
            .then(this.onPersonLoaded)
            .catch(this.onError);
    }

    render() {

        if (!this.state.person) {
            return <span>Select a person from a list</span>;
        }

        const { person, loading, error } = this.state;        
        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;        
        const content = hasData ? <PersonView person={person} /> : null;

        return (
            <div className="person-details card">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const PersonView = ({ person }) => {

    const { id, name, gender, birthYear, eyeColor } = person;

    return (
        <React.Fragment>
            <img className="person-details__image"
                src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

            <div className="person-details__body card-body">
                <h4>{name}</h4>
                <ul className="person-details__list list-group list-group-flush">
                    <li className="person-details__item list-group-item">
                        <span className="person-details__term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="person-details__item list-group-item">
                        <span className="person-details__term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="person-details__item list-group-item">
                        <span className="person-details__term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    )
}

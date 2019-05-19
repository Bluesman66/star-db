import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null
    }

    componentDidMount = () => {
        this.updatePerson();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    updatePerson = () => {
        const { personId } = this.props;
        
        if (!personId) {
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({ person })
            });
    }    

    render() {

        if (!this.state.person) {
            return <span>Select a person from a list</span>;
        }

        const { person: { id, name, gender, birthYear, eyeColor } } = this.state;
        
        return (
            <div className="person-details card">
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
                </div>
            </div>
        )
    }
}

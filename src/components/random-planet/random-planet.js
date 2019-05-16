import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import './random-planet.css';

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {}
    }

    constructor() {
        super();
        this.updatePlanet();
    }

    onPlanetLoaded = (planet) => {
        this.setState({ planet });
    }

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 25) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded);
    }

    render() {

        const { planet: { id, name, population, rotationPeriod, diameter } } = this.state;

        return (
            <div className="random-planet jumbotron rounded">
                <img className="random-planet__image"
                    src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
                <div>
                    <h4>{name}</h4>
                    <ul className="random-planet__group list-group list-group-flush">
                        <li className="random-planet__item list-group-item">
                            <span className="random-planet__term">Population</span>
                            <span>{population}</span>
                        </li>
                        <li className="random-planet__item list-group-item">
                            <span className="random-planet__term">Rotation Period</span>
                            <span>{rotationPeriod}</span>
                        </li>
                        <li className="random-planet__item list-group-item">
                            <span className="random-planet__term">Diameter</span>
                            <span>{diameter}</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
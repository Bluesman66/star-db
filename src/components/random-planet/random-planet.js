import React, { Component } from 'react';

import './random-planet.css';

export default class RandomPlanet extends Component {

    render() {
        return (
            <div className="random-planet jumbotron rounded">
                <img className="random-planet__image"
                    src="https://starwars-visualguide.com/assets/img/planets/5.jpg" />
                <div>
                    <h4>Planet Name</h4>
                    <ul className="random-planet__group list-group list-group-flush">
                        <li className="random-planet__item list-group-item">
                            <span className="random-planet__term">Population</span>
                            <span>123124</span>
                        </li>
                        <li className="random-planet__item list-group-item">
                            <span className="random-planet__term">Rotation Period</span>
                            <span>43</span>
                        </li>
                        <li className="random-planet__item list-group-item">
                            <span className="random-planet__term">Diameter</span>
                            <span>100</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
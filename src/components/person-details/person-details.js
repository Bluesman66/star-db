import React, { Component } from 'react';

import './person-details.css';

export default class PersonDetails extends Component {

    render() {
        return (
            <div className="person-details card">
                <img className="person-details__image"
                    src="https://starwars-visualguide.com/assets/img/characters/3.jpg" />

                <div className="person-details__body card-body">
                    <h4>R2-D2</h4>
                    <ul className="person-details__list list-group list-group-flush">
                        <li className="person-details__item list-group-item">
                            <span className="person-details__term">Gender</span>
                            <span>male</span>
                        </li>
                        <li className="person-details__item list-group-item">
                            <span className="person-details__term">Birth Year</span>
                            <span>43</span>
                        </li>
                        <li className="person-details__item list-group-item">
                            <span className="person-details__term">Eye Color</span>
                            <span>red</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

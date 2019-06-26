import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';

import Row from '../row';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details/item-details';

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  }

  componentDidCatch = () => {
    this.setState({
      hasError: true
    })
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const { getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage,
      getAllPeople,
      getAllPlanets } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    )

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
      </ItemDetails>
    )

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          {/* <Row
            left={personDetails}
            right={starshipDetails} /> */}
          <ItemList
            getData={getAllPeople}
            onItemSelected={() => {}}>
            {({ name }) => <span>{name}</span>}
          </ItemList>
          <br/>
          <ItemList
            getData={getAllPlanets}
            onItemSelected={() => {}}>
            {({ name }) => <span>{name}</span>}
          </ItemList>
        </div >
      </ErrorBoundry>
    );
  }
};
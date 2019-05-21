import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';

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

    return (
      <div>
        <Header />
        {planet}

        <button className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>

        <ErrorButton />

        <PeoplePage />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}>
              {(item) => <span>{item.name} <button>!</button> </span>}
            </ItemList>
          </div>
          <div className="col-md-6">
            <ItemDetails 
              itemId={this.state.selectedPersonId} 
              getData={this.swapiService.getPlanet}  />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}>
              {(item) => item.name}
            </ItemList>
          </div>
          <div className="col-md-6">
            <ItemDetails 
              itemId={this.state.selectedPersonId} 
              getData={this.swapiService.getStarship} />
          </div>
        </div>

      </div >
    );
  }
};
import React, { Component } from 'react';

import Header from '../header';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';

import { SwapiService, DummySwapiService } from '../../services';
import { SwapiServiceProvider } from '../swapi-service-context';

import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from '../sw-components';

import './app.css';

export default class App extends Component {
  state = {
    hasError: false,
    swapiService: new DummySwapiService()
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      console.log(Service.name);
      return {
        swapiService: new Service()
      };
    });
  }

  componentDidCatch = () => {
    this.setState({
      hasError: true
    });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange} />

            <PersonDetails itemId={11} />
            <PlanetDetails itemId={5} />
            <StarshipDetails itemId={9} />

            <PersonList />
            <PlanetList />
            <StarshipList />
          </div >
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};
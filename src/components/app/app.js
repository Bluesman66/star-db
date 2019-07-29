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

  swapiService = new DummySwapiService();

  state = {
    hasError: false
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

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <div className="stardb-app">
            <Header />

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
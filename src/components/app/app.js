import React, { Component } from 'react';

import Header from '../header';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';

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
        <div className="stardb-app">
          <Header />

          <PersonDetails itemId={11} />
          <PlanetDetails itemId={5} />
          <StarshipDetails itemId={9} />

          <PersonList>
            {({ name }) => <span>{name}</span>}
          </PersonList>

          <PlanetList>
            {({ name }) => <span>{name}</span>}
          </PlanetList>

          <StarshipList>
            {({ name }) => <span>{name}</span>}
          </StarshipList>
        </div >
      </ErrorBoundry>
    );
  }
};
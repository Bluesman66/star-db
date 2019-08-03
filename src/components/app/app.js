import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  SecretPage,
  LoginPage
} from '../pages';

import { SwapiService, DummySwapiService } from '../../services';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {
  state = {
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false
  }

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
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

    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              <Route exact path="/" render={() => <h2>Welcome to StarDB</h2>} />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route exact path="/starships" component={StarshipsPage} />
              <Route path="/starships/:id"
                render={
                  ({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id} />
                  }
                } />
              <Route path="/login"
                render={
                  () => {
                    return <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
                  }
                } />
              <Route path="/secret"
                render={
                  () => {
                    return <SecretPage isLoggedIn={isLoggedIn} />
                  }
                } />
            </div >
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};
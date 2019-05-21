import React, { Component } from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import SwapiService from '../../services/swapi-service';

import './people-page.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPersonId: null,
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPersonId: id
    });
  };

  render() {    

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>
        {(item) => `${item.name} (${item.birthYear})`}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails 
          itemId={this.state.selectedPersonId} 
          getData={this.swapiService.getPerson} />
      </ErrorBoundry>
    );

    return <Row left={itemList} right={personDetails} />    
  }
}

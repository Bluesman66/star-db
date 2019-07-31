import React from 'react';

import ItemList from '../item-list';
import { withData } from '../hoc-helpers';
import { withSwapiService } from '../hoc-helpers';

const withChildFunction = (fn) => (Wrapped) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
}

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name }) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
};

const mepPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
};

const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
};

const PersonList = withSwapiService(mapPersonMethodsToProps)(
    withData(
        withChildFunction(renderName)(ItemList)
    )
);

const PlanetList = withSwapiService(mepPlanetMethodsToProps)(
    withData(
        withChildFunction(renderName)(ItemList)
    )
);

const StarshipList = withSwapiService(mapStarshipMethodsToProps)(
    withData(
        withChildFunction(renderModelAndName)(ItemList)
    )
);

export {
    PersonList,
    PlanetList,
    StarshipList
};
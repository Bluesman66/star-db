import React from 'react';
import { withRouter } from 'react-router-dom';

import Row from '../row';
import { PlanetList, PlanetDetails } from '../sw-components';

const PlanetsPage = ({ match, history }) => {
    const { id } = match.params;
    return (
        <Row
            left={<PlanetList onItemSelected={(itemId) => history.push(itemId)} />}
            right={<PlanetDetails itemId={id} />}
        />
    )
}

export default withRouter(PlanetsPage);
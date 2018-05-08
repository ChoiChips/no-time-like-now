import React from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';

import PromptsIndexContainer from '../react/containers/PromptsIndexContainer'

const Routes = props => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={PromptsIndexContainer} />
      <Route path='prompts' component={PromptsIndexContainer} />
      <Route path='prompts/:id' component={PromptsIndexContainer} />
    </Router>
  );
}

export default Routes;

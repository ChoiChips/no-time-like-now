import React from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';

import PromptsIndexContainer from '../react/containers/PromptsIndexContainer'
import PromptsShowContainer from '../react/containers/PromptsShowContainer'

const Index = props => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={PromptsIndexContainer} />
      <Route path='prompts/:id' component={PromptsShowContainer} />
    </Router>
  );
}

export default Index;

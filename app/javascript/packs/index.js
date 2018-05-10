import React from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';

import PromptsIndexContainer from '../react/containers/PromptsIndexContainer'
import PromptsShowContainer from '../react/containers/PromptsShowContainer'
import UsersShowContainer from '../react/containers/UsersShowContainer'
import PromptsNewContainer from '../react/containers/PromptsNewContainer'

const Index = props => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={PromptsIndexContainer} />
      <Route path='prompts' component={PromptsIndexContainer} />
      <Route path='prompts/:id' component={PromptsShowContainer} />
      <Route path='users/:id' component={UsersShowContainer} />
      <Route path='prompts/new' component={PromptsNewContainer} />
    </Router>
  );
}

export default Index;

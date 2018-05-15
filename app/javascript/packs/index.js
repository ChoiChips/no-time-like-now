import React from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';

import UsersShowContainer from '../react/containers/UsersShowContainer'

import PromptsIndexContainer from '../react/containers/PromptsIndexContainer'
import PromptsShowContainer from '../react/containers/PromptsShowContainer'
import PromptsNewContainer from '../react/containers/PromptsNewContainer'

import AnswersFormContainer from '../react/containers/AnswersFormContainer'
import AnswersShow from '../react/components/AnswersShow'

import RedditIndexContainer from '../react/containers/RedditIndexContainer'
import RedditShowContainer from '../react/containers/RedditShowContainer'
import RedditFormContainer from '../react/containers/RedditFormContainer'

import RandomFormContainer from '../react/containers/RandomFormContainer'

import NavBar from '../react/components/NavBar'

const Index = props => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={NavBar}>
        <IndexRoute component={PromptsIndexContainer} />

        <Route path='prompts' component={PromptsIndexContainer} />
        <Route path='prompts/new' component={PromptsNewContainer} />

        <Route path='prompts/random' component={RandomFormContainer} />

        <Route path='prompts/:id' component={PromptsShowContainer} />
        <Route path='prompts/:id/new' component={AnswersFormContainer} />

        <Route path='users/:id' component={UsersShowContainer} />

        <Route path='users/:id/prompt' component={PromptsShowContainer} />
        <Route path='answers/:id' component={AnswersShow} />

        <Route path='reddit' component={RedditIndexContainer} />
        <Route path='reddit/new' component={RedditFormContainer} />
        <Route path='reddit/:id/new' component={RedditFormContainer} />
        <Route path='reddit/:id' component={RedditShowContainer} />
      </Route>
    </Router>
  );
}

export default Index;

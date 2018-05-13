import React, { Component } from 'react';
import RedditShow from "../components/RedditShow"
import { Link } from 'react-router';

import AnswersTile from '../components/AnswersTile'

class RedditShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      prompt:  {},
      answers: []
    }
  }

  componentDidMount() {
    let promptId = this.props.params.id

    fetch(`/api/v1/reddits/${promptId}`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
    .then(response => response.json())
    .then(prompt => {
      debugger;
      this.setState ({
        prompt: prompt
        // answers: prompt.prompt.answers
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {
    let displayedAnswers = this.state.answers.map( (answer) =>{
      return (
        <AnswersTile
          key={answer.id}
          id={answer.id}
          answer={answer.answer}
          handle={answer.handle}
          date_made={answer.date_made}
        />
      )
    })

    return(
      <div className="row">
        <div className="columns medium-11 medium-centered">
          <RedditShow
            key={this.state.prompt.id}
            id={this.state.prompt.id}
            handle={this.state.prompt.handle}
            description={this.state.prompt.description}
            date_made={this.state.prompt.date_made}
          />
        </div>
        <div className="text-center">
          <h3><Link className="" to={`/reddit/${this.props.params.id}/new`}>Create New Answer</Link></h3>
        </div>

        <div>{displayedAnswers}</div>
      </div>
    )
  }
}

export default RedditShowContainer

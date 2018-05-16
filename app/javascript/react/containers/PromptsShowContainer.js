import React, { Component } from 'react';
import PromptsShow from "../components/PromptsShow"
import { Link } from 'react-router';

import AnswersTile from '../components/AnswersTile'

class PromptsShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      prompt:  {},
      answers: []
    }
  }

  componentDidMount() {
    let promptId = this.props.params.id

    fetch(`/api/v1/prompts/${promptId}`, {
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
      this.setState ({
        prompt: prompt.prompt,
        answers: prompt.prompt.answers
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
        <h1 className="name text-center">Prompt</h1>
        <div className="columns medium-11 medium-centered">
          <PromptsShow
            key={this.state.prompt.id}
            id={this.state.prompt.id}
            handle={this.state.prompt.handle}
            description={this.state.prompt.description}
            date_made={this.state.prompt.date_made}
          />
        </div>
        <div className="text-center">
          <h3><Link className="" to={`/prompts/${this.props.params.id}/new`}>Create New Answer</Link></h3>
        </div>

        <div>{displayedAnswers}</div>
      </div>
    )
  }
}

export default PromptsShowContainer

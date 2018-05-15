import React, { Component } from 'react';
import PromptsTile from '../components/PromptsTile';
import AnswersTile from '../components/AnswersTile';

class UsersShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      prompts: [],
      answers: []
    }
  }

  componentDidMount(){

    fetch(`/api/v1/users/${this.props.params.id}`, {
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
      .then(body => {
        this.setState({
          prompts: body.user.prompts,
          answers: body.user.answers
         });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let prompts = this.state.prompts.map( (prompt) =>{
      return (
        <PromptsTile
          key={prompt.id}
          id={prompt.id}
          description={prompt.description}
          date_made={prompt.date_made}
        />
      )
    })
    let answers = this.state.answers.map( (answer) =>{
      return (
        <AnswersTile
          key={answer.id}
          id={answer.id}
          answer={answer.answer}
          date_made={answer.date_made}
        />
      )
    })

    return (
      <div className="row spot-container">
        <h1 className="recent-activity">Recent Activity</h1>
        <h3 className="text-left">Prompts</h3>
        <div className="columns">
          {prompts}
        </div>
        <h3 className="text-left">Answers</h3>
        <div className="columns">
          {answers}
        </div>
      </div>
    );
  }
}

export default UsersShowContainer;

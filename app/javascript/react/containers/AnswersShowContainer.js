import React, { Component } from 'react';
import { Link } from 'react-router';

class AnswersShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      prompt: {},
      answer: {}
    }
  }

  componentDidMount(){
    fetch(`/api/v1/answers/${this.props.params.id}`, {
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
        answer: body.answer,
        prompt: body.answer.prompt
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div className="row collapse">
        <div className="columns small-12">
          <h1 className="name text-center">Prompt</h1>
          <h3 className="page-header text-center">
            {this.state.prompt.description}
          </h3>
        </div>
        <div className="name-show">
          <Link className="name" to={`/users/${this.state.prompt.id}`}>{this.state.prompt.handle}</Link> on {this.state.prompt.date_made}
        </div>
        <div className="columns small-12">
          <h4 className="page-header text-center">
            {this.state.answer.answer}
          </h4>
          <div className="name-show">
            <Link className="name" to={`/users/${this.state.answer.user_id}`}>{this.state.answer.handle}</Link> on {this.state.answer.date_made}
          </div>
        </div>
      </div>
    )
  }
}

export default AnswersShowContainer;

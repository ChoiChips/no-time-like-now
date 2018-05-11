import React, { Component } from 'react';
import { Link } from 'react-router';

class AnswersNewContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      prompt: '',
      answer:  ''
    }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
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
        prompt: prompt.prompt
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  handleChange(event) {
    let answerLength = this.state.answer.length
    let newAnswer = event.target.value

    if (newAnswer.substring(0, answerLength).includes(this.state.answer)) {
      this.setState({answer: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if ( confirm("Are you sure you wish to submit?") == false ) {
      return false ;
    } else {
      let submission = {
        answer: {
          answer: this.state.answer,
          prompt_id: this.state.prompt.id
        }
      }


      fetch(`/api/v1/prompts/${this.state.prompt.id}/answers`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(submission),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          window.location.href = `http://localhost:3000/prompts/${this.state.prompt.id}`
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .catch(error => console.error(`Error in fetch (submitting new answer): ${error.message}`))
    }
  }

  render() {
    let characterCount = this.state.answer.trim().length
    let message;

    if (characterCount < 100) {
      message = `You need ${100 - characterCount} more characters to submit.`
    } else if (characterCount >= 100 && characterCount < 500) {
      message = `You have met expectations! Character count = ${characterCount}`
    } else if (characterCount >= 500 && characterCount < 1000) {
      message = `You have exceeded expectations! Character count = ${characterCount}`
    } else if (characterCount >= 1000) {
      message = `You're really going at it, arent you... Character count = ${characerCount}`
    }

    let submitButton;

    if (this.state.answer.trim().length >= 100) {
      submitButton = <input type="submit" value="Submit" />
    }

    return(
      <div className="row">
        <div className="columns medium-11 medium-centered">
          <form onSubmit={this.handleSubmit}>
            <label>
              <h1>{this.state.prompt.description}</h1>
              <textarea rows='50' cols='50' style={{border:"none"}} placeholder="Respond here. Remember, there is no backspace!" value={this.state.answer} onChange={this.handleChange} />
            </label>
            <div>
              {message}
            </div>
            {submitButton}
          </form>
        </div>
      </div>
    )
  }
}

export default AnswersNewContainer

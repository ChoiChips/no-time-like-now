import React, { Component } from 'react';
import { Link } from 'react-router';

class PromptsNewContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: ''
    }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({description: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if ( confirm("Are you sure you wish to submit?") === false ) {
      return false ;
    } else {
      let submission = {
        prompt: { description: this.state.description }
      }

      fetch('/api/v1/prompts/', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(submission),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(prompt => {
        window.location.href = `http://localhost:3000/prompts/${prompt.prompt.id}`
      })
      .catch(error => console.error(`Error in fetch (submitting new prompt): ${error.message}`))
    }
  }

  render() {
    let characterCount = this.state.description.trim().length
    let message;

    if (characterCount < 10) {
      message = `Prompt should be between 10 and 250 characters long. ${10 - characterCount} more characters to submit.`
    } else if (characterCount >= 10 && characterCount <= 250) {
      message = `You can now submit. Character count = ${characterCount}`
    } else if (characterCount > 250) {
      message = `Please shorten your prompt. Character count = ${characterCount}`
    }

    let submitButton;

    if (this.state.description.trim().length >= 10 && this.state.description.trim().length < 250) {
      submitButton = <input type="submit" value="Submit" />
    }

    return(
      <div className="row">
        <h1 className="name text-center">Add New Prompt</h1>
        <div className="columns medium-12 large-12 medium-centered">
          <form onSubmit={this.handleSubmit}>
            <label>
              {message}
              <textarea rows='25' cols='70' value={this.state.description} onChange={this.handleChange} />
            </label>
            <div>
            </div>
            {submitButton}
          </form>
        </div>
      </div>
    )
  }
}

export default PromptsNewContainer

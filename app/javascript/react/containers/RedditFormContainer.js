import React, { Component } from 'react';
import { Link } from 'react-router';

class RedditFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      answer:  '',
      prompt: {}
    }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let submission = {
      prompt: {
        handle: this.props.location.state.handle,
        description: this.props.location.state.description,
        date_made: this.props.location.state.date_made
      }
    }

    if (this.props.params.id) {
      debugger;
      fetch(`/api/v1/reddits/${this.props.params.id}`, {
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
          prompt: prompt.reddit
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))

    } else {

      fetch(`/api/v1/reddits`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(submission),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => {
        debugger;
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
        debugger;
        if (body[0] === undefined) {
          this.setState({ prompt: body })
        } else {
          this.setState({ prompt: body[0] });
        }
        debugger;
      })
      .catch(error => console.error(`Error in fetch (submitting new Reddit prompt): ${error.message}`))
    }
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
      debugger;
      let submission = {
        answer: {
          answer: this.state.answer
        }
      }

      fetch(`/api/v1/reddits/${this.state.prompt.id}/reddit_answers`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(submission),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          window.location.href = `http://localhost:3000/reddit/${this.state.prompt.id}`
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
      message = `You need ${100 - characterCount} more characters to submit. Remember, there is no backspace!`
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
        <div className="columns medium-12 large-12 medium-centered">
          <form onSubmit={this.handleSubmit}>
            <label>
              <h1>{this.props.location.state.description}</h1>
              {message}
              <textarea rows='25' cols='70' style={{border:"none"}} value={this.state.answer} onChange={this.handleChange} />
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

export default RedditFormContainer

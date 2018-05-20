import React, { Component } from 'react';
import { Link } from 'react-router';

class RandomFormContainer extends Component {
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
    fetch(`/api/v1/prompts/random`, {
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
      $(document).ready(function() {
        setTimeout(function(){
          $("#randomFormModal").foundation('reveal', 'open');
        }, 0);
      });
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
          // window.location.href = `http://localhost:3000/prompts/${this.state.prompt.id}`
          window.location.href = `https://no-time-like-now.heroku-app.com/prompts/${this.state.prompt.id}`
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
    let wordCount = this.state.answer.split(/\s+/).length - 1
    let message = "Submission Requirements: "
    let submitButton;

    if (characterCount < 100) {
      message += `${characterCount}/100 characters `
    }
    if (wordCount < 20) {
      message += `${wordCount}/20 words`
    }
    if (characterCount >= 100 && wordCount >= 20) {
      message = `You can now submit! Character count = ${characterCount}. Word count = ${wordCount}`
      submitButton = <input type="submit" value="Submit" className="radius button text-left"/>
    }

    let recentAnswer, forcedPrompt
    if (this.props.recentAnswer === false) {
      recentAnswer = "Please respond to your daily prompt"
      forcedPrompt = "close_on_background_click:false;close_on_esc:false;"
    }

    let user_id;
    if (this.state.prompt.user) {
      user_id = this.state.prompt.user.id
    }

    return(
      <div id="randomFormModal" data-options={forcedPrompt} data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog" className="reveal-modal text-center">
        <h3 className="text-center">{recentAnswer}</h3>
        <h1 className="name text-center">Prompt</h1>
        <form onSubmit={this.handleSubmit}>
          <h3>{this.state.prompt.description}</h3>
          <div className="name-show">
            <Link className="name">{this.state.prompt.handle}</Link> on {this.state.prompt.date_made}
          </div>
          {message}
          <textarea style={{fontSize: '25px'}} rows='17' cols='70' value={this.state.answer} onChange={this.handleChange} />
          {submitButton}
        </form>
      </div>
    )
  }
}

export default RandomFormContainer

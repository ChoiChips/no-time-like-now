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
    this.getRedditPrompt = this.getRedditPrompt.bind(this)
    this.postRedditPrompt = this.postRedditPrompt.bind(this)
    this.postRedditAnswer = this.postRedditAnswer.bind(this)
  }

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      this.postRedditPrompt()
    } else if (this.props.params.id) {
      this.getRedditPrompt()
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
      this.postRedditAnswer()
    }
  }

  getRedditPrompt() {
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
      $(document).ready(function() {
        setTimeout(function(){
          $("#redditFormModal").foundation('reveal', 'open');
        }, 0);
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  postRedditAnswer() {
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

  postRedditPrompt() {
    let submission = {
      prompt: {
        handle: this.props.location.state.handle,
        description: this.props.location.state.description,
        date_made: this.props.location.state.date_made,
        url: this.props.location.state.url
      }
    }

    fetch(`/api/v1/reddits`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(submission),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
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
      if (body[0] === undefined) {
        this.setState({ prompt: body })
      } else {
        this.setState({ prompt: body[0] });
      }
      $(document).ready(function() {
        setTimeout(function(){
          $("#redditFormModal").foundation('reveal', 'open');
        }, 0);
      });
    })
    .catch(error => console.error(`Error in fetch (submitting new Reddit prompt): ${error.message}`))
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

    return(
      <div className="row">
        <h1 className="name text-center">Prompt</h1>

        <div className="columns medium-12 large-12 medium-centered">
          <form onSubmit={this.handleSubmit}>
            <a target="_blank" href={this.state.prompt.url}>
              <h3>{this.state.prompt.description}</h3>
            </a>
            <div className="user-sig text-center">
              <a target="_blank" className="name" href={`https://www.reddit.com/u/${this.state.prompt.handle}`}>{this.state.prompt.handle}</a> on {this.state.prompt.date_made}
            </div>
            <div>
              {message}
            </div>
            <textarea style={{fontSize: '25px'}} rows='17' cols='70' value={this.state.answer} onChange={this.handleChange} />
            <div className="text-center">
              <div>{submitButton}</div>
              <div><a href="#" className="radius button" data-reveal-id="redditFormModal">Modal View</a></div>
            </div>
          </form>
        </div>

        <div id="redditFormModal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog" className="reveal-modal text-center">
          <h1 className="name text-center">Prompt</h1>
          <div className="columns medium-12 large-12 medium-centered">
            <form onSubmit={this.handleSubmit}>
              <a target="_blank" href={this.state.prompt.url}>
                <h3>{this.state.prompt.description}</h3>
              </a>
              <div className="user-sig text-center">
                <a target="_blank" className="name" href={`https://www.reddit.com/u/${this.state.prompt.handle}`}>{this.state.prompt.handle}</a> on {this.state.prompt.date_made}
              </div>
              {message}
              <textarea style={{fontSize: '25px'}} rows='17' cols='70' value={this.state.answer} onChange={this.handleChange} />
              {submitButton}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default RedditFormContainer

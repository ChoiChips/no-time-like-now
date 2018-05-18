import React, { Component } from 'react';
import { Link } from 'react-router';

class AnswersFormContainer extends Component {
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
    // if standard prompt request
    if (this.props.params.id) {

      fetch(`/api/v1/prompts/${this.props.params.id}`, {
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
            $("#answersFormModal").foundation('reveal', 'open');
          }, 0);
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))

    // // if random prompt request
    // } else if (this.props.route.path === "prompts/random/new") {
    //
    //   fetch('/api/v1/prompts/random', {
    //     credentials: 'same-origin'
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       return response;
    //     } else {
    //       let errorMessage = `${response.status} (${response.statusText})`,
    //       error = new Error(errorMessage);
    //       throw(error);
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(prompt => {
    //     this.setState ({
    //       prompt: prompt.prompt
    //     })
    //   })
    //   .catch(error => console.error(`Error in fetch: ${error.message}`))
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
      let submission = {
        answer: {
          answer: this.state.answer
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
      submitButton = <input type="submit" value="Submit" className="button"/>
    }

    let user_id;
    if (this.state.prompt.user) {
      user_id = this.state.prompt.user.id
    }

    return(
      <div className="row">
        <div id="answersFormModal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog" className="reveal-modal text-center">
          <h1 className="name text-center">Prompt</h1>
          <div className="columns medium-12 large-12 medium-centered">
            <form onSubmit={this.handleSubmit}>
              <h3 className="text-center">{this.state.prompt.description}</h3>
              <div className="name-show">
                <Link className="name">{this.state.prompt.handle}</Link> on {this.state.prompt.date_made}
              </div>
              <div>
                {message}
              </div>
              <textarea style={{fontSize: '25px'}} rows='17' cols='70' value={this.state.answer} onChange={this.handleChange} />
              {submitButton}
            </form>
          </div>
        </div>
        <h1 className="name text-center">Prompt</h1>

        <div className="columns medium-12 large-12 medium-centered">
          <form onSubmit={this.handleSubmit}>
            <h3 className="text-center">{this.state.prompt.description}</h3>
            <div className="name-show">
              <Link className="name" to={`/users/${user_id}`}>{this.state.prompt.handle}</Link> on {this.state.prompt.date_made}
            </div>
            <div>
              {message}
            </div>
            <textarea style={{fontSize: '25px'}} rows='17' cols='70' value={this.state.answer} onChange={this.handleChange} />
            <div className="text-center">
              <a href="#" data-reveal-id="answersFormModal">Modal View</a>
            </div>
            <div className="text-center">
              {submitButton}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AnswersFormContainer

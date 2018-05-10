import React, { Component } from 'react';
import { Link } from 'react-router';

class AnswersNewContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      prompt: '',
      answer:  '',
      errors: {}
    }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.validateAnswer = this.validateAnswer.bind(this)
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
        prompt: prompt.prompt.description
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  handleChange(event) {
    let answerLength = this.state.answer.length
    let newAnswer = event.target.value
    this.setState( {errors: {}} ) 

    if (newAnswer.substring(0, answerLength).includes(this.state.answer)) {
      this.setState({answer: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let answerValidation = this.validateAnswer(this.state.answer)

    if (answerValidation) {
      let formPayload = {answer: this.state.answer}
      this.addNewAnswer(formPayload)
      // Add fetch post call here
    }
  }

  validateAnswer(answer) {
    if (answer.trim().length < 50) {
      let newError = { answerStatus: `Answer must be at least 50 characters long, currently ${answer.trim().length}/50 characters.` }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.answerStatus
      this.setState({ errors: errorState })
      return true
    }
  }

  render() {
    let errorDiv;
    let errorItems;

    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<div key={error}>{error}</div>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    return(
      <div className="row">
        <div className="columns medium-11 medium-centered">
          <form onSubmit={this.handleSubmit}>
            <label>
              {this.state.prompt}
              <textarea value={this.state.answer} onChange={this.handleChange} />
            </label>
            {errorDiv}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default AnswersNewContainer

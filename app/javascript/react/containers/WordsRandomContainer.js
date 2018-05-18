import React, { Component } from 'react';
import { Link } from 'react-router';

class WordsRandomContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      words: [],
      answer:  ''
    }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/words/random`, {
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
    .then(words => {
      this.setState ({
        words: words
      })
      $(document).ready(function() {
        setTimeout(function(){
          $("#wordFormModal").foundation('reveal', 'open');
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
        answer: this.state.answer,
        first: this.state.words[0].id,
        second: this.state.words[1].id,
        third: this.state.words[2].id
      }

      fetch(`/api/v1/word_answers`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(submission),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          // window.location.href = `http://localhost:3000/words/${this.state.word.id}`
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
      submitButton = <input type="submit" value="Submit" className="radius button text-left"/>
    }

    let forcedPrompt;

    let words = this.state.words.map( (word) => {
      return (
        <h3 key={word.word}><strong>{word.word}:</strong> {word.definition}</h3>
      )
    })

    return(
      <div className="row">
        <div className="columns medium-12 large-12 text-center">
          <h1 className="name text-center">Prompt</h1>
          <h3>Please write a prompt using the following words:</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="text-left">
              {words}
            </div>
            {message}
            <textarea style={{fontSize: '25px'}} rows='17' cols='70' value={this.state.answer} onChange={this.handleChange} />
            <div className="text-center row">
              <div>
                {submitButton}
                <a href="#" className="radius button text-right" data-reveal-id="wordFormModal">Modal View</a>
              </div>
            </div>
          </form>
        </div>

        <div id="wordFormModal" data-options={forcedPrompt} data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog" className="reveal-modal text-center">
          <h1 className="name text-center">Prompt</h1>
          <h3>Please write a prompt using the following words:</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="text-left">
              {words}
            </div>
            {message}
            <textarea style={{fontSize: '25px'}} rows='17' cols='70' value={this.state.answer} onChange={this.handleChange} />&nbsp;
            {submitButton}
          </form>
        </div>
      </div>
    )
  }
}

export default WordsRandomContainer

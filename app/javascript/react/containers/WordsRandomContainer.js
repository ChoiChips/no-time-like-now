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
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(wordAnswerId => {
        // window.location.href = `http://localhost:3000/word_answers/${wordAnswerId}`
        window.location.href = `https://no-time-like-now.herokuapp.com/word_answers/${wordAnswerId}`
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
          <h6>Credit: <a href="https://en.oxforddictionaries.com/explore/weird-and-wonderful-words/">Oxford Dictionary's Weird and Wonderful Words</a></h6>
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
          <h6>Credit: <a href="https://en.oxforddictionaries.com/explore/weird-and-wonderful-words/">Oxford Dictionary's Weird and Wonderful Words</a></h6>
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

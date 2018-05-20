import React, { Component } from 'react';
import { Link } from 'react-router';

class WordAnswerContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      words: [],
      answer: {}
    }
  }

  componentDidMount(){
    fetch(`/api/v1/word_answers/${this.props.params.id}`, {
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
        answer: body.word_answer,
        words: body.word_answer.words
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let words = this.state.words.map( (word) => {
      return (
        <h3 key={word.word}><strong>{word.word}:</strong> {word.definition}</h3>
      )
    })

    return(
      <div className="row collapse">
        <div className="columns small-12">
          <h1 className="name text-center">Prompt</h1>
          <h3 className="page-header text-center">
            {words}
          </h3>
        </div>
        <div className="columns small-12">
          <h4 className="page-header text-left">
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

export default WordAnswerContainer;

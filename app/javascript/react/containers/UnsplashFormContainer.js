import React, { Component } from 'react';
import { Link } from 'react-router';

class UnsplashFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      answer:  '',
      photo: ''
    }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch("https://source.unsplash.com/random", {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        this.setState({
          photo: response.url
        })
      $(document).ready(function() {
        setTimeout(function(){
          $("#imageFormModal").foundation('reveal', 'open');
        }, 0);
      });
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
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
    } else {;
      let submission = {
        answer: {
          answer: this.state.answer,
          url: this.state.photo
        }
      }

      fetch(`/api/v1/photo_answers`, {
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
        window.location.href = `http://localhost:3000/unsplash/answers/${body.photo_answer.id}`
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


    // practice with inline React styling
    let textStyle = {
      fontSize: '25px',
      opacity: 0.5
    }

    let backgroundStyle = {
      backgroundImage: `url(${this.state.photo})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "100% 100%"
    }

    let messageStyle = {
      opacity: 0.5,
      textShadow: "0 0 2px #fff"
    }

    let imageStyle = {
      paddingRight: "0.9375rem",
      paddingLeft: "0.9375rem"
    }

    let promptStyle = {
      opacity: 0.5,
      textShadow: "0 0 2px #fff"
    }

    return(
      <div style={backgroundStyle}>
        <div className="row">
          <h1 className="name text-center" style={promptStyle}>Prompt</h1>
          <h3 className="text-center" style={messageStyle}>Respond to this photo</h3>
          <div className="columns twelve">
            <form className="medium-centered" onSubmit={this.handleSubmit}>
              <div className="text-center" style={messageStyle}>
                {message}
              </div>
              <textarea style={textStyle} rows='17' cols='70' value={this.state.answer} onChange={this.handleChange} />
              <div style={{opacity: 0.5}} className="text-center">
                <div>{submitButton}</div>
                <div><a href="#" className="radius button" data-reveal-id="imageFormModal">Modal View</a></div>
              </div>
            </form>
          </div>

          <div id="imageFormModal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog" className="reveal-modal text-center">
            <h1 className="name text-center">Prompt</h1>
            <h3 className="text-center">Respond to this photo</h3>
            <a target="_blank" href={this.state.photo}>
              <img src={this.state.photo} style={imageStyle}/>
            </a>
            <div className="columns medium-12 large-12 medium-centered">
              <form onSubmit={this.handleSubmit}>
                {message}
                <textarea style={{fontSize: '25px'}} rows='17' cols='70' value={this.state.answer} onChange={this.handleChange} />
                {submitButton}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UnsplashFormContainer

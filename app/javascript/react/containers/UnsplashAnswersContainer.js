import React, { Component } from 'react';
import { Link } from 'react-router';

class UnsplashAnswersContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      photo: {},
      answer: {}
    }
  }

  componentDidMount(){
    fetch(`/api/v1/photo_answers/${this.props.params.id}`, {
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
        answer: body.photo_answer,
        photo: body.photo_answer.url
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    let answerStyle = {
      margin: "20px"
    }

    return(
      <div className="row collapse">
        <h1 className="name text-center" style={{margin: "40px"}}>Prompt</h1>
        <div className="columns small-12 medium-6">
          <a target="_blank" href={this.state.photo}>
            <img src={this.state.photo}/>
          </a>
        </div>
        <div className="columns small-12 medium-6">
          <div className="name-show">
            <Link className="name" to={`/users/${this.state.answer.user_id}`}>{this.state.answer.handle}</Link> on {this.state.answer.date_made}
          </div>
          <h4 className="page-header text-left" style={answerStyle}>
            {this.state.answer.answer}
          </h4>
        </div>
      </div>
    )
  }
}

export default UnsplashAnswersContainer;

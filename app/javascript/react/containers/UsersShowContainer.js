import React, { Component } from 'react';
import PromptsTile from '../components/PromptsTile';

class UsersShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = { prompts: [] }
  }

  componentDidMount(){

    fetch(`/api/v1/users/${this.props.params.id}`, {
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
        this.setState({ prompts: body.prompts });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let prompts = this.state.prompts.map( (prompt) =>{
      return (
        <PromptsTile
          key={prompt.id}
          id={prompt.id}
          description={prompt.description}
          date_made={prompt.date_made}
        />
      )
    })

    return (
      <div className="row spot-container">
        <h1 className="recent-activity">Recent Activity</h1>
        {prompts}
      </div>
    );
  }
}

export default UsersShowContainer;

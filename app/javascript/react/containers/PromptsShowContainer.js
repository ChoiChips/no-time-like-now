import React, { Component } from 'react';
import PromptsShow from "../components/PromptsShow"

class PromptsShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      prompt:  {}
    }
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
        prompt: prompt
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {

    return(
      <div className="row">
        <div className="columns medium-11 medium-centered">
          <PromptsShow
            key={this.state.prompt.id}
            id={this.state.prompt.id}
            userId={this.state.prompt.user_id}
            description={this.state.prompt.description}
          />
        </div>
      </div>
    )
  }
}

export default PromptsShowContainer

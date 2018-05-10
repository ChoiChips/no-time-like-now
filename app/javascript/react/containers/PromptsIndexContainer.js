import React, { Component } from 'react';
import PromptsTile from '../components/PromptsTile'
import PromptsShowContainer from './PromptsShowContainer'

class PromptsIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      prompts: []
    }
  }

  componentDidMount(){
    fetch('/api/v1/prompts.json')
    .then(response => {
      if (response.ok) {;
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
    let displayedPrompts = this.state.prompts.map( (prompt) =>{
      return (
        <PromptsTile
          key={prompt.id}
          id={prompt.id}
          description={prompt.description}
          handle={prompt.handle}
          date_made={prompt.date_made}
        />
      )
    })

    return (
      <div>
        <div className="row prompt-container">
          {displayedPrompts}
        </div>
      </div>
    );
  }
}

export default PromptsIndexContainer;

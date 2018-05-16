import React, { Component } from 'react';
import RedditPromptsTile from '../components/RedditPromptsTile'

class RedditIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      prompts: []
    }

  // this.addNewPrompt = this.addNewPrompt.bind(this)
  }

  // addNewPrompt(submission) {
  //   event.preventDefault();
  //
  // }

  componentDidMount(){
    fetch('https://www.reddit.com/r/writingprompts/hot.json?limit=24')
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
    .then(body => body.data.children)
    .then(posts => {
      posts.splice(0, 2)
      this.setState({ prompts: posts });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let displayedPrompts = this.state.prompts.map( (prompt) =>{
      let utcSeconds = prompt.data.created_utc
      let dateString = (new Date(utcSeconds * 1000)).toLocaleDateString()

      return (
        <RedditPromptsTile
          key={prompt.data.id}
          id={prompt.data.id}
          description={prompt.data.title}
          handle={prompt.data.author}
          date_made={dateString}
          url={prompt.data.url}
        />
      )
    })

    return (
      <div>
        <div className="row prompt-container">
          <h1 className="name text-center">Reddit's /r/WritingPrompts</h1>
          <ul className="text-left">
            <li>WP - Writing Prompt: No restrictions</li>
            <li>EU - Established Universe: Based on existing fiction </li>
            <li>CW - Constrained Writing: Limitations or forced usage of words, letters, etc.</li>
            <li>TT - Theme Thursday: Weekly prompts, announced Thursdays.</li>
            <li>MP - Media Prompt: Audio or video</li>
            <li>IP - Image Prompt: A striking image or album of images</li>
            <li>RF - Reality Fiction: Has happened before or should be able to happen in the real world to unknown people.</li>
          </ul>

          {displayedPrompts}
        </div>
      </div>
    );
  }
}

export default RedditIndexContainer;

import React, { Component } from 'react';
import { Link, browserHistory, Redirect } from 'react-router'

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: {},
      recent_answer: false
    }
  }

  // needs to have something every time cuz compDidMount only happens when mounting
  // in comp will rece props will have browserHistory push
  // pass down handle change to post page to change state of nav bar boolean when successful post occurs.

  componentDidMount() {
    fetch('/api/v1/users.json', {
      credentials: 'same-origin'
    })
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
    .then(current_user => {
      this.setState({
        current_user: current_user.user,
        recent_answer: current_user.user.recent_answer
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentWillReceiveProps(){
    fetch('/api/v1/users.json', {
      credentials: 'same-origin'
    })
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
    .then(current_user => {
      this.setState({
        recent_answer: current_user.user.recent_answer
      });

      // was causing infinite loop with browserHistory
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    if (this.state.recent_answer === false) {
      // browserHistory.push('/prompts/random')
      window.location='/prompts/random'
    }
  }

  render() {
    // let redirect_check
    // if (this.state.recent_answer === false) {
    //   redirect_check = <Redirect to="/prompts/random" />
    // }
    return (
      <div>
        <nav className="navbar navbar-default">j
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              <button>Prompts</button>
            </Link>
            <Link to="/prompts/new">
              <button className="btn btn-info log">New Prompt</button>
            </Link>
            <Link to="/reddit">
              <button className="btn btn-danger log">/r/WritingPrompts</button>
            </Link>
          </div>
        </nav>
        <div className="content">
          {React.cloneElement(this.props.children, {recent_answer: this.state.recent_answer})}
        </div>
      </div>
    )
  }
}

export default NavBar;

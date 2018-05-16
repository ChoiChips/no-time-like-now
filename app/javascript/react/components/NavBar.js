import React, { Component } from 'react';
import { Link, browserHistory, Redirect } from 'react-router'

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {},
      recentAnswer: false
    }
  }

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
    .then(currentUser => {
      this.setState({
        currentUser: currentUser.user,
        recentAnswer: currentUser.user.recent_answer
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
    .then(currentUser => {
      this.setState({
        recentAnswer: currentUser.user.recent_answer
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    if (this.state.recentAnswer === false) {
      window.location='/prompts/random'
    }
  }

  render() {

    return (
      <div>
        <div className="content">
          {React.cloneElement(this.props.children, {recentAnswer: this.state.recentAnswer})}
        </div>
      </div>
    )
  }
}

export default NavBar;

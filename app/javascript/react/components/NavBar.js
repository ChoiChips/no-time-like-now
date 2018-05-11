import React, { Component } from 'react';
import { Link } from 'react-router'

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: {},
      recent_answer: false
    }
  }
  componentDidMount() {
    // fetch('/api/v1/users.json')
    // .then(response => {
    //   if (response.ok) {;
    //     return response;
    //   } else {
    //     let errorMessage = `${response.status} (${response.statusText})`,
    //         error = new Error(errorMessage);
    //     throw(error);
    //   }
    // })
    // .then(response => response.json())
    // .then(current_user => {
    //   this.setState({
    //     current_user: current_user.user,
    //     recent_answer: current_user.user.recent_answer
    //   });
    //   debugger;
    // })
    // .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              <button>Prompts</button>
            </Link>
            <Link to="prompts/new">
              <button className="btn btn-info log">New Prompt</button>
            </Link>
            <Link>
              <button className="btn btn-danger log">Reddit Prompts</button>
            </Link>
          </div>
        </nav>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default NavBar;

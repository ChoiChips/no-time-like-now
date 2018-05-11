import React from 'react';
import { Link } from 'react-router'

const NavBar = props => {

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
        {props.children}
      </div>
    </div>
  )
}

export default NavBar;

import React from 'react';
import { Link } from 'react-router'

const NavBar = props => {

  return(
    <div>
      <div>Test NavBar</div>
      <div className="content">
        {props.children}
      </div>
    </div>
  )
}

export default NavBar;

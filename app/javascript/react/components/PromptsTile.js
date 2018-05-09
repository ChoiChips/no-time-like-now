import React, { Component } from 'react';
import { Link } from 'react-router';

const PromptsTile = (props) => {

  return (
    <div className="columns small-12 medium-6 large-4 end">
      <Link className="prompts-tile" to={`/prompts/${props.id}`}>
        <div className="content">
          <h3 className="description">
            {props.description}
          </h3>
        </div>
      </Link>
      <div>---------</div>
        <Link className="name" to={`/${props.handle}`}>-{props.handle}</Link>
    </div>
  )
}

export default PromptsTile;

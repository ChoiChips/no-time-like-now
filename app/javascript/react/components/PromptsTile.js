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
          <h6 className="name">User ID: {props.author}</h6>
        </div>
      </Link>
    </div>
  )
}

export default PromptsTile;

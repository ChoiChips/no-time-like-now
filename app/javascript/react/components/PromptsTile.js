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
      <div>
        <Link className="name" to={`/users/${props.id}`}>{props.handle}</Link> on {props.date_made}
      </div>
    </div>
  )
}

export default PromptsTile;

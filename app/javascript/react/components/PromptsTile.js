import React, { Component } from 'react';
import { Link } from 'react-router';

const PromptsTile = (props) => {

  let description;
  if (props.description.length > 75) {
    description = `${props.description.substring(0, 75)}...`
  } else {
    description = props.description
  }

  return (
    <div className="columns small-12 medium-6 large-4 end">
      <div className="user-sig">
        <Link className="name" to={`/users/${props.id}`}>{props.handle}</Link> on {props.date_made}
      </div>
      <Link className="prompts-tile" to={`/prompts/${props.id}`}>
        <div className="content">
          <h3 className="description">
            {description}
          </h3>
        </div>
      </Link>
    </div>
  )
}

export default PromptsTile;

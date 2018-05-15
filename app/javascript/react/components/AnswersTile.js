import React, { Component } from 'react';
import { Link } from 'react-router';

const AnswersTile = (props) => {

  return (
    <div className="columns small-12 medium-6 large-4 end">
      <div className="user-sig">
        <Link className="name" to={`/users/${props.id}`}>{props.handle}</Link> on {props.date_made}
      </div>
      <Link className="prompts-tile" to={`/answers/${props.id}`}>
        <div className="content">
          <h3 className="answer">
            {props.answer}
          </h3>
        </div>
      </Link>
    </div>
  )
}

export default AnswersTile;

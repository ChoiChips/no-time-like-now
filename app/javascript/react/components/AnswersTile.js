import React, { Component } from 'react';
import { Link } from 'react-router';

const AnswersTile = (props) => {

  let answer;
  if (props.answer.length > 75) {
    answer = `${props.answer.substring(0, 75)}...`
  } else {
    answer = props.answer
  }

  return (
    <div className="columns small-12 medium-6 large-4 end">
      <div className="user-sig">
        <Link className="name" to={`/users/${props.id}`}>{props.handle}</Link> on {props.date_made}
      </div>
      <Link className="prompts-tile" to={`/answers/${props.id}`}>
        <div className="content">
          <h4 className="answer">
            {answer}
          </h4>
        </div>
      </Link>
    </div>
  )
}

export default AnswersTile;

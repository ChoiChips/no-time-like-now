import React from 'react';
import { Link } from 'react-router';

const RedditShow = (props) => {

  return(
    <div className="row collapse">
      <div className="columns small-12">
        <h1 className="name text-center">Prompt</h1>
        <h2 className="page-header text-center">
          {props.description}
        </h2>
      </div>
      <div className="name-show">
        <a target="_blank" className="name" href={`https://www.reddit.com/u/${props.handle}`}>{props.handle}</a> on {props.date_made}
      </div>
    </div>
  )
}

export default RedditShow;

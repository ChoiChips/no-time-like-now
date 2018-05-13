import React, { Component } from 'react';
import { Link } from 'react-router';

const RedditPromptsTile = (props) => {

  let description;
  if (props.description.length > 75) {
    description = `${props.description.substring(0, 75)}...`
  } else {
    description = props.description
  }
  //
  // let addNewPrompt = (event) => {
  //   event.preventDefault();
  //
  //   let promptInfo = {
  //     handle: props.handle,
  //     description: props.description,
  //     date_made: props.date_made
  //   }
  //
  //   props.addNewPrompt(promptInfo);
  // }

  return (
    <div className="columns small-12 medium-6 large-4 end">
      <div className="user-sig">
        <a target="_blank" className="name" href={`https://www.reddit.com/u/${props.handle}`}>{props.handle}</a> on {props.date_made}
      </div>
      <Link
        className="prompts-tile"
        to={{
          pathname: '/reddit/new',
          state: {
            handle: props.handle,
            description: props.description,
            date_made: props.date_made
          }
        }}>
        <div className="content">
          <h3 className="description">
            {description}
          </h3>
        </div>
      </Link>
    </div>
  )
}

export default RedditPromptsTile;

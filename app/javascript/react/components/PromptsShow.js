import React from 'react';
import { Link } from 'react-router';

const PromptsShow = (props) => {

  return(
    <div className="row collapse">
      <div className="columns small-12">
        <h2 className="page-header text-center">
          {props.description}
        </h2>
      </div>
      <div className="name-show">
        <Link className="name" to={`/users/${props.id}`}>{props.handle}</Link> on {props.date_made}
      </div>
    </div>
  )
}

export default PromptsShow;

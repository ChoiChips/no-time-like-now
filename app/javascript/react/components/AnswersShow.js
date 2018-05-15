import React from 'react';
import { Link } from 'react-router';

const AnswersShow = (props) => {

  return(
    <div className="row collapse">
      <div className="columns small-12">
        <div className="name-show">on {props.date_made}</div>
        <h2 className="page-header text-center">
          {props.answer}
        </h2>
      </div>
    </div>
  )
}

export default AnswersShow;

import React from 'react';

const PromptsShow = (props) => {

  return(
    <div className="row collapse">
      <div className="columns small-12">
        <h2 className="page-header text-center">
          {props.description}
        </h2>
      </div>
      <div>
        <h6 className="name">User ID: {props.author}</h6>
      </div>
    </div>
  )
}

export default PromptsShow;

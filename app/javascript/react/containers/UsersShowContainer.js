import React, { Component } from 'react';

import PromptsTile from '../components/PromptsTile';
import AnswersTile from '../components/AnswersTile';
import AnswersChart from '../components/AnswersChart';

class UsersShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      prompts: [],
      answers: [],
      chartData: {}
    }
  }

  componentDidMount(){

    fetch(`/api/v1/users/${this.props.params.id}`, {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        let chartData = body.user.answers.map( (answer) => {
          let splitDate = answer.date_made.split("/")
          let date = new Date(splitDate[2], splitDate[0] - 1, splitDate[1])
          return (
            [date, answer.length]
          )
        })
        chartData.unshift(["Date", "Word Count"])
        this.setState({
          prompts: body.user.prompts,
          answers: body.user.answers,
          chartData: chartData
         });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let prompts = this.state.prompts.map( (prompt) =>{
      return (
        <PromptsTile
          key={prompt.id}
          id={prompt.id}
          description={prompt.description}
          date_made={prompt.date_made}
        />
      )
    })

    let answers = this.state.answers.map( (answer) =>{
      return (
        <AnswersTile
          key={answer.id}
          id={answer.id}
          answer={answer.answer}
          date_made={answer.date_made}
        />
      )
    })

    let recentActivity = <div></div>

    if (this.state.prompts.length === 0 && this.state.answers.length === 0) {
      recentActivity = <h1 className="recent-activity">No Recent Activity</h1>

    } else if (this.state.prompts.length !== 0 && this.state.answers.length === 0) {
      recentActivity =
        <div className="row spot-container">
          <h1 className="recent-activity">Recent Activity</h1>
          <div>
            <h3 className="recent-activity">Your Prompts</h3>
            <div className="columns">
              {prompts}
            </div>
        </div>
      </div>

    } else if (this.state.prompts.length === 0 && this.state.answers.length !== 0) {
      recentActivity =
        <div className="row spot-container">
          <h1 className="recent-activity">Recent Activity</h1>
          <div className="columns answers-chart">
            <AnswersChart
              data={this.state.chartData}
            />
          </div>
          <div>
            <h3 className="recent-activity">Your Answers</h3>
            <div className="columns">
              {answers}
            </div>
          </div>
        </div>

    } else if (this.state.prompts.length !== 0 && this.state.answers.length !== 0) {
      recentActivity = <div className="row spot-container">
        <h1 className="recent-activity">Recent Activity</h1>
        <div>
          <div className="columns answers-chart">
            <AnswersChart
              data={this.state.chartData}
            />
          </div>
          <h3 className="recent-activity">Your Prompts</h3>
          <div className="columns">
            {prompts}
          </div>
          <h3 className="recent-activity">Your Answers</h3>
          <div className="columns">
            {answers}
          </div>
        </div>
      </div>
    }

    return (
      <div>
        {recentActivity}
      </div>
      // <div className="row spot-container">
      //   <h1 className="recent-activity">Recent Activity</h1>
      //   <div>
      //     <h3 className="text-center">Prompts</h3>
      //     <div className="columns">
      //       {prompts}
      //     </div>
      //     <h3 className="text-center">Answers</h3>
      //     <div className="columns">
      //       {answers}
      //     </div>
      //     <div className="columns answers-chart">
      //       <AnswersChart
      //         data={this.state.chartData}
      //       />
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default UsersShowContainer;

import React, { Component } from 'react';

import PromptsTile from '../components/PromptsTile';
import AnswersTile from '../components/AnswersTile';
import AnswersChart from '../components/AnswersChart';

class UsersShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {},
      prompts: [],
      answers: [],
      redditAnswers: [],
      wordAnswers: [],
      photoAnswers: [],
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
      .then(body => body.user)
      .then(user => {
        let allAnswers = user.answers.concat(user.reddit_answers, user.word_answers, user.photo_answers)
        let chartData = allAnswers.map( (answer) => {
          let splitDate = answer.date_made.split("/")
          let date = new Date(splitDate[2], splitDate[0] - 1, splitDate[1])
          return (
            [date, answer.length]
          )
        })
        chartData.unshift(["Date", "Word Count"])

        this.setState({
          user: user,
          prompts: user.prompts,
          answers: user.answers,
          redditAnswers: user.redditAnswers,
          wordAnswers: user.wordAnswers,
          photoAnswers: user.photoAnswers,
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
      recentActivity = <h1 className="recent-activity">{this.state.user.handle} Has No Recent Activity</h1>

    } else if (this.state.prompts.length !== 0 && this.state.chartData.length === 0) {
      recentActivity =
        <div className="row spot-container">
          <h1 className="recent-activity">{this.state.user.handle}'s Recent Activity</h1>
          <div>
            <h3 className="recent-activity">Submitted Prompts</h3>
            <div className="columns">
              {prompts}
            </div>
        </div>
      </div>

    } else if (this.state.prompts.length === 0 && this.state.chartData.length !== 0) {
      recentActivity =
        <div className="row spot-container">
          <h1 className="recent-activity">{this.state.user.handle}'s Recent Activity</h1>
          <div className="columns answers-chart">
            <AnswersChart
              data={this.state.chartData}
            />
          </div>
          <div>
            <h3 className="recent-activity">Submitted Answers</h3>
            <div className="columns">
              {answers}
            </div>
          </div>
        </div>

    } else if (this.state.prompts.length !== 0 && this.state.chartData.length !== 0) {
      recentActivity = <div className="row spot-container">
        <h1 className="recent-activity">{this.state.user.handle}'s Recent Activity</h1>
        <div>
          <div className="columns answers-chart">
            <AnswersChart
              data={this.state.chartData}
            />
          </div>
          <h3 className="recent-activity">Submitted Prompts</h3>
          <div className="columns">
            {prompts}
          </div>
          <h3 className="recent-activity">Submitted Answers</h3>
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
    );
  }
}

export default UsersShowContainer;

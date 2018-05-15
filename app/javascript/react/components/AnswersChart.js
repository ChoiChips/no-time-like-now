import React, { Component } from 'react'
import { Chart } from 'react-google-charts';

const AnswersChart = (props) => {

  let today = new Date();
  let oneWeekAgo = new Date(today.getTime() - (60*60*24*7*1000));

  let options = {
    vAxis: { title: 'Word Count' },
    hAxis: { title: 'Date', minValue: oneWeekAgo, maxValue: today},
    legend: 'none'
  }

  return (
    <div>
      <h3 className="text-center">Word Count Over Time</h3>
      <Chart
        chartType="ScatterChart"
        data={props.data}
        options={options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        legend_toggle
      />
    </div>
  )
}
export default AnswersChart

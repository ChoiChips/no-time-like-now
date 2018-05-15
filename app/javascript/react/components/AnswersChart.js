import React, { Component } from 'react'
import { Chart } from 'react-google-charts';

const AnswersChart = (props) => {

  let today = new Date();
  let oneWeekAgo = new Date(today.getTime() - (60*60*24*7*1000));

  let options = {
    vAxis: { title: 'Word Count Per Entry' },
    hAxis: { title: 'Date', minValue: oneWeekAgo, maxValue: today},
    titlePosition: 'none',
    legend: 'none'
  }

  return (
    <div>
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

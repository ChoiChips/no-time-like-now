import React, { Component } from 'react'
import { Chart } from 'react-google-charts';

const AnswersChart = (props) => {

  let today = new Date();
  let oneWeekAgo = new Date(today.getTime() - (60*60*24*7*1000));

  let options = {
    vAxis: { title: 'Word Count Per Answer' },
    hAxis: { title: 'Date', minValue: oneWeekAgo, maxValue: today},
    titlePosition: 'none',
    legend: {
      position: "none"
    },
    chartArea: {top: '8%', height: "70%"}
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
      />
    </div>
  )
}
export default AnswersChart

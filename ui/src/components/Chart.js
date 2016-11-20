import React, { Component } from 'react'

import { Row } from 'components/Flex'

import {ResponsiveContainer, BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line} from 'recharts'

var TestBarData = [{
  key: "Cumulative Return",
  values: [
    {
      "label" : "A" ,
      "value" : -29.765957771107
    } ,
    {
      "label" : "B" ,
      "value" : 0
    } ,
    {
      "label" : "C" ,
      "value" : 32.807804682612
    } ,
    {
      "label" : "D" ,
      "value" : 196.45946739256
    } ,
    {
      "label" : "E" ,
      "value" : 0.19434030906893
    } ,
    {
      "label" : "F" ,
      "value" : -98.079782601442
    } ,
    {
      "label" : "G" ,
      "value" : -13.925743130903
    } ,
    {
      "label" : "H" ,
      "value" : -5.1387322875705
    }
  ]
}];

var TestLineData = [{
  key: "Spend",
  values: [
    {
      "hour" : 0,
      "value" : 12
    },
    {
      "hour" : 1,
      "value" : 13
    },
    {
      "hour" : 2,
      "value" : 16
    },
    {
      "hour" : 3,
      "value" : 20
    },
  ]
}];

var TestLineData2 = [
  {
    "hour" : 0,
    "value" : 12
  },
  {
    "hour" : 1,
    "value" : 13
  },
  {
    "hour" : 2,
    "value" : 16
  },
  {
    "hour" : 3,
    "value" : 20
  },
];

var TestBarData2 = [
  {
    "label" : "A" ,
    "value" : -29.765957771107
  } ,
  {
    "label" : "B" ,
    "value" : 0
  } ,
  {
    "label" : "C" ,
    "value" : 32.807804682612
  } ,
  {
    "label" : "D" ,
    "value" : 196.45946739256
  } ,
  {
    "label" : "E" ,
    "value" : 0.19434030906893
  } ,
  {
    "label" : "F" ,
    "value" : -98.079782601442
  } ,
  {
    "label" : "G" ,
    "value" : -13.925743130903
  } ,
  {
    "label" : "H" ,
    "value" : -5.1387322875705
  }
]


export default class Chart extends Component {
  render () {
    return (
      <div>
        <ResponsiveContainer>
          <LineChart data={TestLineData2} margin={{top: 30, right: 90, bottom: 30, left: 30}}>
            <XAxis dataKey="hour" label="Hours" />
            <YAxis label="Spend"/>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" name="Spend" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer>
          <BarChart data={TestBarData2} margin={{top: 30, right: 90, bottom: 30, left: 30}}>
            <XAxis dataKey="label"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar name="Spend" dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    )

  }
}

export class LineChartWrapper extends Component {
  render() {
    return (
      <ResponsiveContainer>
        <LineChart data={this.props.data} margin={{top: 30, right: 90, bottom: 30, left: 30}}>
          <XAxis dataKey={this.props.xKey} label={this.props.xKey} />
          <YAxis label={this.props.yKey}/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" name={this.props.yKey} dataKey={this.props.yKey} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export class BarChartWrapper extends Component {
render() {
  return (
    <ResponsiveContainer>
      <BarChart data={this.props.data} margin={{top: 30, right: 90, bottom: 30, left: 30}}>
        <XAxis dataKey={this.props.xKey} label={this.props.xKey} />
        <YAxis label={this.props.yKey}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Bar name={this.props.yKey} dataKey={this.props.yKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
}

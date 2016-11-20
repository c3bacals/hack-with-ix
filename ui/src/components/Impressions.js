import React, { Component } from 'react'
import {LineChartWrapper, BarChartWrapper} from './Chart'
import {BestEstimate} from './BestEstimate'
import { Center } from 'components/Flex'

var TestLineData = [{
  key: "Spend",
  values: []
}];

export class Impressions extends Component {

  constructor () {
    super()
    this.state = { impressionsNA : [], impressionsEU: [], impressionsAS: [] }
  }

  refresh(){
    console.log("Refreshing ...");

    fetch('http://localhost:8000/impressions?dc=NA')
    .then(res => res.json())
    .then(json => {
      this.setState({ impressionsNA: json.data})
      console.log("NA")
      console.log(this.state.impressionsNA)
    })
    .catch(err => { console.log('ERROR', err); });

    fetch('http://localhost:8000/impressions?dc=EU')
    .then(res => res.json())
    .then(json => {
      this.setState({ impressionsEU: json.data})
    })
    .catch(err => { console.log('ERROR', err); });

    fetch('http://localhost:8000/impressions?dc=AS')
    .then(res => res.json())
    .then(json => {
      this.setState({ impressionsAS: json.data})
    })
    .catch(err => { console.log('ERROR', err); });
  }

  /* Get the average spend at each hour in the day */
  getTimeToCost(param) {
    var timeToCostDict = {}
    var timeToCost = []
    var dcList = [this.state.impressionsNA, this.state.impressionsEU, this.state.impressionsAS]
    for (var i = 0; i < dcList.length; i++) {
      var impressionData = dcList[i];
      for (var j = 0; j < impressionData.length; j++) {
        var hour = new Date(impressionData[j].timestamp).getUTCHours()
        if (impressionData[j].format == param || impressionData[j].platform == param) {
          if (!(hour in timeToCostDict)) {
            timeToCostDict[hour] = []
            timeToCostDict[hour].push(impressionData[j].spend)
          } else {
            var spendList = timeToCostDict[hour]
            spendList.push(impressionData[j].spend)
            timeToCostDict[hour] = spendList
          }
        }
      }
    }
    for (var hour in timeToCostDict) {
      var data = {}
      data["hour"] = parseInt(hour)
      var averageSpend = 0;
      for (var i = 0; i < timeToCostDict[hour].length; i++) {
        averageSpend += timeToCostDict[hour][i]
      }
      averageSpend /= timeToCostDict[hour].length
      data["spend"] = averageSpend
      timeToCost.push(data)
    }
    return timeToCost
  }

  /* Return the hour that has the highest spend */
  getBestHour(timeToCost) {
    var mostSpend = 0;
    var hour;
    for (var i = 0; i < timeToCost.length; i++) {
      if (timeToCost[i]["spend"] > mostSpend) {
        mostSpend = timeToCost[i]["spend"]
        hour = timeToCost[i]["hour"]
      }
    }
    return hour
  }

  /* Get the average spend of each platform based on format input  (or vice versa)
      by the user during the best hour in the day */
    getParamToCost(bestHour, formatOrPlatform, param) {
      console.log("formatOrPlatform", formatOrPlatform);
    var paramToCostDict = {}
    var paramToCost = []
    var dcList = [this.state.impressionsNA, this.state.impressionsEU, this.state.impressionsAS]
    for (var i = 0; i < dcList.length; i++) {
      var impressionData = dcList[i];
      for (var j = 0; j < impressionData.length; j++) {
        if (formatOrPlatform == "format")
          var input = impressionData[j].platform
        else
          var input = impressionData[j].format
        if (impressionData[j].platform == param 
            || impressionData[j].format == param) {
          if (!(input in paramToCostDict)) {
            paramToCostDict[input] = []
            paramToCostDict[input].push(impressionData[j].spend)
          } else {
              var spendList = paramToCostDict[input]
              spendList.push(impressionData[j].spend)
              paramToCostDict[input] = spendList
          }
        }
      }
    }
    for (var param in paramToCostDict) {
      var data = {}
      if (formatOrPlatform == "format")
        data["platform"] = param
      else
        data["format"] = param
      var averageSpend = 0;
      for (var i = 0; i < paramToCostDict[param].length; i++) {
        averageSpend += paramToCostDict[param][i]
      }
      averageSpend /= paramToCostDict[param].length
      data["spend"] = averageSpend
      paramToCost.push(data)
    }
    console.log(paramToCost)
    return paramToCost
  }

  /* Return the best format or platform at the best hour */
  getBestParam(formatOrPlatform, paramToCost) {
    var mostSpend = 0;
    var param;
    for (var i = 0; i < paramToCost.length; i++) {
      if (paramToCost[i]["spend"] > mostSpend) {
        mostSpend = paramToCost[i]["spend"]
        if (formatOrPlatform == "format")
          param = paramToCost[i]["format"]
        else
          param = paramToCost[i]["platform"]
      }
    }
    console.log(param)
    return param
  }

  getXKey(formatPlatform) {
    var input;
    if (formatPlatform == "format") 
      input = "platform" 
    else 
      input = "format"
    console.log("input", input)
    return input
  }

  componentWillMount() {
    console.log("componentWillMount ...");
    this.refresh()
  }

  // render () {
  //    return (
  //         <div>
  //          <button onClick={() => {this.getTimeToCost()}}>Time vs Cost</button>
  //          <button onClick={() => {this.getBestHour(this.getTimeToCost())}}>Best Hour</button>
  //          <button onClick={() => {this.getPlatformToCost(this.getBestHour(this.getTimeToCost()), "video")}}>Platform vs Cost at Best Hour</button>
  //          <button onClick={() => {this.getBestPlatform(this.getPlatformToCost(this.getBestHour(this.getTimeToCost())))}}>Best Platform</button>
  //          <button onClick={() => {this.getFormatToCost(this.getBestHour(this.getTimeToCost()), "mobile")}}>Format vs Cost at Best Hour</button>
  //          <button onClick={() => {this.getBestFormat(this.getFormatToCost(this.getBestHour(this.getTimeToCost())))}}>Best Format</button>
  //         </div>
  //     )
  // }

  // <BarChart data={() => {this.getPlatformToCost(this.getBestHour(this.getTimeToCost()), "video")}} x="platform" y="spend" />

  getBestFormatOrPlatform() {
    var formatOrPlatform = this.props.formatOrPlatform
    console.log("asdfasdfasdf:: " + formatOrPlatform)
    console.log(this.props.param)
    var bestFormat;
    if (formatOrPlatform == "format"){
      bestFormat =  this.getBestFormat(this.getFormatToCost(this.getBestHour(this.getTimeToCost()), this.props.param));

    } else if (formatOrPlatform == "platform") {
      bestFormat =  this.getBestPlatform(this.getPlatformToCost(this.getBestHour(this.getTimeToCost()), this.props.param));
    }
    console.log("bestFormat:: " + bestFormat)
    return bestFormat;
  }

  render () {

    return (
      <Center >

        <div style={{width: "85%"}}>
          <BestEstimate bestHour={this.getBestHour(this.getTimeToCost())} formatOrPlatform={this.props.formatOrPlatform} outputAnswer={this.props.param} bestFormatOrPlatform={this.getBestFormatOrPlatform(this.props.formatOrPlatform)}/>

          <div className="panel panel-default">
            <div className="panel-heading">Spend vs Hour</div>
            <div className="panel-body"><LineChartWrapper data={this.getTimeToCost(this.props.param)} xKey="hour" yKey="spend" />
          </div>

        </div>


        <div className="panel panel-default">
          <div className="panel-heading">Spend Versus Format/Platform</div>
          <div className="panel-body"><BarChartWrapper data={this.getParamToCost(this.getBestHour(this.getTimeToCost()), this.props.formatOrPlatform, this.props.param)} xKey={this.getXKey(this.props.formatOrPlatform)} yKey="spend" />
        </div>
      </div>
    </div>
  </Center>
)
}

}

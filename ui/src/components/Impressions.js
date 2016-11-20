import React, { Component } from 'react'
import {LineChartWrapper, BarChartWrapper} from './Chart'

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

  // /* Get the average spend of each platform based on format input 
  //    by the user during the best hour in the day */
  // getPlatformToCost(bestHour, format) {
  //   var platformToCostDict = {}
  //   var platformToCost = []
  //   var dcList = [this.state.impressionsNA, this.state.impressionsEU, this.state.impressionsAS]
  //   for (var i = 0; i < dcList.length; i++) {
  //     var impressionData = dcList[i];
  //     for (var j = 0; j < impressionData.length; j++) {
  //       var platform = impressionData[j].platform
  //       if (impressionData[j].format == format) {
  //         if (!(platform in platformToCostDict)) {
  //           platformToCostDict[platform] = []
  //           platformToCostDict[platform].push(impressionData[j].spend)
  //         } else {
  //             var spendList = platformToCostDict[platform]
  //             spendList.push(impressionData[j].spend)
  //             platformToCostDict[platform] = spendList
  //         }
  //       }
  //     }
  //   }
  //   for (var platform in platformToCostDict) {
  //     var data = {}
  //     data["platform"] = platform
  //     var averageSpend = 0;
  //     for (var i = 0; i < platformToCostDict[platform].length; i++) {
  //       averageSpend += platformToCostDict[platform][i]
  //     }
  //     averageSpend /= platformToCostDict[platform].length
  //     data["spend"] = averageSpend
  //     platformToCost.push(data)
  //   }
  //   return platformToCost
  // }

  // /* Return the hour that has the highest spend */
  // getBestPlatform(platformToCost) {
  //   var mostSpend = 0;
  //   var platform;
  //   for (var i = 0; i < platformToCost.length; i++) {
  //     if (platformToCost[i]["spend"] > mostSpend) {
  //       mostSpend = platformToCost[i]["spend"]
  //       platform = platformToCost[i]["platform"]
  //     }
  //   }
  //   // console.log(platform)
  //   return platform
  // }

  //   /* Get the average spend of each format during the best hour in the day */
  // getFormatToCost(bestHour, platform) {
  //   var formatToCostDict = {}
  //   var formatToCost = []
  //   var dcList = [this.state.impressionsNA, this.state.impressionsEU, this.state.impressionsAS]
  //   for (var i = 0; i < dcList.length; i++) {
  //     var impressionData = dcList[i];
  //     for (var j = 0; j < impressionData.length; j++) {
  //       var format = impressionData[j].format
  //       if (impressionData[j].platform == platform) {
  //         if (!(format in formatToCostDict)) {
  //           formatToCostDict[format] = []
  //           formatToCostDict[format].push(impressionData[j].spend)
  //         } else {
  //             var spendList = formatToCostDict[format]
  //             spendList.push(impressionData[j].spend)
  //             formatToCostDict[format] = spendList
  //         }
  //       }
  //     }
  //   }
  //   for (var format in formatToCostDict) {
  //     var data = {}
  //     data["format"] = format
  //     var averageSpend = 0;
  //     for (var i = 0; i < formatToCostDict[format].length; i++) {
  //       averageSpend += formatToCostDict[format][i]
  //     }
  //     averageSpend /= formatToCostDict[format].length
  //     data["spend"] = averageSpend
  //     formatToCost.push(data)
  //   }
  //   console.log(formatToCost)
  //   return formatToCost
  // }

  // /* Return the hour that has the highest spend */
  // getBestFormat(formatToCost) {
  //   var mostSpend = 0;
  //   var format;
  //   for (var i = 0; i < formatToCost.length; i++) {
  //     if (formatToCost[i]["spend"] > mostSpend) {
  //       mostSpend = formatToCost[i]["spend"]
  //       format = formatToCost[i]["format"]
  //     }
  //   }
  //   console.log(format)
  //   return format
  // }

  /* Get the average spend of each platform based on format input  (or vice versa)
  //    by the user during the best hour in the day */
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


  render () {

     return (
      <div style={{width: "100%"}}>
        <LineChartWrapper data={this.getTimeToCost(this.props.param)} xKey="hour" yKey="spend" />
        <BarChartWrapper data={this.getParamToCost(this.getBestHour(this.getTimeToCost()), this.props.formatOrPlatform, this.props.param)} xKey={this.getXKey(this.props.formatOrPlatform)} yKey="spend" />
      </div>
      )
   }
  
}

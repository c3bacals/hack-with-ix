import React, { Component } from 'react'

export class BestEstimate extends Component {
  constructor() {
    super()
    this.state = {}
  }

  convert24Hour(hours) {
    //it is pm if hours from 12 onwards
    var suffix = (hours >= 12)? ' PM' : ' AM';
    //only -12 from hours if it is greater than 12 (if not back at mid night)
    hours = (hours > 12)? hours -12 : hours;
    //if 0 then it is 12 am
    hours = (hours == '0')? 12 : hours;
    return hours + suffix
}

  render() {
    return (
      <div className="jumbotron">
        <p>For a {this.props.outputAnswer} advertisement, </p>
        <h3>Best hour to advertise: {this.convert24Hour(this.props.bestHour)}</h3>
        <h3>Best {this.props.formatOrPlatform} to advertise: {this.props.bestFormatOrPlatform}</h3>
      </div>
    );
  }
}

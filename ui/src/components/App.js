// Dependencies

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// Components

import { Center } from 'components/Flex'
import ModalG from 'components/ModalG'
import { MyHeader } from 'components/Header.js'
import { MyFooter } from 'components/Footer.js'
import { Impressions } from 'components/Impressions.js'

export default class App extends Component {
      constructor(props) {
    super(props);
    this.state = {
      showComponent_Main1: true,
      outputAnswer: "empty",
      
    };
  }

  getOutput(output){
    //alert("MY OUTPUT IS: " + output)

    if(output == "Banner")
    this.state.outputAnswer = "banner";
  if(output == "Video")
    this.state.outputAnswer = "video";
  if(output == "Desktop")
    this.state.outputAnswer = "desktop";
  if(output == "Mobile")
    this.state.outputAnswer = "mobile";
  if(output == "App")
    this.state.outputAnswer = "app";
  
     this.forceUpdate();

  }


  renderImpressions(){
    if(this.state.outputAnswer != "empty")
    return <Impressions param={this.state.outputAnswer} style={{marginBottom: "0"}}/>



  }

    render() {
      return (
        <div style={{width:"100%",height:"100%"}}>
         <MyHeader/>
        
        <body style = {{height: "100%", margin: "0"}}>
          <div className="content" style={{minHeight: "100%"}}>
            <div className="content-inside" style={{padding: "20px", paddingBottom: "50px"}}>
           
            <ReactCSSTransitionGroup transitionName = "example"  transitionAppear = {true} transitionAppearTimeout = {500}
               transitionEnter = {false} transitionLeave = {false}>
            <ModalG getOutput={this.getOutput.bind(this)}/>
             </ReactCSSTransitionGroup>
        
            {this.renderImpressions()}

            </div>
          </div>
              <MyFooter style={{height: "50px", marginTop: "-50px"}}/>
        </body>
        </div>
      )
    }
  }

  

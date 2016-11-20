// Dependencies

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

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
    return <Impressions param={this.state.outputAnswer}/>



  }

    render() {
      return (
        <div style={{width:"100%",height:"100%"}}>
        <MyHeader/>
        <ModalG getOutput={this.getOutput.bind(this)}/>
        
        {this.renderImpressions()}
        
        <MyFooter/>
        </div>
      )
    }
  }

  

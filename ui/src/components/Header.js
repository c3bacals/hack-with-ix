/*
  By Andrei Patranoiu
*/

// Dependencies

import React, { Component } from 'react'



// Components

import { Center } from 'components/Flex'
import { Row } from 'components/Flex'
import { Navbar } from 'react-bootstrap';



export class MyHeader extends Component {
  constructor () {
    super()
  }

 
  render () {
   
    
    return (
      
    <div >
      <nav className="navbar navbar-default" style={{backgroundColor: "#4C5F6B"}}  >
      <div className="container-fluid">
      <Center>
        <div className="navbar-header">
          
            <a className="navbar-brand" style={{ color: "white"}}>Team Back-End</a>
         
          
        </div>
       </Center>
   </div>

      </nav>
    </div>

    )
  }
}


// Dependencies

import React, { Component } from 'react'




// Components

import { Center } from 'components/Flex'
import { Modal } from 'react-bootstrap'
import { HandleButton } from './Button.js'




export default class ModealG extends Component {
    constructor() {
        super()
    }

  
    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>How would you like to advertise your product ?</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <HandleButton/>
                         </Modal.Body>
                 </Modal.Dialog>
            </div>
            )
    }
}

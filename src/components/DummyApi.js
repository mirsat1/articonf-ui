import React, { useState } from "react"

import { Button, Modal } from 'semantic-ui-react'
import JSONPretty from 'react-json-prettify'
import CustomTheme from 'react-json-prettify/dist/themes/arduinoLight'
// import {Context} from "../Context"

export default function Dummy(props) {
   const [open, setOpen] = useState(false)

  return (
    <div>
      {/* <Button style={{marginRight: '5px'}} onClick={props.callApi}>{props.btnName}</Button>
      <Button onClick={toggle}>Show Info</Button><br />
      <p style={{display: show ? "block" : "none"}}>{props.info}</p><hr /> */}
      <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button onClick={props.callApi}>{props.modalBtnName}</Button>}
      >
          <Modal.Header>{props.headerInfo}</Modal.Header>
            <Modal.Content scrolling>
              <Modal.Description>
                <JSONPretty theme={CustomTheme} json={props.data}/>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button
                content="OK"
                labelPosition='right'
                icon='checkmark'
                onClick={() => setOpen(false)}
                positive
              />
            </Modal.Actions>
      </Modal> 
    </div>
  )
}
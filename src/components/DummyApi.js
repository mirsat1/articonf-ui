import React from "react"

import useToggler from "../hooks/useToggler"
import { Button } from 'semantic-ui-react'
// import {Context} from "../Context"

export default function Dummy(props) {
  // const {callDummyButton, hasError} = useContext(Context)
   const [show, toggle] = useToggler()

  return (
    <div>
      <Button style={{marginRight: '5px'}} onClick={props.callApi}>{props.btnName}</Button>
      <Button onClick={toggle}>Show Info</Button><br />
      <p style={{display: show ? "block" : "none"}}>{props.info}</p><hr />
    </div>
  )
}
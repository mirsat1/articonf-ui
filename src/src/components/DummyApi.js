import React from "react"

import useToggler from "../hooks/useToggler"
// import {Context} from "../Context"

export default function Dummy(props) {
  // const {callDummyButton, hasError} = useContext(Context)
   const [show, toggle] = useToggler()

  return (
    <div>
      <button style={{marginRight: '5px'}} className="pure-button" onClick={props.callApi}>{props.btnName}</button>
      <button className="pure-button" onClick={toggle}>Show Info</button><br />
      <p style={{display: show ? "block" : "none"}}>{props.info}</p><hr />
    </div>
  )
}
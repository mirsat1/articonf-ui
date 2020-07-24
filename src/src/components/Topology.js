import React, {useContext} from "react"

import useToggler from "../hooks/useToggler"
import {Context} from "../Context"

export default function Topology() {
  const {topoBtnClick, hasError} = useContext(Context)
  const [show, toggle] = useToggler()
  return (
    <div>
      <button className="pure-button" onClick={topoBtnClick}>Find topolog template by ID</button>
      <button className="pure-button" onClick={toggle}>Show Info</button><br />
      <p style={{display: show ? "block" : "none"}}>Returns a single topology template.</p><hr />
      <p style={{display: hasError ? "block" : "none"}}>There was an error :(</p>
    </div>
  )
}

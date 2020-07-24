import React, {useContext} from "react"

import useToggler from "../hooks/useToggler"
import {Context} from "../Context"

export default function EC2() {
  const {ecBtnClick} = useContext(Context)
  const [show, toggle] = useToggler()

  return (
    <div>
      <button className="pure-button" onClick={ecBtnClick}>Create EC2 credentials</button>
      <button className="pure-button" onClick={toggle}>Show Info</button><br />
      <p style={{display: show ? "block" : "none"}}>Creates EC2 credentials. This call is optional deployments will probably have credentials set by the admin.</p><hr />
    </div>
  )
}

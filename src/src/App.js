import React, {useContext, memo} from "react"
import Dummy from "./components/DummyApi"
import {Context} from "./Context"


function App() {
  const {topologyTemplate, ecBtnClick, uploadToscaButton, topoBtnClick, planToscaBtn, planTopoBtn, provisionToscaBtn, findProvisioned, callDummyButton, hasError, isLoading} = useContext(Context)
  console.log(isLoading)
  return (
    <div>
      <Dummy 
        callApi={ecBtnClick} 
        btnName={"Create EC2 credentials"} 
        info={"Creates credentials EC2 credentials. This call is optional deployments will probably have credentials set by the admin"}
      />
      <Dummy 
        callApi={uploadToscaButton} 
        btnName={"Upload Tosca"} 
        info={"Uploads and validates TOSCA template file. Depending on the type of CONF deployment CONF will have a set of pre-uploaded TOSCA templates"}
      />
      <Dummy 
        callApi={topoBtnClick} 
        btnName={"Find topolog template by ID"} 
        info={topologyTemplate}
      />
      <Dummy 
        callApi={planToscaBtn} 
        btnName={"PLAN tosca template"} 
        info={"Planns and returns the ID of the planed topolog template."}
      />
      <Dummy 
        callApi={planTopoBtn} 
        btnName={"Find planed topolog template by ID"} 
        info={"Returns a single topolog template."}
      />
      <Dummy 
        callApi={provisionToscaBtn} 
        btnName={"PROVISION tosca template"} 
        info={"Provosions the operationId: Plan Tosca Template Returns the provision ID."}
      />
      <Dummy 
        callApi={findProvisioned} 
        btnName={"Find provisioned topolog template by ID"} 
        info={"Returns a single topolog template."}
      />
      <Dummy 
        callApi={callDummyButton} 
        btnName={"Dummy API"} 
        info={"This is just for testing!"}
      />
  <h1 style={{display: isLoading ? "none" : "block"}}>Loading...</h1>
  <h1>{hasError && "Ops something went wrong!"}</h1>
    </div>
  )
}

export default memo(App)

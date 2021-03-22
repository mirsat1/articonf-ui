import React, { useContext, memo } from "react"
import Dummy from "../components/DummyApi"
import {Context} from "../Context"
import Loader from 'react-loader-spinner'
import JSONPretty from 'react-json-prettify'


function Dashboard() {
  const {
    topologyTemplate,
    plannedTopologyTemplate,
    provisionedToscaTemplate, 
    ecBtnClick, 
    uploadToscaButton, 
    topoBtnClick, 
    planTopoBtn, 
    findProvisioned, 
    callDummyButton,  
    isLoading,
    findDeleted,
    deleted
  } = useContext(Context)

  return (
    <div className="theBody" data-testid="dashPage">
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
        info={"Returns a single topology template."}
      />
      <Dummy 
        callApi={planTopoBtn} 
        btnName={"Find planed topolog template by ID"} 
        info={"Returns a single topolog template."}
      />
      <Dummy 
        callApi={findProvisioned} 
        btnName={"Find provisioned topolog template by ID"} 
        info={"Returns a single topolog template."}
      />
      <Dummy 
        callApi={findDeleted} 
        btnName={"Find deleted provision topology template"} 
        info={"Finds and returns a deleted provision topology template"}
      />
      <Dummy 
        callApi={callDummyButton} 
        btnName={"Dummy API"} 
        info={"This is just for testing!"}
      />
  <h1 style={{display: isLoading ? "block" : "none"}}>
    Please wait...
    <Loader
      type="Watch"
      color="#08335e"
      height={100}
      width={100}
    /></h1>
  <h5 style={{display: topologyTemplate ? "block" : "none"}} data-testid="topoTemplateID">Topology template: <JSONPretty json={topologyTemplate}/></h5>
  <h5 style={{display: plannedTopologyTemplate ? "block" : "none"}} data-testid="planTopoTemplateID">Planned topology template: <JSONPretty json={plannedTopologyTemplate}/></h5>
  <h5 style={{display: provisionedToscaTemplate ? "block" : "none"}} data-testid="provTopoTemplateID">Provisioned topology template: <JSONPretty json={provisionedToscaTemplate}/></h5>
  <h5 style={{display: deleted ? "block" : "none"}} data-testid="deletedProv">Provisioned topology template: <JSONPretty json={deleted}/></h5>
    </div>
  )
}

export default memo(Dashboard)
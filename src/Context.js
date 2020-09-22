import React, {useState, useEffect, useRef} from "react"
import https from "https"
import axios from "axios"
import YAML from "js-yaml"
import app from "./firebase"

import useTimer from "./hooks/useTimer"

const Context = React.createContext()
const CancelToken = axios.CancelToken

function ContextProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [topologyTemplate, setTopologyTemplate] = useState()
  const [plannedTopologyTemplate, setPlannedTopologyTemplate] = useState()
  const [plannedToscaTemplate, setPlannedToscaTemplate] = useState()
  const [provisionToscaTemplate, setProvisionToscaTemplate] = useState()
  const [provisionedToscaTemplate, setProvisionedToscaTemplate] = useState()
  const [deployedToscaId, setDeployedToscaId] = useState()
  const [message, setMessage] = useState("")
  const [deploymentLoading, setDeploymentLoading] = useState(false)
  const [isDeleted, setIsDeleted] = useState()
  const [deployment, setDeployment] = useState()
  const [deleted, setDeleted] = useState()
  
  const [timeRemaining, setIsTimeRemaining, isTimeRemaining] = useTimer()
  const id = '5f4e1092ebc9f217b66fa382'

  const cancelSource = useRef(null)
  
  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser)
  }, [])

  useEffect(() => {
    window.onbeforeunload = confirmExit;
    function confirmExit()
    {
      cancelSource.current.cancel()
      console.log("Canceling")
      return "show warning";
    }
  }, [])


  
  function ecBtnClick() {
  //   let myHeaders = new Headers()

  //   myHeaders.append("Content-Type", "application/json")
  //   myHeaders.append("Accept", "application/json")

  //   const raw = JSON.stringify({
  //     "cloud_provider_name": "EC2",
  //     "keys": 
  //       {
  //         "aws_access_key_id": "AKIAJBULTNDY65C4HAQQ"
  //       },  
  //     "token_type": "access_key", 
  //     "token": "Zl4FaeB0lLAm5MnMkLg5BJPCEr23wZpslWku+izu"
  //   })
    
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   }

  //   axios.post("credential", requestOptions)
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  alert('This UI is still in early development, so the EC2 credentials are created manualy by the server administrator')
}

function uploadToscaButton() {
  // let myHeaders = new Headers();
  // myHeaders.append("Content-Type", "multipart/form-data");

  // const formdata = new FormData();
  // formdata.append("file", "tosca.yaml");

  // const requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: formdata,
  //   redirect: 'follow'
  // };

  // axios.post("tosca_template", requestOptions)
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
  alert('This UI is still in early development, so the TOSCA file is manualy uploaded by the server administrator')
}

  // useEffect(() => {
  //   const requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };
    
  //   axios.get(`planner/plan/${id}`, requestOptions)
  //     .then(result => {
  //       console.log(result)
  //       setPlannedToscaTemplate(result.data)
  //       setIsLoading(false)
  //     })
  //     .catch(error => console.log('error', error))
  // }, [])

  // useEffect(() => {
  //   if(plannedToscaTemplate !== undefined) {
  //     const requestOptions = {
  //       method: 'GET',
  //       redirect: 'follow'
  //     };
  
  //     axios.get(`provisioner/provision/${plannedToscaTemplate}`, requestOptions)
  //       .then(result => {
  //         console.log(result)
  //         setProvisionToscaTemplate(result.data)
  //         setIsLoading(false)
  //       })
  //       .catch(error => console.log('error', error));
  //   }
  // }, [plannedToscaTemplate])

  function topoBtnClick() {
    setIsLoading(true) 
    let h = new Headers()
    h.append('Accept', 'text/plain')
    console.log("Headers: ", h)
    const agent = new https.Agent({  
      rejectUnauthorized: false
    })
    
    cancelSource.current = CancelToken.source()

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: h,
      mode: 'no-cors',
      insecure: true,
      httpsAgent: agent,
      strictSSL: false,
      cancelToken: cancelSource.current.token
    }

    axios.get(`tosca_template/${id}`, requestOptions)
      .then(result => {
        console.log(result)
        setTopologyTemplate(YAML.load(result.data))
        setIsLoading(false)
        setHasError(false)
      })
      .catch(error => {
        console.log(error)
        setHasError(true)
        setIsLoading(false)
      })
  }
  // console.log(topologyTemplate)

  function planToscaBtn() {
    setIsLoading(true)
    let h = new Headers()
    h.append('Accept', 'text/plain')
    cancelSource.current = CancelToken.source()

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: h,
      cancelToken: cancelSource.current.token
    };
    
    axios.get(`planner/plan/${id}`, requestOptions)
      .then(result => {
        console.log(result)
        setPlannedToscaTemplate(result.data)
        setMessage("Planning the CONF!")
        setIsLoading(false)
        setHasError(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        setHasError(true)
    });
  }

  // console.log("Planner: ", plannedToscaTemplate)

  function planTopoBtn() {
    setIsLoading(true)
    let h = new Headers()
    h.append('Accept', 'text/plain')
    cancelSource.current = CancelToken.source()
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: h,
      cancelToken: cancelSource.current.token
    };
    //${plannedToscaTemplate} => 5f60ad4e5695046700eed8bd
    axios.get(`tosca_template/${plannedToscaTemplate}`, requestOptions)
      .then(result => {
        console.log(result)
        setPlannedTopologyTemplate(result.data)
        setIsLoading(false)
        setHasError(false)
      })
      .catch(error => {
        console.log('error', error)
        setHasError(true)
        setIsLoading(false)
    });
  }
  // console.log(plannedTopologyTemplate)

  function provisionToscaBtn() {
    setIsLoading(true)
    let h = new Headers()
    h.append('Accept', 'text/plain')
    cancelSource.current = CancelToken.source()
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: h,
      cancelToken: cancelSource.current.token
    };
    //${plannedToscaTemplate} => 5f60ad4e5695046700eed8bd
    axios.get(`provisioner/provision/${plannedToscaTemplate}`, requestOptions)
      .then(result => {
        console.log(result)
        setProvisionToscaTemplate(result.data)
        setIsLoading(false)
        setHasError(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        setHasError(true)
    });
  }
  // console.log("Provisioner: ", provisionToscaTemplate)

  function findProvisioned() {
    setIsLoading(true)
    let h = new Headers()
    h.append('Accept', 'text/plain')
    cancelSource.current = CancelToken.source()
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: h,
      cancelToken: cancelSource.current.token
    };
    //${provisionToscaTemplate} => 5f60ad9a5695046700eed8be
    axios.get(`tosca_template/${provisionToscaTemplate}`, requestOptions)
      .then(result => {
        console.log(result)
        setProvisionedToscaTemplate(result.data)
        setIsLoading(false)
        setHasError(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        setHasError(true)
    });
  }

  function platformDeployer() {
    setDeploymentLoading(true)
    setIsTimeRemaining(true)

    cancelSource.current = CancelToken.source()
    const requestOptions = {
              method: 'GET',
              redirect: 'follow',
              cancelToken: cancelSource.current.token
          }
    // ${provisionToscaTemplate} => 5f60ad9a5695046700eed8be
    axios.get(`deployer/deploy/${provisionToscaTemplate}`, requestOptions)
      .then(result => {
          console.log(result)
          setDeployedToscaId(result.data)
          setMessage("OK")
          setIsTimeRemaining(false)
          setDeploymentLoading(false)
          setHasError(false)
      })
      .catch(error => {
          console.log('error', error)
          setMessage("Ops something went wrong! Please contact our developers by pressing the 'Contact Us' botton bellow this message, sorry for the inconvenience!")
          setDeploymentLoading(false)
          setIsTimeRemaining(false)
          setHasError(true)
          })
  }

  // console.log("Deployed ID: ", deployedToscaId)

  function findDeployed() {
    setIsLoading(true)
    let h = new Headers()
    h.append('Accept', 'text/plain')
    cancelSource.current = CancelToken.source()
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: h,
      cancelToken: cancelSource.current.token
    };
    // ${deployedToscaId} => 5f58a9a0a98b2f5fc6ca830f
    axios.get(`tosca_template/${deployedToscaId}`, requestOptions)
      .then(result => {
        console.log(result)
        setDeployment(YAML.load(result.data))
        setIsLoading(false)
        setHasError(false)
      })
      .catch(error => {
        console.log('error', error)
        setHasError(true)
        setIsLoading(false)
    });
  }

  // console.log("Deployment: ", deployment)

  function deleteProvision() {
    setIsLoading(true)
    let h = new Headers()
    h.append('Accept', 'text/plain')
    cancelSource.current = CancelToken.source()
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: h,
      cancelToken: cancelSource.current.token
    };

    //${provisionToscaTemplate} => 5f60ad9a5695046700eed8be
    
    axios.delete(`/tosca_template/${provisionToscaTemplate}`, requestOptions)
      .then(result => {
        console.log(result)
        setIsDeleted(result.data)
        setIsLoading(false)
        setHasError(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        setHasError(true)
    });
  }

  function findDeleted() {
    setIsLoading(true)
    let h = new Headers()
    h.append('Accept', 'text/plain')
    cancelSource.current = CancelToken.source()
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: h,
      cancelToken: cancelSource.current.token
    };

    //${isDeleted} => 5f634e6f23c5cb25e708a73c
    
    axios.get(`/tosca_template/${isDeleted}`, requestOptions)
      .then(result => {
        console.log(result)
        setDeleted(result.data)
        setIsLoading(false)
        setHasError(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        setHasError(true)
    });
  }

  function callDummyButton() {
    // setDeploymentLoading(true)
    // setIsTimeRemaining(false)
    // const proxyurl = "https://damp-coast-51800.herokuapp.com/"
    //   const url = "https://jsonplaceholder.typicode.com/todos"  
    //   axios.get(proxyurl + url)
    //       .then(result => console.log(result))
    //       .catch(error => console.log(error))
    alert('This is a dummy function used to test out things in development')
  }

  function cancelRequest() {
    alert("cancelling...");

    cancelSource.current.cancel();
  }

  function setPlanId(id) {
    setPlannedToscaTemplate(id)
  }

  function setProvisionId(id) {
    setProvisionToscaTemplate(id)
  }

  function setDeploymentId(id) {
    setDeployedToscaId(id)
  }

  function setDeletedId(id) {
    setIsDeleted(id)
  }

  function initialiseIds() {
    alert("This will erase all your ID's that you have obtained or entered!")
    setPlannedToscaTemplate(undefined)
    setProvisionToscaTemplate(undefined)
    setDeployedToscaId(undefined)
    setIsDeleted(undefined)
  }

  return (
    <Context.Provider value={{
      currentUser,
      topologyTemplate,
      plannedToscaTemplate,
      plannedTopologyTemplate,
      provisionToscaTemplate,
      provisionedToscaTemplate,
      ecBtnClick,
      uploadToscaButton,
      topoBtnClick,
      planToscaBtn,
      planTopoBtn,
      provisionToscaBtn,
      findProvisioned,
      callDummyButton,
      hasError,
      isLoading,
      deploymentLoading,
      platformDeployer,
      deployedToscaId,
      message,
      timeRemaining,
      isTimeRemaining,
      isDeleted,
      findDeployed,
      deployment,
      deleteProvision,
      cancelRequest,
      setPlanId,
      setProvisionId,
      setDeploymentId,
      setDeletedId,
      findDeleted,
      deleted,
      initialiseIds
    }}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}

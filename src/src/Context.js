import React, {useState, useEffect} from "react"
import https from "https"
import axios from "./axios-conf"

const Context = React.createContext()

function ContextProvider({children}) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [topologyTemplate, setTopologyTemplate] = useState()
  const [plannedTopologyTemplate, setPlannedTopologyTemplate] = useState()
  const [plannedToscaTemplate, setPlannedToscaTemplate] = useState()
  const [provisionToscaTemplate, setProvisionToscaTemplate] = useState()
  const id = '5f0db0811c771a706fc13d4c'
  
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

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    axios.get(`planner/plan/${id}`, requestOptions)
      .then(result => {
        console.log(result)
        setPlannedToscaTemplate(result.data)
        setIsLoading(false)
      })
      .catch(error => console.log('error', error))
  }, [])

  useEffect(() => {
    if(plannedToscaTemplate !== undefined) {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      axios.get(`provisioner/provision/${plannedToscaTemplate}`, requestOptions)
        .then(result => {
          console.log(result)
          setProvisionToscaTemplate(result.data)
          setIsLoading(false)
        })
        .catch(error => console.log('error', error));
    }
  }, [plannedToscaTemplate])

  function topoBtnClick() {
    let h = new Headers()
    h.append('Accept', 'text/plain')

    const agent = new https.Agent({  
      rejectUnauthorized: false
    })

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: h,
      mode: 'no-cors',
      insecure: true,
      httpsAgent: agent,
      strictSSL: false
    }

    axios.get(`tosca_template/${id}`, requestOptions)
      .then(result => {
        console.log(result)
        setTopologyTemplate(result.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setHasError(true)
      })
  }
  console.log(topologyTemplate)


  function planToscaBtn() {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    axios.get(`planner/plan/${id}`, requestOptions)
      .then(result => {
        console.log(result)
        setPlannedToscaTemplate(result.data)
        setIsLoading(false)
      })
      .catch(error => console.log('error', error));
  }

  console.log(plannedToscaTemplate)

  function planTopoBtn() {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    axios.get(`tosca_template/${plannedToscaTemplate}`, requestOptions)
      .then(result => {
        console.log(result)
        setPlannedTopologyTemplate(result.data)
        setIsLoading(false)
      })
      .catch(error => console.log('error', error));
  }
  console.log(plannedTopologyTemplate)

  function provisionToscaBtn() {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    axios.get(`provisioner/provision/${plannedToscaTemplate}`, requestOptions)
      .then(result => {
        console.log(result)
        setProvisionToscaTemplate(result.data)
        setIsLoading(false)
      })
      .catch(error => console.log('error', error));
  }
  console.log(provisionToscaTemplate)

  function findProvisioned() {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    axios.get(`tosca_template/${provisionToscaTemplate}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  function callDummyButton() {
    const proxyurl = "https://damp-coast-51800.herokuapp.com/"
      const url = "https://jsonplaceholder.typicode.com/todos"  
      axios.get(proxyurl + url)
          .then(result => console.log(result))
          .catch(error => console.log(error))
  }

  return (
    <Context.Provider value={{
      topologyTemplate,
      ecBtnClick,
      uploadToscaButton,
      topoBtnClick,
      planToscaBtn,
      planTopoBtn,
      provisionToscaBtn,
      findProvisioned,
      callDummyButton,
      hasError,
      isLoading
    }}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}

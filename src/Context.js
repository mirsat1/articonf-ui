import React, {useState, useEffect, useRef} from "react"
import https from "https"
import axios from "axios"
import smart from "./axios/axios-smart"
import YAML from "js-yaml"
import app from "./firebase"
import firebase from "firebase/app";
import "firebase/database";
// import axiosBase from "./axios/axios-base"

import useTimer from "./hooks/useTimer"

const Context = React.createContext()
const CancelToken = axios.CancelToken

function ContextProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [topologyTemplate, setTopologyTemplate] = useState()
  const [plannedTopologyTemplate, setPlannedTopologyTemplate] = useState()
  const [id, setId] = useState()
  const [role, setRole] = useState(null)
  const [plannedToscaTemplate, setPlannedToscaTemplate] = useState(null)
  const [provisionToscaTemplate, setProvisionToscaTemplate] = useState(null)
  const [provisionedToscaTemplate, setProvisionedToscaTemplate] = useState()
  const [deployedToscaId, setDeployedToscaId] = useState(null)
  const [message, setMessage] = useState("")
  const [deploymentLoading, setDeploymentLoading] = useState(false)
  const [isDeleted, setIsDeleted] = useState()
  const [deployment, setDeployment] = useState()
  const [deleted, setDeleted] = useState()
  const [name, setName] = useState()
  const [amountLayer, setAmountLayer] = useState()
  const defaultTicConfig = {
    "LOG_LEVEL": "INFO",
    "INSTALL_BANK_CHAINCODE": "y",
    "gluster_cluster_volume": "gfs0",
    "glusterd_version": "7",
    "org": {
        "name": "hlf",
        "unit": "bityoga"
    },
    "admin_user": "admin1",
    "admin_password": "admin1pw",
    "tlsca_user": "tlsca",
    "tlsca_password": "tlscapw",
    "orgca_user": "orgca",
    "orgca_password": "orgcapw",
    "orderer_user": "orderer",
    "orderer_password": "ordererpw",
    "peer1_user": "peer1",
    "peer1_password": "peer1pw",
    "peer2_user": "peer2",
    "peer2_password": "peer2pw",
    "couchdb_user": "couchdb",
    "couchdb_password": "couchdbpw",
    "hlf_explorer_db_user": "hppoc",
    "hlf_explorer_db_password": "password",
    "hlf_explorer_admin_user": "admin",
    "hlf_explorer_admin_password": "adminpw",
    "swarm_network": "hlfnet",
    "tlsca": {
        "switch": "on",
        "image": "hyperledger/fabric-ca",
        "tag": "1.4",
        "replicas": -1,
        "port": 8081,
        "path": "/root/{{tlsca_user}}",
        "db": "{{sqlite}}",
        "name": "{{tlsca_user}}",
        "password": "{{tlsca_password}}",
        "type": "tls"
    },
    "orgca": {
        "switch": "on",
        "image": "hyperledger/fabric-ca",
        "tag": "1.4",
        "replicas": -1,
        "port": 8052,
        "path": "/root/{{orgca_user}}",
        "db": "{{sqlite}}",
        "name": "{{orgca_user}}",
        "password": "{{orgca_password}}",
        "type": "org"
    },
    "orderer": {
        "switch": "on",
        "image": "hyperledger/fabric-orderer",
        "tag": "2.2",
        "replicas": -1,
        "port": 8053,
        "caname": "{{orgca.name}}",
        "anchorpeer": "{{peer1.name}}",
        "anchorport": "{{peer1.port}}",
        "path": "/root/{{orderer_user}}",
        "name": "{{orderer_user}}",
        "password": "{{orderer_password}}",
        "type": "orderer"
    },
    "peer1": {
        "switch": "on",
        "image": "hyperledger/fabric-peer",
        "tag": "2.2",
        "replicas": -1,
        "port": 8054,
        "caname": "{{orgca.name}}",
        "path": "/root/{{peer1_user}}",
        "bootstrap": "",
        "dbtype": "goleveldb",
        "name": "{{peer1_user}}",
        "password": "{{peer1_password}}",
        "type": "peer",
        "leader": "{peer1_user}}"
    },
    "peer2": {
        "switch": "on",
        "image": "hyperledger/fabric-peer",
        "tag": "2.2",
        "replicas": -1,
        "port": 8055,
        "caname": "{{orgca.name}}",
        "path": "/root/{{peer2_user}}",
        "bootstrap": "{{peer1.name}}:7051",
        "dbtype": "CouchDB",
        "name": "{{peer2_user}}",
        "password": "{{peer2_password}}",
        "type": "peer",
        "leader": "{{peer1_user}}"
    },
    "cli": {
        "switch": "on",
        "image": "hyperledger/fabric-tools",
        "tag": "2.2"
    },
    "sqlite": {
        "type": "sqlite3",
        "source": "fabric-ca-server.db"
    },
    "couchdb": {
        "switch": "on",
        "image": "couchdb",
        "tag": "2.3",
        "replicas": -1,
        "path": "/opt/couchdb/data",
        "name": "{{couchdb_user}}",
        "password": "{{couchdb_password}}"
    },
    "hlf_explorer_db": {
        "image": "hyperledger/explorer-db",
        "tag": "1.1.2",
        "name": "hlf_explorer_db",
        "replicas": -1,
        "db_name": "fabricexplorer",
        "db_user_name": "{{hlf_explorer_db_user}}",
        "db_password": "{{hlf_explorer_db_password}}",
        "port": 5432,
        "switch": "on",
        "volume": "pgdata"
    },
    "hlf_explorer": {
        "image": "hyperledger/explorer",
        "tag": "1.1.2",
        "name": "hlf_explorer",
        "admin_user": "{{hlf_explorer_admin_user}}",
        "admin_password": "{{hlf_explorer_admin_password}}",
        "replicas": -1,
        "port": 8090,
        "switch": "on",
        "volume": "walletstore"
    },
    "swarm_visualizer": {
        "image": "dockersamples/visualizer",
        "tag": "latest",
        "name": "swarm_visualizer",
        "replicas": -1,
        "port": 9090,
        "switch": "on"
    },
    "portainer": {
        "image": "portainer/portainer",
        "tag": "latest",
        "name": "portainer",
        "replicas": -1,
        "port": 9000,
        "switch": "on"
    },
    "portainer_agent": {
        "image": "portainer/agent",
        "tag": "latest",
        "name": "portainer_agent",
        "port": 9001,
        "switch": "on"
    },
    "bank_app": {
        "git_repository": "https://github.com/bityoga/articonf-bank-app.git",
        "image": "bank-app",
        "tag": "latest",
        "name": "bank-service",
        "replicas": -1,
        "port": 3000,
        "switch": "on"
    },
    "services": [
        "{{caservices}}",
        "{{orderer}}",
        "{{peerservices}}",
        "{{explorerservices}}",
        "{{vizservices}}"
    ],
    "caservices": [
        "{{tlsca}}",
        "{{orgca}}"
    ],
    "peerservices": [
        "{{peer1}}",
        "{{peer2}}"
    ],
    "explorerservices": [
        "{{hlf_explorer_db}}",
        "{{hlf_explorer}}"
    ],
    "vizservices": [
        "{{swarm_visualizer}}",
        "{{portainer}}",
        "{{portainer_agent}}"
    ]
}
  
  const [timeRemaining, setIsTimeRemaining, isTimeRemaining] = useTimer()
  // const id = '60212a66b686da5a629a3a81'
  // const id = '6064640a312f41474c28bdea'

  const cancelSource = useRef(null)
  
  const user = app.auth().currentUser;
  const userUID = user && user.uid;
  const userEmail = user && user.email

  const usersRef = firebase.database().ref("users/" + userUID + "/");
  const usersProfileIDsRef = firebase.database().ref("user_profile/" + userUID + "/IDs");
  userUID && usersRef.onDisconnect().remove()
  
  useEffect(() => {
    if (currentUser) {
      axios.get(`https://articonf2.firebaseio.com/user_profile/${userUID}/IDs.json`)
        .then(res => {
          if (res.data) {
            if(res.data.toscaID) setId(res.data.toscaID);
            if(res.data.planID) setPlannedToscaTemplate(res.data.planID);
            if(res.data.provisionID) setProvisionToscaTemplate(res.data.provisionID);
            if(res.data.deploymentID) setDeployedToscaId(res.data.deploymentID);
            console.log("response", res)
          }
        })
        .catch(err => console.log(err))
      
      axios.get(`https://articonf2.firebaseio.com/user_profile/${userUID}/role.json`)
        .then(res => {
          if(res.data) setRole(res.data)
        })
        .catch(err => console.log(err))

      firebase.database().ref('users/' + userUID + '/IDs').set({
        email: userEmail
      })

      if (id){
        firebase.database().ref('user_profile/' + userUID + '/IDs').update({
          toscaID: id
        })
      }
      if (plannedToscaTemplate){
        firebase.database().ref('user_profile/' + userUID + '/IDs').update({
          planID: plannedToscaTemplate
        })
      }
      if (provisionToscaTemplate){
        firebase.database().ref('user_profile/' + userUID + '/IDs').update({
          provisionID: provisionToscaTemplate
        })
      }
      if (deployedToscaId){
        firebase.database().ref('user_profile/' + userUID + '/IDs').update({
          deploymentID: deployedToscaId
        })
      }
      if (role){
        firebase.database().ref('user_profile/' + userUID).update({
          role: role
        })
      }
    }
    // console.log("role: ", role)
    if (!currentUser) {
      setId(null)
      setPlannedToscaTemplate(null);
      setProvisionToscaTemplate(null);
      setDeployedToscaId(null);
    }
  }, [currentUser, userUID, userEmail, id, plannedToscaTemplate, provisionToscaTemplate, deployedToscaId, role])


  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser)
    cancelSource.current = CancelToken.source()
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      cancelSource.current.cancel()
      console.log("Canceling all requests to the server!");
      (e || window.event).returnValue = null;
      return null;
    })
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

function uploadToscaButton(tosca) {
  const formData = new FormData();
  formData.append('file', new Blob([tosca], {type:"application/octet-stream"}))
  axios({
    method: "post",
    url: "tosca_template",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      setId(response.data)
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      alert(response);
    });
  console.log(formData.get('file'))
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
        setTopologyTemplate(YAML.load(result.data))
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        alert(error)
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
        setPlannedToscaTemplate(result.data)
        setMessage("Planning the CONF!")
        setIsLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        alert(error)
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
        setPlannedTopologyTemplate(result.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        alert(error)
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
        setProvisionToscaTemplate(result.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        alert(error)
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
        setProvisionedToscaTemplate(result.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        alert(error)
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
          setDeployedToscaId(result.data)
          setMessage("OK")
          setIsTimeRemaining(false)
          setDeploymentLoading(false)
      })
      .catch(error => {
          console.log('error', error)
          setMessage("Ops something went wrong! Please contact our developers by pressing the 'Contact Us' botton bellow this message, sorry for the inconvenience!")
          setDeploymentLoading(false)
          setIsTimeRemaining(false)
          alert(error)
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
        setDeployment(YAML.load(result.data))
        setIsLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        alert(error)
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
        setIsDeleted(result.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        alert(error)
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
        setDeleted(result.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        alert(error)
    });
  }

  function getAmountLayer(){
    setIsLoading(true)
    cancelSource.current = CancelToken.source()
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      cancelToken: cancelSource.current.token
    }
    smart.get('Amount_Layer/clusters', requestOptions)
      .then(reslut => {
        setIsLoading(false)
        setAmountLayer(reslut.data)
        console.log(reslut.data)
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
      })
  }
  // console.log(amountLayer)

  function callDummyButton() {
    // setDeploymentLoading(true)
    // setIsTimeRemaining(false)
    // const proxyurl = "https://damp-coast-51800.herokuapp.com/"
    //   const url = "https://jsonplaceholder.typicode.com/todos"  
    //   axios.get(proxyurl + url)
    //       .then(result => console.log(result))
    //       .catch(error => console.log(error))
    // alert('This is a dummy function used to test out things in development')
    // const userId = "123"
    // firebase.database().ref('users/' + userId).set({
    //   username: "Mirsat",
    //   email: "email"
    // });

  }

  function cancelRequest() {
    console.log("cancelling...");

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

  function setToscaId(id) {
    setId(id)
  }

  function setUpRole(role) {
    setRole(role)
  }

  function initialiseIds() {
    alert("This will erase all your ID's that you have obtained or entered!")
    setId(null)
    setPlannedToscaTemplate(null)
    setProvisionToscaTemplate(null)
    setDeployedToscaId(null)
    setIsDeleted(null)
    userUID && usersProfileIDsRef.remove()
  }

  function initialiseIdsOnSignOut() {
    setId(null)
    setPlannedToscaTemplate(null)
    setProvisionToscaTemplate(null)
    setDeployedToscaId(null)
    setIsDeleted(null)
    setRole(null) 
  }

  // console.log("User signed out and the ui initialised all ID states", plannedToscaTemplate)

  function setUserName(username) {
    setName(username)
  }

//   function saveIds() {
//     const ids = {
//         name: name,
//         planId: plannedToscaTemplate,
//         provisionId: provisionedToscaTemplate,
//         deploymentId: deployedToscaId,
//         deleptedId: isDeleted
//     }
//     axiosBase.post(`/ids.json`, ids)
//         .then(response => console.log(response))
//         .catch(error => console.log(error))
// }
  // function getIds() {
  //   db.collection('articonf2')
  //     .get()
  //     .then(response => console.log(response))
  // }

  return (
    <Context.Provider value={{
      currentUser,
      usersRef,
      topologyTemplate,
      id,
      role,
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
      setToscaId,
      setUpRole,
      findDeleted,
      deleted,
      initialiseIds,
      initialiseIdsOnSignOut,
      setUserName,
      name,
      amountLayer,
      getAmountLayer,
      userEmail,
      userUID,
      defaultTicConfig
    }}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}

import React, { useContext } from 'react'
import {Context} from "../Context"
import Iframe from "react-iframe"
// import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function TokenBank() {
    const { role } = useContext(Context)
     
    return (
        <div className="theBody">
            <div>
                {role === "UCprovider1" && <div>
                    <h3>Crowd journaism dashboard</h3>
                    <iframe title="Crowd journaism dashboard" src="http://15.237.93.29:8081/app/kibana#/dashboard/d5bf87a0-9619-11eb-a973-9fcac1df1055?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-60y%2Cto%3Anow))" height="2850px" width="100%" frameBorder="0"></iframe>
                    </div>}
                {role === "UCprovider2" && <div>
                    <h3>Smart energy dashboard</h3>
                    <iframe title="Smart energy dashboard" src="http://15.237.93.29:8081/app/kibana#/dashboard/3951e850-4ab4-11eb-b59a-fbbddab9db15?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-50y%2Cto%3Anow))" height="3250pxpx" width="100%" frameBorder="0"></iframe>
                </div>}
                {role === "UCprovider3" && <div>
                    <h3>Video opinion dashboard</h3>
                    <h1>Work in progress!</h1>
                </div>}
                {role === "UCprovider4" && <div>
                    <h3>Car sharing dashboard</h3>
                    <iframe title="Car sharing dashboard" src="http://15.237.93.29:8081/app/kibana#/dashboard/b14f20c0-0b9f-11ea-8ebf-8b2b7561e1cf?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3A'2017-12-18T23%3A04%3A15.118Z'%2Cto%3A'2019-12-07T17%3A57%3A09.921Z'))" height="5180px" width="100%" frameBorder="0"></iframe>
                </div>}
                {(role !== "UCprovider1" && role !== "UCprovider2" && role !== "UCprovider3" && role !== "UCprovider4") && <div>
                        <h3>Token bank dashboard:</h3><br />
                        <Iframe src="http://15.237.93.29:8081/app/kibana#/dashboard/2a8485d0-3bf0-11eb-b59a-fbbddab9db15?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3A'2019-12-31T04%3A16%3A47.619Z'%2Cto%3A'2020-10-25T09%3A32%3A04.809Z'))" height="2100px" width="100%" frameBorder="0"></Iframe>
                    </div>}
            </div>
        </div>
    )
}

export default TokenBank
// function TokenBank() {
//     const [user, setUser] = useState({userName: "", tokens: 100})
//     const [fromUser, setFromUser] = useState()
//     const [toUser, setToUser] = useState()
//     const [tokenAmount, setTokenAmount] = useState()

//     const [show, toggle] = useToggler()

//     function handleChange(event) {
//         const {name, value} = event.target
//         setUser(prevInputData => ({...prevInputData, [name]: value}))
//     }

//     function transferTokens() {
        
//         // setUser(prev => ({...prev, tokens: prev.tokens - tokenAmount}))
//         setUser(prevTo => {
//             if(prevTo.userName === toUser) {
//                 return {...prevTo, tokens: prevTo.tokens + tokenAmount}
//             }
//             return {...prevTo, tokens: prevTo.tokens - tokenAmount}
//         })
//     }
    
//     return (
//        <div className="theBody" style={{textAlign: "center"}}>
//            <Header as='h1'>Please use the token bank ONLY IF you have deployed the platform.</Header>
//            <div className="bank">               
//                 <Form>
//                     <Label as='a' image>
//                         <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' alt=""/>
//                         {user.userName ? user.userName : "Registered User Name"}
//                     </Label><br />
//                     <Header as="h3">
//                         <Icon name="euro sign"/>
//                         Token amount: {user.userName && (show && user.tokens)}
//                     </Header>
//                     <Form.Field>
//                         <input type='text' placeholder='User Name' name="userName" value={user.userName} onChange={handleChange}/>
//                         <Label pointing>Please enter your User Name</Label>
//                     </Form.Field>
//                     <Button onClick={toggle}>Check Balance</Button>
//                     <Header as="h3">
//                         Transfer Amount: {tokenAmount}
//                         {tokenAmount && <Icon name="bitcoin" />}
//                     </Header>
//                     <Header as="h3">
//                         {fromUser} <Icon name="forward" size="big"/>{toUser}
//                     </Header>
//                     <Form.Group widths='equal'>
//                         <Form.Input
//                             placeholder='From'
//                             onChange={e => setFromUser(e.target.value)}
//                         />
//                         <Form.Input
//                             placeholder='To'
//                             onChange={e => setToUser(e.target.value)}
//                         />
//                     </Form.Group>
//                     <Form.Field>
//                         <input type='number' placeholder='Amount' onChange={e => setTokenAmount(e.target.value)}/>
//                         <Label pointing>Please enter the amount of tokens you want to transfer</Label>
//                     </Form.Field>
//                     <Button onClick={transferTokens}>Transfer</Button>
//                 </Form>
//             </div>
//        </div> 
//     )
// }

// export default TokenBank
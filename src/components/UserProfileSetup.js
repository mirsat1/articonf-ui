import React, { useState } from 'react'
import app from '../firebase'
import { Form, Button, Modal, Message, Dimmer, Loader, Segment, Label, Divider, Header, Icon } from 'semantic-ui-react'
import firebase from 'firebase'

export default function UserProfileSetup(props) {
    const [open, setOpen] = useState(false)
    const [userEmail, setUserEmail] = useState(null)
    const [userPassword, setUserPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [userDisplayName, setUserDisplayName] = useState(null)
    const [userPhotoURL, setUserPhotoURL] = useState(null)
    const [hasError, setHasError] = useState({isError: false, errorMessage: null})
    const [isLoading, setIsLoading] = useState(false)
    const [verifyEmail, setVerifyEmail] = useState(null)
    const [cursor, setCursor] = useState("arrow")

    const user = app.auth().currentUser

    function updateUserName() {
        setIsLoading(true)
        setHasError({...hasError, isError:false})
        userDisplayName && user.updateProfile({
            displayName: userDisplayName
          }).then(() => {
            setIsLoading(false)
            setHasError({...hasError, isError:false})
            console.log("updated name successfully")
          }).catch((error) => {
            setIsLoading(false)
            setHasError({isError: true, errorMessage: error.message})
            console.log(error)
          });
    }

    function updateUserPhoto() {
        setIsLoading(true)
        setHasError({...hasError, isError:false})  
        userPhotoURL && user.updateProfile({
            photoURL: userPhotoURL
            }).then(() => {
                setIsLoading(false)
                setHasError({...hasError, isError:false})
                console.log("updated user photo successfully")
            }).catch((error) => {
                setIsLoading(false)
                setHasError({isError: true, errorMessage: error.message})
                console.log(error)
            }); 
    }

    function emailUpdate() {
        setIsLoading(true)
        setHasError({...hasError, isError:false})
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email, 
            userPassword
        );
        user.reauthenticateWithCredential(credential).then(() => {
            console.log("Re-aut success")
            user.updateEmail(userEmail).then(() => {
                setIsLoading(false)
                setHasError({...hasError, isError:false})
                setOpen(false)
                console.log("Changed success")
              }).catch((error) => {
                setIsLoading(false)
                setHasError({isError: true, errorMessage: error.message})
                console.log("Email error: ", error)
              });
          }).catch((error) => {
                setIsLoading(false)
                setHasError({isError: true, errorMessage: error.message})
                console.log("Re-auth", error)
          });
        
    }

    function changePassword() {
        setIsLoading(true)
        setHasError({...hasError, isError:false})
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email, 
            userPassword
        );
        user.reauthenticateWithCredential(credential).then(() => {
            console.log("Re-aut success")
            user.updatePassword(newPassword).then(() => {
                setIsLoading(false)
                setHasError({...hasError, isError:false})
                setOpen(false)
                console.log("Changed password")
              }).catch((error) => {
                setIsLoading(false)
                setHasError({isError: true, errorMessage: error.message})
                console.log("Passwod change error: ", error)
              });
          }).catch((error) => {
                setIsLoading(false)
                setHasError({isError: true, errorMessage: error.message})
                console.log("Re-auth", error)
          });
        
    }

    function emailVerification() {
        setIsLoading(true)
        setHasError({...hasError, isError:false})
        if (user.emailVerified) {
            setIsLoading(false)
            setHasError({...hasError, isError:true, errorMessage: "Email already verified!"})
            setVerifyEmail("Email already verified!")
        } else {
            app.auth().currentUser.sendEmailVerification()
                .then(() => {
                    setIsLoading(false)
                    setHasError({...hasError, isError:false})
                    setVerifyEmail("Email verification sent!")
                });
        }
    }

    return (
        <div>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='user' />
                    User profile setup
                </Header>
            </Divider>
            {isLoading && <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>}
                <Button onClick={props.toggle} floated="right" circular icon="close" color="red"/><br /><br />
            <div>
                <Segment>
                <Label attached='top'>Change username</Label>
                <Form onSubmit={updateUserName}>
                    <input style={{marginBottom: '0.5em'}} onChange={e => setUserDisplayName(e.target.value)} placeholder="Enter your username"/>
                    <Button type="submit">Update</Button>
                </Form>
                </Segment>
                <Segment>
                <Label attached='top'>Change photo</Label>
                <Form onSubmit={updateUserPhoto}>
                    <input style={{marginBottom: '0.5em'}} onChange={e => setUserPhotoURL(e.target.value)} placeholder="Enter your photo url"/>
                    <Button type="submit">Update</Button>
                </Form>
                </Segment>
                <Segment>
                    <Header as="a" style={{cursor: cursor, marginRight: "0.4em"}} onMouseEnter={() => setCursor("pointer")} onMouseLeave={() => setCursor("arrow")} onClick={emailVerification}>
                        <Icon.Group size="huge">
                            <Icon name='mail'/>
                            <Icon corner color="teal" name='check'/>
                        </Icon.Group>
                        Verify email
                    </Header>
                </Segment>
                <p>{verifyEmail}</p>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                        <Segment>
                            <Header as="a" style={{cursor: cursor, marginRight: "0.4em"}} onMouseEnter={() => setCursor("pointer")} onMouseLeave={() => setCursor("arrow")}>
                                <Icon.Group size="huge">
                                    <Icon name='mail'/>
                                    <Icon corner color="teal" name='refresh'/>
                                </Icon.Group>
                                Change email
                            </Header>
                        </Segment>
                        }
                >
                <Modal.Header>Change email</Modal.Header>
                        <Modal.Content scrolling>
                        <Modal.Description>
                            Change your email address
                        </Modal.Description>
                        <Form onSubmit={emailUpdate} autoComplete="nope">
                            <input style={{marginBottom: '0.5em'}} onChange={e => setUserEmail(e.target.value)} type="email" placeholder="Enter your email"/>
                            <input style={{marginBottom: '0.5em'}} onChange={e => setUserPassword(e.target.value)} type="password" placeholder="Enter your password"/>
                        </Form>
                        {hasError.isError && <Message color="red">{hasError.errorMessage}</Message>}
                        {isLoading && <Dimmer active>
                            <Loader size='massive'>Loading</Loader>
                        </Dimmer>}
                        </Modal.Content>
                        <Modal.Actions>
                        <Button
                            content="OK"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={emailUpdate}
                            positive
                        />
                        <Button
                            content="Cancel"
                            labelPosition='right'
                            icon='cancel'
                            onClick={() => setOpen(false)}
                            negative
                        />
                        </Modal.Actions>
                </Modal>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                        <Segment>
                            <Header as="a" style={{cursor: cursor}} onMouseEnter={() => setCursor("pointer")} onMouseLeave={() => setCursor("arrow")}>
                                <Icon.Group size="huge">
                                    <Icon name='key'/>
                                    <Icon corner color="teal" name='refresh'/>
                                </Icon.Group>
                                Change password
                            </Header>
                        </Segment>
                    }
                >
                <Modal.Header>Change password</Modal.Header>
                        <Modal.Content scrolling>
                        <Modal.Description>
                            Change your password
                        </Modal.Description>
                        <Form onSubmit={changePassword} autoComplete="nope">
                            <input style={{marginBottom: '0.5em'}} onChange={e => setUserEmail(e.target.value)} type="email" placeholder="Enter your email"/>
                            <input style={{marginBottom: '0.5em'}} onChange={e => setUserPassword(e.target.value)} type="password" placeholder="Old password"/>
                            <input style={{marginBottom: '0.5em'}} onChange={e => setNewPassword(e.target.value)} type="password" placeholder="New password"/>
                        </Form>
                        {hasError.isError && <Message color="red">{hasError.errorMessage}</Message>}
                        {isLoading && <Dimmer active>
                            <Loader size='massive'>Loading</Loader>
                        </Dimmer>}
                        </Modal.Content>
                        <Modal.Actions>
                        <Button
                            content="OK"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={changePassword}
                            positive
                        />
                        <Button
                            content="Cancel"
                            labelPosition='right'
                            icon='cancel'
                            onClick={() => setOpen(false)}
                            negative
                        />
                        </Modal.Actions>
                </Modal>
            </div>
        </div>
    )
}
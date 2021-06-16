import React, { useState } from 'react'
import app from '../firebase'
import { Form, Button, Message, Dimmer, Loader, Icon } from 'semantic-ui-react'

export default function ResetPassword() {
    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const [emailErrorm, setEmailError] = useState({hasError: false, errorMessage: ""})
    const [isLoading, setIsLoading] = useState(false)
    
    function resetPassword() {
        setIsLoading(true)
        setEmailError({...emailErrorm, hasError:false})
        app.auth().sendPasswordResetEmail(email)
            .then(res => {
                setIsLoading(false)
                setEmailError({...emailErrorm, hasError:false})
                setEmailSent(true)
            })
            .catch(err => {
                setIsLoading(false)
                setEmailError({hasError: true, errorMessage: err.message})
                setEmailSent(false)
            })

    }

    return (
        <div>
            {isLoading && <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>}
            <div className="login-form">
                <Form onSubmit={resetPassword}>
                    <Form.Field>
                        <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
                    </Form.Field>
                    <Button type="submit">Reset password</Button>
                </Form>
                {emailSent && <Message positive>
                    <Message.Header>Reset password email sent to the entered email address!</Message.Header>
                </Message>}
                {emailErrorm.hasError && <Message warning attached='bottom'><Icon name='warning' />{emailErrorm.errorMessage}</Message>}
            </div>
        </div>
    )
}


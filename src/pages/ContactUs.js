import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Button, Form, Label, Icon } from "semantic-ui-react";


export default function ContactUs() {
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  function sendEmail(e) {
    e.preventDefault();
    setIsLoading(true)
    emailjs.sendForm('gmail', 'contact_form', e.target, 'user_ngGaDPIoYOmfyhxEzDTPE')
      .then((result) => {
          console.log(result.text);
          setStatus("OK")
          setIsLoading(false)
      }, (error) => {
          console.log(error.text);
          setHasError(true)
      });
      e.target.reset();
  }

  return (
    <div className="theBody">
      <h1 style={{textAlign: "center"}}>Contact us by filling out the form below.</h1>
      <div className="login-form">
        <Form onSubmit={sendEmail}>
          <Form.Field>
            <input type="hidden" name="contact_number" />
          </Form.Field>
          <Form.Field>
            <input name="user_name" placeholder="What is your name?" required />
            <Label pointing>Please enter your full name</Label>
          </Form.Field>
          <Form.Field>
            <input name="user_email" placeholder="What is your email?" type="email" required />
            <Label pointing>Please enter your email</Label>
          </Form.Field>
          <Form.Field>
            <textarea rows="4" cols="50" name="message" placeholder="Please enter your message" required></textarea>
            <Label pointing>Please enter your message here</Label>
          </Form.Field>
          <div style={{textAlign: "center"}}><Button icon className="btncontactus" name="submit" type="submit" labelPosition="right">Send<Icon name="paper plane"/></Button></div>
        {/*<input name="submit" className="contactInput btn" type="submit" value="Send" />*/}
        </Form>
      </div>
      
      <h1 style={{textAlign: "center"}}>{status === "OK" && "We recived your email. Thank you for your feedback!"}</h1>
      <h1 style={{textAlign: "center"}}>{isLoading && "Sending..."}</h1>
      <h1 style={{textAlign: "center"}}>{hasError && "Something went wrong! We didn't recived your email. Please try again"}</h1>
    </div>
  );
}
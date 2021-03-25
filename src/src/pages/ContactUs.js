import React, { useState } from 'react';
import emailjs from 'emailjs-com';


export default function ContactUs() {
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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
      });
  }

  return (
    <div className="theBody">
      <form onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        <input name="user_name" placeholder="What is your name?" className="name" required />
        <input name="user_email" placeholder="What is your email?" className="email" type="email" required />
        <textarea rows="4" cols="50" name="message" placeholder="Please enter your message" className="message" required></textarea>
        <input name="submit" className="btn" type="submit" value="Send" />
      </form>
      <h1 style={{textAlign: "center"}}>{status === "OK" && "We recived your email. Thank you for your feedback!"}</h1>
      <h1 style={{textAlign: "center"}}>{isLoading && "Sending..."}</h1>
    </div>
  );
}
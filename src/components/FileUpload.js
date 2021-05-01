import React, { useContext, useState } from 'react'
import { Context } from '../Context'
import axios from 'axios'
import { Segment, Button } from 'semantic-ui-react'

export default function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null)

    const { setToscaId } = useContext(Context)

    function onFileChange(event) {
        setSelectedFile(event.target.files[0])
    }

    function onFileUpload() {

        const formData = new FormData()

        formData.append(
            'file',
            selectedFile,
            selectedFile.name
        )
        axios({
            method: "post",
            url: "tosca_template",
            data: formData,
            headers: { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS" },
          })
            .then(function (response) {
                setToscaId(response.data)
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              alert(response);
            })
    }

    function fileData() {
        if(selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {selectedFile.name}</p>           
                    <p>File Type: {selectedFile.type}</p>            
                    <p>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate && selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            )
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            )
        }
    }
    return (
        <Segment>
            <h3>
              Upload TOSCA file from your machine
            </h3>
            <Segment>
                <input type="file" onChange={onFileChange} />
                <Button onClick={onFileUpload} disabled={!selectedFile}>
                  Upload!
                </Button>
            </Segment>
          {fileData()}
        </Segment>
    )
}
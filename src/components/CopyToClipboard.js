import React, { useState, useRef } from 'react'
import { Input } from 'semantic-ui-react'

function CopyToClipboard(props) {
    const [copySuccess, setCopySuccess] = useState('')
    const textAreaRef = useRef(null)

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');
      };

      return(
        <div style={{marginTop: "0.2em"}}>
            <Input
                size='huge'
                action={{
                color: 'teal',
                labelPosition: 'right',
                icon: 'copy',
                content: `Copy ${props.name}`,
                onClick: copyToClipboard
                }}
                ref={textAreaRef}
                value={props.inputValue}
            /><p>{copySuccess}</p><br />
        </div>
      )
}

export default CopyToClipboard
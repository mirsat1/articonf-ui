import { useState } from 'react'

export default function useRequestInfo() {
    const [requestInfo, setRequestInfo] = useState("")

    const onSucces = (text) => {
        setRequestInfo(`${text}`)
    }

    return [requestInfo, onSucces]
}
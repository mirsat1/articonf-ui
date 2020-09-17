import {useState, useEffect} from "react"

function useTimer(defaultValue = 0, defaultOnValue = false) {
const [timeRemaining, setTimeRemaining] = useState(defaultValue)
const [isTimeRemaining, setIsTimeRemaining] = useState(defaultOnValue)

function endCounter() {
    setIsTimeRemaining(false)
}

useEffect(() =>{
    if(isTimeRemaining) {
        setTimeout(() => {
            setTimeRemaining(time => time + 1)
        }, 1000)
    } else(endCounter())
}, [timeRemaining, isTimeRemaining])

return [timeRemaining, setIsTimeRemaining, isTimeRemaining]
  // return (
  //   <div className="time">
  //   This may take up to 15 minutes, please wait until the server deployes the platform! Thank you!<br />
  //   {Math.floor(timeRemaining / 60)}:{timeRemaining - minutes * 60}
  //   </div>
  // )
}

export default useTimer;
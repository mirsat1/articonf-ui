import axios from "axios"

const instance = axios.create({
    baseURL: "http://fry.lab.uvalight.net:30000/manager/",
})

export default instance
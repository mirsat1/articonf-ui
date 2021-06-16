import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://15.237.93.29:8082/'
})

export default instance
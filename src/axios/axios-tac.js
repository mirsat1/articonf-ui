import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://15.237.93.29:8082/'
    baseURL: 'http://localhost:9200/'
})

export default instance
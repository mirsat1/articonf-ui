import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://articonf2.firebaseio.com/'
})

export default instance
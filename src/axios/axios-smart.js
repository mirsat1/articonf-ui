import axios from "axios"

const instance = axios.create({
    baseURL: "https://articonf1.itec.aau.at:30103/api/bank-app/bank-app/layers/",
    headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlZ3VsYXJAaXRlYy5hYXUuYXQiLCJjcmVhdGVkX2F0IjoiMjAyMC0xMi0xMCAxNjoxMjo1Ny43NjA0NDIiLCJ2YWxpZF91bnRpbCI6IjIwMjAtMTItMTEgMTY6MTI6NTcuNzYwNDQyIn0.8qPqlu1casMZy4xDPcPBfCui4c-5FP-mWDPdAQHAzRQ"
    }
})

export default instance
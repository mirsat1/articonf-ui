import axios from "axios"

const instance = axios.create({
    baseURL: "https://articonf1.itec.aau.at:30401/api/",
    headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlZ3VsYXJAaXRlYy5hYXUuYXQiLCJjcmVhdGVkX2F0IjoiMjAyMC0wOS0zMCAxMjowMToyOS43OTAwNTciLCJ2YWxpZF91bnRpbCI6IjIwMjAtMTAtMDEgMTI6MDE6MjkuNzkwMDU3In0.sQ7cXpXng8HvYDYycRKfl3Xauzl5y93wtZdspDyxwbQ"
    }
})

export default instance
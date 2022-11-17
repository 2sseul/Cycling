import axios from 'axios'

const http = axios.create({
    baseURL: "http://localhost:9999",
    headers: {"content-type": "application/json"},
})

http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"

export default http
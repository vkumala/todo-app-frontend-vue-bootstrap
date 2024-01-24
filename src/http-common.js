import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: false,
  headers: {

    'Content-type': 'application/json'
  }
})

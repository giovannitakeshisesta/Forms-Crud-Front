import axios from 'axios'

const createHttp = () => {
  const http = axios.create({
    baseURL: 'http://localhost:3002/api'
  })

  return http
}

export default createHttp
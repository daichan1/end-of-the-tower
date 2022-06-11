import axios from 'axios'
import axiosRetry from 'axios-retry'

const axiosClient = axios.create({ baseURL: process.env.REACT_APP_API_URL_BROWSER })
axiosRetry(axiosClient, { retries: 3 })

export default axiosClient

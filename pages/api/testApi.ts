import axios from 'axios'

const testApi = () => {
  return axios.create({
    baseURL: `https://lab.cuental.com/api/v1/`,
  })
}

export default testApi
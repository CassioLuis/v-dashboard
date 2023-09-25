import axios from 'axios'

const url = 'http://localhost:3000'

export default class User {
  static async add (body: Object) {
    try {
      return await axios.post(`${url}/user`, body)
    } catch (error: any) {
      return { error: error.response.data }
    }
  }
}
import axios from 'axios'
import type LoginContract from './interfaces/auth'

const url = 'https://player-api-z98a.onrender.com/'
// const url = 'http://localhost:3000/'

export default class User {
  static async login(login: LoginContract): Promise<any> {
    try {
      const response = await axios.post(`${url}auth`, login)
      return response
    }
    catch ({ response }: any) {
      return response
    }
  }
}

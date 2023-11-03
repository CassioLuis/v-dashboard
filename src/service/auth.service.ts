import axios from 'axios'
import type { ILogin } from '../interfaces'
import url from './url'

export default class User {
  static async login(login: ILogin): Promise<any> {
    try {
      const response = await axios.post(`${url}auth`, login)
      return response
    }
    catch ({ response }: any) {
      return response
    }
  }

  static async forgot(payload: object): Promise<any> {
    try {
      const response = await axios.post(`${url}auth/forgot`, payload)
      return response
    }
    catch ({ response }: any) {
      return response
    }
  }
}

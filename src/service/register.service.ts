import axios from 'axios'
import { url } from './url'

export default class User {
  static async add(body: any) {
    try {
      const response = await axios.post(`${url}user`, body)
      return response
    }
    catch (error: any) {
      return { message: error.response.data }
    }
  }

  static async getByLogin(login: string) {
    try {
      const { data } = await axios.get(`${url}user/get/login/${login}`)
      if (data)
        return data
    }
    catch ({ response }: any) {
      if (response.status === 404)
        return

      return { message: response.data }
    }
  }

  static async getByEmail(email: string) {
    try {
      const { data } = await axios.get(`${url}user/get/email/${email}`)
      if (data)
        return data
    }
    catch ({ response }: any) {
      if (response.status === 404)
        return

      return { message: response.data }
    }
  }

  static async changePass(token: string, newPass: string) {
    try {
      const response = await axios.put(`${url}user/changePass`, { newPass }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response)
        return response
    }
    catch ({ response }: any) {
      return { message: response }
    }
  }
}

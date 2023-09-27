import axios from 'axios'

const url = 'http://localhost:3000'

export default class User {

  static async add (body: Object) {
    try {
      return await axios.post(`${url}/user`, body)
    } catch (error: any) {
      return { message: error.response.data }
    }
  }

  static async getByLogin (login: string) {
    try {
      const { data } = await axios.get(`${url}/user/get/login/${login}`)
      if (data.length) return data
      return
    } catch (error: any) {
      return { message: error.response.data }
    }
  }

  static async getByEmail (email: string) {
    try {
      const { data } =  await axios.get(`${url}/user/get/email/${email}`)
      if (data.length) return data
      return
    } catch (error: any) {
      return { message: error.response.data }
    }
  }
}
import axios from 'axios'

const url = 'https://player-api-z98a.onrender.com/'

export default class User {

  static async add (body: Object) {
    try {
      return await axios.post(`${url}user`, body)
    } catch (error: any) {
      return { message: error.response.data }
    }
  }

  static async getByLogin (login: string) {
    try {
      const { data } = await axios.get(`${url}user/get/login/${login}`)
      if (data) return data
      return
    } catch (error: any) {
      return { message: error.response.data }
    }
  }

  static async getByEmail (email: string) {
    try {
      const { data } =  await axios.get(`${url}user/get/email/${email}`)
      if (data) return data
      return
    } catch (error: any) {
      return { message: error.response.data }
    }
  }
}
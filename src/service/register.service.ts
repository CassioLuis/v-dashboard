import axios from 'axios'

const url = 'https://player-api-z98a.onrender.com/'
// const url = 'http://localhost:3000/'

export default class User {

  static async add (body: Object) {
    try {
      const response = await axios.post(`${url}user`, body)
      return response
    } catch (error: any) {
      return { message: error.response.data }
    }
  }

  static async getByLogin (login: string) {
    try {
      const { data } = await axios.get(`${url}user/get/login/${login}`)
      if (data) return data
      return
    } catch ({ response }: any) {
      if (response.status === 404) {
        return
      }
      return { message: response.data }
    }
  }

  static async getByEmail (email: string) {
    try {
      const { data } = await axios.get(`${url}user/get/email/${email}`)
      if (data) return data
      return
    } catch ({ response }: any) {
      if (response.status === 404) {
        return
      }
      return { message: response.data }
    }
  }

  static async login (login: string) {
    try {
      const { data } = await axios.post(`${url}auth`, login)
      if (data) return data
      return
    } catch ({ response }: any) {
      if (response.status === 404) {
        return
      }
      return { message: response.data }
    }
  }
}
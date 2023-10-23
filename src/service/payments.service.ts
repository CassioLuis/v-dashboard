import axios from 'axios'
import Cookies from 'js-cookie'
import { url } from './url'
import type PaymentContract from './interfaces/payment'

export default class Payment {
  static async create(payment: PaymentContract): Promise<any> {
    const token = Cookies.get('token')
    try {
      const response = await axios.post(`${url}payments`, payment, {
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

  static async getAllByUser(token: string) {
    try {
      const response = await axios.get(`${url}payments/search`, {
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

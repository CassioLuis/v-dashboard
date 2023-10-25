import type { AxiosResponse } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'
import { url } from './url'
import type PaymentContract from './interfaces/payment'

interface IPayment {
  _id: string
  orderId: number
  mysqlUserId: number
  paymentMethod: string
  status: string
  dateCreated: Date
  dateLastUpdated: Date
  transactionAmount: number
  goldAmount: number
  qrCode: string
  __v: number
}

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
      const response: AxiosResponse<IPayment> = await axios.get<IPayment>(`${url}payments/search`, {
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

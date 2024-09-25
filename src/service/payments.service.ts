import type { AxiosResponse } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'
import type { INewPayment, IPayment } from '../interfaces'
import url from './url'

export default class Payment {
  static async create(payment: INewPayment): Promise<any> {
    const token = Cookies.get('token')
    const response = await axios.post(`${url}payments`, payment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response)
      return response
  }

  static async getAllByUser(token: string) {
    try {
      const response: AxiosResponse<IPayment | any> = await axios.get<IPayment | any>(`${url}payments/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response)
        return response.data
    }
    catch (error: any) {
      return { message: error }
    }
  }
}

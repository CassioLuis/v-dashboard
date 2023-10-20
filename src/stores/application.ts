import { defineStore } from 'pinia'
import PaymentsService from '../service/payments.service'

interface Payment {
  _id: string
  orderId: number
  mysqlUserId: number
  paymentMethod: string
  status: string
  dateCreated: Date
  dateLastUpdated: Date
  transactionAmount: number
  __v: number
}

interface State {
  token: string
  forgotPassToken: string
  forgotPassTokenInvalid: boolean
  paymentsHistory: Payment[]
}

export const useAppStore = defineStore('userSession', {
  state: (): State => {
    return {
      token: '',
      forgotPassToken: '',
      forgotPassTokenInvalid: false,
      paymentsHistory: [],
    }
  },
  getters: {
    getToken: state => state.token,
    getForgotToken: state => state.forgotPassToken,
    getForgotPassTokenInvalid: state => state.forgotPassTokenInvalid,
    getPaymentHistory: (state): Payment[] => state.paymentsHistory,
    getPaymentsTotal: state => state.paymentsHistory.filter(item => item.status === 'Aprovado').reduce((acc, item) => acc += item.transactionAmount, 0),
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setForgotToken(forgotToken: string) {
      this.forgotPassToken = forgotToken
    },
    setForgotPassTokenInvalid(status: boolean) {
      this.forgotPassTokenInvalid = status
    },
    async setPaymentsHistory() {
      const response: any = await PaymentsService.getAllByUser(this.getToken)
      response?.data.forEach((item: Payment) => {
        if (item.status === 'pending')
          return item.status = 'Pendente'
        if (item.status === 'approved')
          return item.status = 'Aprovado'
        if (item.status === 'canceled')
          return item.status = 'Cancelado'
      })
      this.paymentsHistory = response?.data.reverse()
    },
  },
})

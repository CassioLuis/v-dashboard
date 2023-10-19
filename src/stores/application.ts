import { defineStore } from 'pinia'
import PaymentsService from '../service/payments.service'

interface State {
  token: string
  forgotPassToken: string
  forgotPassTokenInvalid: boolean
  paymentsHistory: []
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
    getPaymentHistory: state => state.paymentsHistory,
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
      const response = await PaymentsService.getAllByUser(this.getToken)
      this.paymentsHistory = response?.data.reverse()
    },
  },
})

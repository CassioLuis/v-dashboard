import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import PaymentsService from '../service/payments.service'
import TableConstructor from '../composables/TableConstructor'
import type { IPayment, IState } from '../interfaces'

export const useAppStore = defineStore('userSession', {
  state: (): IState => {
    return {
      token: '',
      forgotPassToken: '',
      forgotPassTokenInvalid: false,
      paymentsHistory: {
        donationTotals: {
          donationQtd: 0,
          goldAmount: 0,
          transactionAmount: '0,00' || 0,
        },
        tHeaders: [],
        tBody: [],
      },
    }
  },
  getters: {
    getForgotToken: (state: IState) => state.forgotPassToken,
    getForgotPassTokenInvalid: (state: IState) => state.forgotPassTokenInvalid,
    getPaymentHistory: (state: IState) => state.paymentsHistory,
    getPaymentsTotal: (state: IState) => state.paymentsHistory.donationTotals.transactionAmount,
    getQtdDonations: (state: IState) => state.paymentsHistory.donationTotals.donationQtd,
    getGoldDonationTotal: (state: IState) => state.paymentsHistory.donationTotals.goldAmount,
    getPayment: (state: IState) => (id: any) => state.paymentsHistory.tBody.filter(item => item.orderId === id),
  },
  actions: {
    setForgotToken(forgotToken: string) {
      this.forgotPassToken = forgotToken
    },
    setForgotPassTokenInvalid(status: boolean) {
      this.forgotPassTokenInvalid = status
    },
    async setPaymentsHistory() {
      const token = Cookies.get('token')

      if (!token)
        return

      const data = await PaymentsService.getAllByUser(token)

      const payments: IPayment[] = data
      this.paymentsHistory = TableConstructor.donationHistory(payments)
    },
  },
})

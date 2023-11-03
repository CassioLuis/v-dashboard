import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import PaymentsService from '../service/payments.service'
import TableConstructor from '../composables/TableConstructor.ts'
import type { IPayment, IPaymentsHistory, IState } from '../interfaces'

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
    getForgotToken: state => state.forgotPassToken,
    getForgotPassTokenInvalid: state => state.forgotPassTokenInvalid,
    getPaymentHistory: (state): IPaymentsHistory => state.paymentsHistory,
    getPaymentsTotal: state => state.paymentsHistory.donationTotals.transactionAmount,
    getQtdDonations: state => state.paymentsHistory.donationTotals.donationQtd,
    getGoldDonationTotal: state => state.paymentsHistory.donationTotals.goldAmount,
    getPayment: state => (id: any) => state.paymentsHistory.tBody.filter(item => item.orderId === id),
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
    setOpenModal(id: any) {
      const [payment] = this.getPayment(id)
      payment.openModal = !payment.openModal
    },
  },
})

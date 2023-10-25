import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import PaymentsService from '../service/payments.service'
import TableConstrutor from '../composables/tableConstructor'

interface Payment {
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

interface THead {
  title: string
}

interface Cells {
  value: string | number
  name: string
}

interface TBody {
  orderId: number
  paymentMethod: string
  status: string
  dateLastUpdated: Date
  transactionAmount: number
  goldAmount: number
  qrCode: string
  cells: Cells[]
}

interface DonationTotal {
  donationQtd: number
  goldAmount: number
  transactionAmount: string | number
}

interface Payments {
  donationTotal: DonationTotal
  tHeaders: Array<THead>
  tBody: Array<TBody>
}

interface State {
  token: string
  forgotPassToken: string
  forgotPassTokenInvalid: boolean
  paymentsHistory: Payments
}

export const useAppStore = defineStore('userSession', {
  state: (): State => {
    return {
      token: '',
      forgotPassToken: '',
      forgotPassTokenInvalid: false,
      paymentsHistory: {
        donationTotal: {
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
    getPaymentHistory: (state): Payments => state.paymentsHistory,
    getPaymentsTotal: state => state.paymentsHistory.donationTotal.transactionAmount,
    getQtdDonations: state => state.paymentsHistory.donationTotal.donationQtd,
    getGoldDonationTotal: state => state.paymentsHistory.donationTotal.goldAmount,
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

      const response = await PaymentsService.getAllByUser(token)
      if (!response)
        return
      const payments: Payment[] = response.data
      this.paymentsHistory = TableConstrutor.donationHistory(payments)
    },
  },
})

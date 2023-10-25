interface ItHead {
  title: string
}

interface ICells {
  value: string | number | undefined
  name: string
}

interface ItBody {
  orderId: number
  paymentMethod: string
  status: string
  dateLastUpdated: Date
  transactionAmount: number
  goldAmount: number
  qrCode: string
  cells: ICells[]
}

interface IDonationTotals {
  donationQtd: number
  goldAmount: number
  transactionAmount: string | number
}

export interface IPaymentsHistory {
  donationTotals: IDonationTotals
  tHeaders: Array<ItHead>
  tBody: Array<ItBody>
}

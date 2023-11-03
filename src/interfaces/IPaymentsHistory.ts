interface ItHead {
  title: string
  styles: string | undefined
}

interface ICells {
  value: string | number | undefined
  name: string
  styles: string | undefined
}

interface ItBody {
  orderId: number
  paymentMethod: string
  status: string
  dateLastUpdated: Date
  numberDate: number
  transactionAmount: string
  goldAmount: number
  qrCode: string
  openModal: boolean
  cells: ICells[]
}

interface IDonationTotals {
  donationQtd: number
  goldAmount: string | number
  transactionAmount: string | number
}

export interface IPaymentsHistory {
  donationTotals: IDonationTotals
  tHeaders: Array<ItHead>
  tBody: Array<ItBody>
}

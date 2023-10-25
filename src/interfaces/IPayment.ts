export interface IPayment {
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

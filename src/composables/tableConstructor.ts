import type { IPayment, IPaymentsHistory } from '../interfaces'
import Format from './Format'

export default class TableConstructor {
  private static readonly tHeaders = [
    { title: 'Order' },
    { title: 'Método' },
    { title: 'Status' },
    { title: 'Data' },
    { title: 'Valor' },
    { title: 'Gold' },
    { title: 'QR Code' },
  ]

  static donationHistory(donationTable: IPayment[]): IPaymentsHistory {
    const donationTotals = donationTable.filter((item: any) => item.status === 'approved').reduce((acc: any, item: any) => {
      acc.donationQtd++
      acc.goldAmount += item.goldAmount
      acc.transactionAmount += item.transactionAmount
      return {
        goldAmount: acc.goldAmount,
        donationQtd: acc.donationQtd,
        transactionAmount: acc.transactionAmount,
      }
    }, { goldAmount: 0, transactionAmount: 0, donationQtd: 0 })

    const tBody = donationTable.map((item) => {
      // console.log(item)
      return {
        orderId: item.orderId,
        paymentMethod: item.paymentMethod,
        status: item.status,
        dateLastUpdated: item.dateLastUpdated,
        transactionAmount: item.transactionAmount,
        goldAmount: item.goldAmount,
        qrCode: item.qrCode,
        cells: [
          { value: item.orderId, name: 'orderId' },
          { value: item.paymentMethod, name: 'paymentMethod' },
          { value: Format.status(item.status), name: 'status' },
          { value: Format.date(item.dateLastUpdated), name: 'dateLastUpdated' },
          { value: Format.BRL(item.transactionAmount), name: 'transactionAmount' },
          { value: item.goldAmount, name: 'goldAmount' },
          { value: item.qrCode, name: 'qrCode' },
        ],
      }
    })

    return {
      donationTotals: {
        ...donationTotals,
        transactionAmount: Format.BRL(donationTotals.transactionAmount),
      },
      tHeaders: this.tHeaders,
      tBody,
    }
  }
}

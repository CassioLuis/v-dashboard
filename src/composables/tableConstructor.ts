import type { IPayment, IPaymentsHistory } from '../interfaces'
import Format from './Format'

export default class TableConstructor {
  private static readonly tHeaders = [
    { title: 'Order', styles: 'text-center' },
    { title: 'Método', styles: 'text-left' },
    { title: 'Status', styles: 'text-left' },
    { title: 'Data', styles: 'text-left' },
    { title: 'Valor', styles: 'text-left' },
    { title: 'Gold', styles: 'text-left' },
    { title: 'QR Code', styles: 'text-center' },
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
      const date = new Date(item.dateLastUpdated)

      return {
        orderId: item.orderId,
        paymentMethod: item.paymentMethod,
        status: item.status,
        dateLastUpdated: item.dateLastUpdated,
        numberDate: date.getTime(),
        transactionAmount: Format.BRL(item.transactionAmount),
        goldAmount: item.goldAmount,
        qrCode: item.qrCode,
        openModal: false,
        cells: [
          { value: item.orderId, name: 'orderId', styles: 'text-left' },
          { value: item.paymentMethod, name: 'paymentMethod', styles: 'text-left' },
          { value: Format.status(item.status), name: 'status', styles: 'text-left' },
          { value: Format.date(item.dateLastUpdated), name: 'dateLastUpdated', styles: 'text-left' },
          { value: Format.BRL(item.transactionAmount), name: 'transactionAmount', styles: 'text-left' },
          { value: Format.number(item.goldAmount), name: 'goldAmount', styles: 'text-left' },
          { value: item.qrCode, name: 'qrCode', styles: 'text-left' },
        ],
      }
    })

    return {
      donationTotals: {
        ...donationTotals,
        goldAmount: Format.number(donationTotals.goldAmount),
        transactionAmount: Format.BRL(donationTotals.transactionAmount),
      },
      tHeaders: this.tHeaders,
      tBody: tBody.sort((a, b) => b.numberDate - a.numberDate),
    }
  }
}

import moment from 'moment'

// import 'moment/locale/pt-br'

interface Donation {
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

class Format {
  static date(date: Date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss')
  }

  static status(status: string) {
    if (status === 'pending')
      return status = 'Pendente'
    if (status === 'approved')
      return status = 'Aprovado'
    if (status === 'canceled')
      return status = 'Cancelado'
  }

  static BRL(number: number): string {
    const options = { style: 'currency', currency: 'BRL' }
    return number.toLocaleString('pt-BR', options)
  }
}

interface ITableConstructor {
  donationHistory (donationTable: Donation[]): {
    donationTotal: DonationTotal
    tHeaders: THead[]
    tBody: TBody[]
  }
}

interface ITableConstructor {
  donationTotal: DonationTotal
  tHeaders: THead[]
  tBody: TBody[]
}

export default class TableConstructor {
  private static readonly tHeaders = [
    { title: 'Order' },
    { title: 'Método de Pagamento' },
    { title: 'Status' },
    { title: 'Data' },
    { title: 'Valor' },
    { title: 'Gold' },
    { title: 'QR Code' },
  ]

  static donationHistory(donationTable: Donation[]): ITableConstructor {
    const donationTotal = donationTable.filter((item: any) => item.status === 'approved').reduce((acc: any, item: any) => {
      acc.donationQtd++
      acc.goldAmount += item.goldAmount
      acc.transactionAmount += item.transactionAmount
      return {
        goldAmount: acc.goldAmount,
        donationQtd: acc.donationQtd,
        transactionAmount: Format.BRL(acc.transactionAmount),
      }
    }, { goldAmount: 0, transactionAmount: 0, donationQtd: 0 })

    const tBody = donationTable.map((item) => {
      return {
        orderId: item.orderId,
        paymentMethod: item.paymentMethod,
        status: item.status,
        dateLastUpdated: item.dateLastUpdated,
        transactionAmount: item.transactionAmount,
        goldAmount: item.goldAmount,
        qrCode: item.qrCode,
        cells: [
          { value: item.orderId },
          { value: item.paymentMethod },
          { value: Format.status(item.status), name: 'status' },
          { value: Format.date(item.dateLastUpdated) },
          { value: Format.BRL(item.transactionAmount) },
          { value: item.goldAmount },
          { value: item.qrCode, name: 'qrCode' },
        ],
      }
    })
    return {
      donationTotal,
      tHeaders: this.tHeaders,
      tBody,
    }
  }
}

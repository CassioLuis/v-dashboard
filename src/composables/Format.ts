import moment from 'moment'

export default class Format {
  static date(date: Date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss')
  }

  static status(status: string) {
    if (status === 'pending')
      return status = 'Pendente'
    if (status === 'approved')
      return status = 'Aprovado'
    if (status === 'cancelled')
      return status = 'Cancelado'
  }

  static BRL(number: number): string {
    const options = { style: 'currency', currency: 'BRL' }
    return number.toLocaleString('pt-BR', options)
  }
}

interface IIdentification {
  type: string
  number: string
}

interface IPayer {
  first_name: string
  last_name: string
  email: string
  identification: IIdentification
}

export interface INewPayment {
  payment_method_id: string
  transaction_amount: number
  payer: IPayer
  description: string
  external_reference: string
}

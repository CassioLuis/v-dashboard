export default interface PaymentContract {
  payment_method_id: string
  transaction_amount: number
  payer: {
    first_name: string
    last_name: string
    email: string
    identification: {
      type: string
      number: string
    }
  }
  description: string
  external_reference: string
}

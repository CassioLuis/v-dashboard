import type { IPaymentsHistory } from './IPaymentsHistory'

export interface IState {
  token: string
  forgotPassToken: string
  forgotPassTokenInvalid: boolean
  paymentsHistory: IPaymentsHistory
}

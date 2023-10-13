import { defineStore } from 'pinia'

interface State {
  token: string
  forgotPassToken: string
  forgotPassTokenInvalid: boolean
}

export const useAppStore = defineStore('userSession', {
  state: (): State => {
    return {
      token: '',
      forgotPassToken: '',
      forgotPassTokenInvalid: false,
    }
  },
  getters: {
    getToken: state => state.token,
    getForgotToken: state => state.forgotPassToken,
    getForgotPassTokenInvalid: state => state.forgotPassTokenInvalid,
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setForgotToken(forgotToken: string) {
      this.forgotPassToken = forgotToken
    },
    setForgotPassTokenInvalid(status: boolean) {
      this.forgotPassTokenInvalid = status
    },
  },
})

import { defineStore } from 'pinia'

interface State {
  token: string
}

export const useAppStore = defineStore('userSession', {
  state: (): State => {
    return {
      token: '',
    }
  },
  getters: {
    getToken: state => state.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
  },
})

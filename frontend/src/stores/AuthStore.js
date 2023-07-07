import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => {
    if (localStorage.getItem('auth')) {
      return JSON.parse(localStorage.getItem('auth'))
    } else {
      return {
        access_token: null,
        renew_token: null,
        endpoints: {
          obtainJWT: 'http://0.0.0.0:8000/api/token/',
          refreshJWT: 'http://0.0.0.0:8000/api/token/refresh/'
        }
      }
    }
  },
  getters: {
    accessToken: (state) => state.access_token,
    renewToken: (state) => state.renew_token
  },
  actions: {
    updateAccessToken (newAccessToken) {
      console.log(this)
      this.access_token = newAccessToken
      localStorage.setItem('auth', JSON.stringify(this))
    },
    updateRenewToken (newRenewToken) {
      this.renew_token = newRenewToken
      localStorage.setItem('auth', JSON.stringify(this))
    }
  }
})

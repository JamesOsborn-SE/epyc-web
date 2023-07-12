import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => {
    if (localStorage.getItem('auth')) {
      return JSON.parse(localStorage.getItem('auth')!!)
    } else {
      return {
        accessToken: null,
        refreshToken: null,
        refreshTokenTimeout: null,
        endpoints: {
          obtainJWT: 'http://127.0.0.1:8000/api/token/',
          refreshJWT: 'http://127.0.0.1:8000/api/token/refresh/'
        }
      }
    }
  },
  getters: {
    getAccessToken: (state) => state.accessToken,
    getHeaders(state) {
      return {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
    }
  },
  actions: {
    updateAccessToken(newAccessToken: string) {
      this.accessToken = newAccessToken
    },
    updateRenewToken(newRenewToken: string) {
      this.refreshToken = newRenewToken
    },
    async login(username: string, password: string) {
      axios.post(this.endpoints.obtainJWT,
        {
          username: username,
          password: password
        }
      )
        .then(response => {
          this.accessToken = response.data.access
          this.refreshToken = response.data.refresh
          this.startRefreshTokenTimer()
        })
    },
    async refreshAccessToken() {
      await axios.post(this.endpoints.refreshJWT, {}, {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      })
        .then(response => {
          this.accessToken = response.data.access
          this.refreshToken = response.data.refresh
          this.startRefreshTokenTimer();
        })
    },
    startRefreshTokenTimer() {
      // parse json object from base64 encoded jwt token
      const jwtBase64 = this.accessToken.split('.')[1];
      const jwtToken = JSON.parse(atob(jwtBase64));

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(this.refreshAccessToken, timeout);
    },
    stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
    }
  }
})

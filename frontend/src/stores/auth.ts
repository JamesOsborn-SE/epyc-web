import axios from 'axios'
import { defineStore } from 'pinia'

const backendHostname=import.meta.env.VITE_BACKEND_HOSTNAME

export const useAuth = defineStore('auth', {
  state: () => {
    if (localStorage.getItem('auth') && localStorage.getItem('auth') != "undefined") {
      return JSON.parse(localStorage.getItem('auth')!!)
    } else {
      return {
        username: null,
        accessToken: null,
        refreshToken: null,
        refreshTokenTimeout: null,
        refreshTokenExpiresAt: null,
      }
    }
  },
  getters: {
    isAuthenticated: (state) => state && !state.hasExpired,
    getAccessToken: (state) => state.accessToken,
    getHeaders(state) {
      if (!state.hasExpired)
        return {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        }
    },
    getExpiresIn: (state) => state.refreshTokenExpiresAt - Date.now() - (60 * 1000),
    hasExpired: (state): boolean => state.refreshTokenExpiresAt < Date.now()
  },
  actions: {
    updateAccessToken(newAccessToken: string) {
      this.accessToken = newAccessToken
    },
    updateRenewToken(newRenewToken: string) {
      this.refreshToken = newRenewToken
    },
    logout(){
      this.refreshTokenExpiresAt = 0
      localStorage.setItem('auth','')
    },
    async login(username: string, password: string): Promise<void> {
      const response = await axios.post(backendHostname + '/api/token/',
        {
          username: username,
          password: password
        }
      )
      this.username = username
      this.accessToken = response.data.access
      this.refreshToken = response.data.refresh
      this.startRefreshTokenTimer()
    },
    async refreshAccessToken() {
      await axios.post(backendHostname + '/api/token/refresh/', {}, {
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
      this.refreshTokenExpiresAt = expires.getTime()
      const timeout = this.getExpiresIn;
      this.refreshTokenTimeout = setTimeout(this.refreshAccessToken, timeout);
    },
    stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
    },
    async getAuthFromCode(code: string): Promise<string> {
      var path: string = ""
      await axios.post(`${backendHostname}/api/token/oneTimeUse/${code}`, {}, {})
        .then(response => {
          this.accessToken = response.data.token.access
          this.refreshToken = response.data.token.refresh
          this.username = response.data.username
          this.startRefreshTokenTimer();
          path = response.data.path
        })
        return path
    }
  }
})

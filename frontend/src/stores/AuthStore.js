import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',{
    state: () => ({
        access_token: null,
        renew_token: null,
        endpoints: {
            obtainJWT: 'http://0.0.0.0:8000/api/token/',
            refreshJWT: 'http://0.0.0.0:8000/api/token/refresh/'
          }
    }),
    getters: {
        accessToken(state){
            return state.access_token
        },
        renewToken(state){
            return state.renew_token
        }
    },
    actions:{
        updateAccessToken(state, newAccessToken){
            state.access_token = newAccessToken
        },
        updateRenewToken(state, newRenewToken){
            state.renew_token = newRenewToken
        }
    }
})
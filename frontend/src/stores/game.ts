import axios from 'axios'
import { defineStore } from 'pinia'
import { Entry } from "@/types/Entry";
import { Game } from "@/types/Game";
import { useAuth } from '@/stores/auth'

export const useGame = defineStore('game', {
  state: () => {
    if (localStorage.getItem('game') && localStorage.getItem('game') != "undefined") {
      return JSON.parse(localStorage.getItem('game')!!)
    } else {
      return {
        id: null,
        created_at: null,
        user: null,
        entries: []
      }
    }
  },
  getters: {
    getCurrentGame: (state) => state,
    getLatestEntry(state) {
      if(state.entries && state.entries.length > 0){
        return state.entries.sort((a: Entry, b: Entry) => a.sequence > b.sequence).slice(0,1)[0]
      } else {
        return null
      }
    } 
  },
  actions: {
    async newGame(sentence: string): Promise<Game> {
      const authStore = useAuth()
      return axios.post('http://127.0.0.1:8000/api/games/', {
        sentence: sentence
      }, authStore.getHeaders)
        .then(response => {
          this.id = response.data.id
          this.created_at = response.data.created_at
          this.user = response.data.user
          this.entries = response.data.entries as Array<Entry>
          return response.data as Game
        })// todo: add catches for 401,etc
    },
    async getEntries(gameId: string): Promise<Entry[]> {
      const authStore = useAuth()
      return axios.get('http://127.0.0.1:8000/api/games/' + gameId + '/entries', authStore.getHeaders)
        .then(response => {
          this.id = response.data.id
          this.entries = response.data as Entry[]
          return this.entries
        })// todo: add catches for 401,etc
    },
    async getEntry(id: string): Promise<Entry> {
      const authStore = useAuth()
      return axios.get('http://127.0.0.1:8000/api/entries/' + id, authStore.getHeaders)
        .then(response => {
          this.id = response.data.game_id
          this.entries = [ response.data as Entry ]
          return response.data as Entry
        })// todo: add catches for 401,etc
    },
    async newEntry(entry: Entry): Promise<Array<Entry>> {
      const authStore = useAuth()
      return axios.post('http://127.0.0.1:8000/api/entries/', entry, authStore.getHeaders)
        .then(response => {
          this.id = response.data.game_id
          this.entries = [response.data as Entry]
          return response.data as Array<Entry>
        })// todo: add catches for 401,etc
    }
  }
})

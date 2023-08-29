import axios, { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { Entry } from "@/types/Entry";
import { Game } from "@/types/Game";
import { useAuth } from '@/stores/auth'

const backendHostname = import.meta.env.VITE_BACKEND_HOSTNAME

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
      if (state.entries && state.entries.length > 0) {
        return state.entries.sort((a: Entry, b: Entry) => a.sequence > b.sequence).slice(0, 1)[0]
      } else {
        return null
      }
    }
  },
  actions: {
    async getLastEntry(gameId: string, onlyLastEntryWithImage: boolean) {
      const withImage = onlyLastEntryWithImage ? "Image" : ""
      const authStore = useAuth()
      return axios.get(backendHostname + '/api/games/' + gameId + '/entries/last' + withImage, authStore.getHeaders)
        .then(response => {
          this.id = response.data.id
          this.created_at = response.data.created_at
          this.user = response.data.user
          this.entries = [response.data.entries as Entry]
          return response.data as Entry
        })
        .catch((err: AxiosError) => {
          if (err.response?.status == 500) {
            return new Entry(null, null, null, gameId, 99, null, "/images/noimage.png")
          } else {
            console.log(err)
          }
        })
    },
    async getGames() {
      const authStore = useAuth()
      return axios.get(backendHostname + '/api/games/', authStore.getHeaders)
        .then(response => {
          this.id = response.data.id
          this.created_at = response.data.created_at
          this.user = response.data.user
          this.entries = response.data.entries as Array<Entry>
          const games = response.data as Game[]
          games.sort((a: Game, b: Game) => {
            if (a.created_at > b.completed_at)
              return -1
            else
              return 1
          })
          return games;
        })// todo: add catches for 401,etc
    },
    async newGame(sentence: string): Promise<Game> {
      const authStore = useAuth()
      return axios.post(backendHostname + '/api/games/', {
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
      return axios.get(backendHostname + '/api/games/' + gameId + '/entries', authStore.getHeaders)
        .then(response => {
          this.id = response.data.id
          this.entries = response.data as Entry[]
          return this.entries
        })// todo: add catches for 401,etc
    },
    async getEntry(id: string): Promise<Entry> {
      const authStore = useAuth()
      return axios.get(backendHostname + '/api/entries/' + id, authStore.getHeaders)
        .then(response => {
          this.id = response.data.game_id
          this.entries = [response.data as Entry]
          return response.data as Entry
        })// todo: add catches for 401,etc
    },
    async newEntry(entry: Entry): Promise<Array<Entry>> {
      const authStore = useAuth()
      return axios.post(backendHostname + '/api/entries/', entry, authStore.getHeaders)
        .then(response => {
          this.id = response.data.game_id
          this.entries = [response.data as Entry]
          return response.data as Array<Entry>
        })// todo: add catches for 401,etc
    }
  }
})

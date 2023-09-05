import axios, { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { Entry } from "@/types/Entry";
import { Game } from "@/types/Game";
import { useAuth } from '@/stores/auth'
import router from '@/router';

const backendHostname = import.meta.env.VITE_BACKEND_HOSTNAME

const handleError = (err: AxiosError) => {
  if (err.response?.status == 401) {
    router.push({name: "logout"})
    return;
  } else {
    console.log(err)
  }
}

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
      const authStore = useAuth()
      const withImage = onlyLastEntryWithImage ? "Image" : ""
      return axios.get(`${backendHostname}/api/games/${gameId}/entries/last${withImage}`, authStore.getHeaders)
        .then(response => {
          Object.assign(this, response.data)
          this.entries = [response.data.entries as Entry]
          return response.data as Entry
        })
        .catch(handleError)
    },
    async getGames() {
      const authStore = useAuth()
      return axios.get(`${backendHostname}/api/games/`, authStore.getHeaders)
        .then(response => {
          Object.assign(this, response.data)
          this.entries = response.data.entries as Array<Entry>
          const games = response.data as Game[]
          games.sort((a: Game, b: Game) => a.created_at > b.completed_at ? -1 : 1)
          return games;
        })
        .catch(handleError)
    },
    async newGame(sentence: string): Promise<Game | void> {
      const authStore = useAuth()
      return axios.post(`${backendHostname}/api/games/`, { sentence }, authStore.getHeaders)
        .then(response => {
          Object.assign(this, response.data)
          this.entries = response.data.entries as Array<Entry>
          return response.data as Game
        })
        .catch(handleError)
    },
    async getEntries(gameId: string): Promise<Entry[] | void> {
      const authStore = useAuth()
      return axios.get(`${backendHostname}/api/games/${gameId}/entries`, authStore.getHeaders)
        .then(response => {
          this.id = response.data.id
          this.entries = response.data as Entry[]
          return this.entries
        })
        .catch(handleError)
    },
    async getEntry(id: string): Promise<Entry | void> {
      const authStore = useAuth()
      return axios.get(`${backendHostname}/api/entries/${id}`, authStore.getHeaders)
        .then(response => {
          this.id = response.data.game_id
          this.entries = [response.data as Entry]
          return response.data as Entry
        })
        .catch(handleError)
    },
    async newEntry(entry: Entry): Promise<Array<Entry> | void> {
      const authStore = useAuth()
      return axios.post(`${backendHostname}/api/entries/`, entry, authStore.getHeaders)
        .then(response => {
          this.id = response.data.game_id
          this.entries = [response.data as Entry]
          return response.data as Array<Entry>
        })
        .catch(handleError)
    },
    async endGame(gameId: string) {
      const authStore = useAuth()
      return axios.post(`${backendHostname}/api/games/${gameId}/end`, {}, authStore.getHeaders)
        .catch(handleError)
    }
  }
})

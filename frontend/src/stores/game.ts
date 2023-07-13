import axios from 'axios'
import { defineStore } from 'pinia'
import { Entry } from "@/types/Entry";
import { Game } from "@/types/Game";
import { useAuth } from '@/stores/auth'

export const useGame = defineStore('game', {
  state: () => {
    if (localStorage.getItem('game')) {
      return JSON.parse(localStorage.getItem('game')!!)
    } else {
      return {
        id: null,
        entries: []
      }
    }
  },
  getters: {
    getGame: (state: Game) => state
  },
  actions: {
    async newGame(): Promise<Game> {
      const authStore = useAuth()
      return axios.post('http://127.0.0.1:8000/api/games/', {}, authStore.getHeaders)
        .then(response => {
          return response.data as Game
        })
    },
    async getEntry(id: string): Promise<Entry> {
      const authStore = useAuth()
      return axios.get('http://127.0.0.1:8000/api/entries/' + id, authStore.getHeaders)
        .then(response => {
          return response.data as Entry
        })
    },
    async setEntry(entry: Entry): Promise<Array<Entry>> {
      const authStore = useAuth()
      return axios.post('http://127.0.0.1:8000/api/entries/', entry, authStore.getHeaders)
        .then(response => {
          return response.data as Array<Entry>
        })
    }
  }
})

<script setup lang="ts">
import { onMounted, ref } from "vue"
import router from '@/router'
import { useGame } from '@/stores/game';
import type { AxiosError } from "axios";
import type { Game } from "@/types/Game";
import GamePreview from "@/components/GamePreview.vue";

const games = ref<Game[]>()
const gameStore = useGame()

function getGames() {
  gameStore
    .getGames()
    .then((g: Game[]) => {
      games.value = g
    })
    .catch((err: AxiosError) => {
      if (err.response?.status == 401) {
        router.push({name: "logout"})
      } else {
        console.log(err)
      }
    })
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('default', { dateStyle: 'short', timeStyle: 'short' }).format(date);
}

onMounted(() => {
  getGames()
})
</script>

<template>
  <div v-for="game in games" class="column">
    <p class="column">Game Started: {{ formatDate(game.created_at.toString()) }}</p>
    <p v-if="game.completed_at" class="column">Game Ended: {{ formatDate(game.completed_at.toString()) }}</p>
    <div v-if="game.completed_at">
      <GamePreview :gameId=game.id as string />
    </div>
    <div v-else>
      <router-link :to="{
        name: 'continueGame',
        params: {
          id: game.id
        }
      }">
        Continue Game
      </router-link>
    </div>
    <hr />
  </div>
</template>

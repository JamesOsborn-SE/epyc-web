<script lang="ts">
import { onMounted, ref } from "vue"
import router from '@/router'
import { useGame } from '@/stores/game';
import type { AxiosError } from "axios";
import type { Game } from "@/types/Game";

const games = ref<Game[]>()
const gameStore = ref()
function getGames() {
  gameStore.value
    .getGames()
    .then((g: Game[]) => {
      games.value = g
      console.log("game", g)
    })
    .catch((err: AxiosError) => {
      if (err.response?.status == 401) {
        router.push("/logout")
      } else {
        console.log(err)
      }
    })
}

export default {
  setup() {
    gameStore.value = useGame()
    onMounted(() => {
      getGames()
    })
  },
  data() {
    return { games: games }
  },
}
</script>

<template>
  <div v-for="game in games" class="column">
    <h2> {{ game.created_at }}</h2>
    <router-link :to="{
      name: 'game',
      params: {
        id: game.id
      }
    }">
      {{ game.id }}
    </router-link>
    <p> {{ game.entries }} </p>
    <hr />
  </div>
</template>



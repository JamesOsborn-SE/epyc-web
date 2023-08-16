<script lang="ts">
import { onMounted, ref } from "vue"
import router from '@/router'
import { useGame } from '@/stores/game';
import type { AxiosError } from "axios";
import type { Game } from "@/types/Game";
import GamePreview from "@/components/GamePreview.vue";

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
  components: {
    GamePreview
  },
  data() {
    return { games: games }
  },
}
</script>

<template>
  <div v-for="game in games" class="column">
    <router-link :to="{
      name: 'game',
      params: {
        id: game.id
      }
    }">
      <h2 class="column">Game Started: {{ game.created_at }}</h2>
      <h2 class="column">Game Ended: {{ game.completed_at }}</h2>
      <GamePreview :gameId=game.id />
    </router-link>
    <hr />
  </div>
</template>

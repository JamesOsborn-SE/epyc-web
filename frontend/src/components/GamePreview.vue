<template>
  <div class="column">
    <router-link class="column"
    :to="{
      name: 'game',
      params: {
        id: gameId
      },
    }">
      <p>View Game</p>
      <img :src="image" alt="a drawing" class="thumbnail" />
    </router-link>

  </div>
</template>

<script lang="ts">
import { useGame } from '@/stores/game';
import type { Entry } from "@/types/Entry";

export default {
  name: 'GamePreview',
  props: {
    gameId: String,
  },
  setup() {

  },
  data() {
    return {
      image: "",
      gameId: this.gameId,
    }
  },
  mounted() {
    const gameStore = useGame()
    gameStore
      .getLastEntry(this.gameId, true)
      .then((i: Entry) => {
        this.image = i.drawing as string
      })
  },
  methods: {

  },
}

</script>

<style>
.thumbnail {
  align-self: center;
  width: 30%;
}
</style>
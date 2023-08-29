<script lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import { useGame } from '@/stores/game';
import type { Entry } from '@/types/Entry';

export default {
  name: 'ContinueGame',
  setup() {
  },
  mounted() {
    const gameStore = useGame()
    const route = useRoute()
    gameStore
      .getLastEntry(route.params.id)
      .then((i: Entry) => {
        router.push({ name: "entry", params: { id: i.id } })
      })
  },
}

</script>

<template>
  <div>
    loading game
  </div>
</template>

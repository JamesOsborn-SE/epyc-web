<script lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from 'vue-router'
import router from '@/router'
import { useGame } from '@/stores/game';
import type { AxiosError } from "axios";
import type { Entry } from "@/types/Entry";

const entries = ref()
const gameStore = ref()

export default {
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams) => {
        gameStore.value
          .getGame(toParams.id)
          .then((g: Entry[]) => {
            entries.value = g
            console.log("game", g)
          })
          .catch((err: AxiosError) => {
            if (err.response?.status == 401) {
              router.push("/logout")
            } else {
              console.log(err)
            }
          })
      })
  },
  setup() {
    gameStore.value = useGame()
    const route = useRoute()

    onMounted(() => {
      gameStore.value
        .getGame(route.params.id)
        .then((g: Entry[]) => {
            entries.value = g
            console.log("game", g)
          })
          .catch((err: AxiosError) => {
            if (err.response?.status == 401) {
              router.push("/logout")
            } else {
              console.log(err)
            }
          })        
    })
  },
  data() {
    return { entries }
  }

}
</script>

<template>
  <div class="about">
    <div v-for="entry in entries">
      <h2> turn {{ entry.sequence + 1 }}</h2>
      <div v-if="entry && entry.sentence">
        {{ entry.sentence }}
      </div>
      <div v-if="entry && entry.drawing">
        <img style="width: 100%;" v-bind:src="entry.drawing" alt="drawing" />
      </div>
      <br/>
      <br/>
    </div>    
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

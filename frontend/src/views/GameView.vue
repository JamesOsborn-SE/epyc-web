<script lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from 'vue-router'
import router from '@/router'
import { useGame } from '@/stores/game';
import type { AxiosError } from "axios";
import type { Entry } from "@/types/Entry";

const entries = ref<Entry[]>()
const gameStore = ref()
function getAllEntries(gameId: string | string[]) {
  gameStore.value
    .getEntries(gameId)
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
}

export default {
  created() {

    this.$watch(
      () => this.$route.params,
      (toParams) => {
        getAllEntries(toParams.id)
        gameStore.value
          .getEntries(toParams.id)
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
      getAllEntries(route.params.id)
    })
  },
  data() {
    return { entries }
  },
}
</script>

<template>
    <div v-for="entry in entries" class="column">
      <h2> turn {{ entry.sequence + 1 }}</h2>
      <div v-if="entry && entry.sentence">
        {{ entry.sentence }}
      </div>
      <div v-if="entry && entry.drawing">
        <img style="width: 100%;" v-bind:src="entry.drawing" alt="drawing" />
      </div>
      <hr/>
    </div>
</template>



<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useRoute } from 'vue-router'
import router from '@/router'
import { useGame } from '@/stores/game';
import type { AxiosError } from "axios";
import type { Entry } from "@/types/Entry";

const entries = ref<Entry[]>()
const gameStore = ref()
const route = useRoute()

gameStore.value = useGame()

function getAllEntries(gameId: string | string[]) {
  gameStore.value
    .getEntries(gameId)
    .then((g: Entry[]) => {
      entries.value = g
    })
    .catch((err: AxiosError) => {
      if (err.response?.status == 401) {
        router.push({name: "logout"})
      } else {
        console.log(err)
      }
    })
}

onMounted(() => {
  getAllEntries(route.params.id)
})

watch(
  () => route.params,
  (toParams) => {
    getAllEntries(toParams.id)
  })

</script>

<template>
  <div v-for="entry in entries" class="column">
    <h2> turn {{ entry.sequence + 1 }}</h2>
    <div v-if="entry && entry.sentence">
      <p>
        <router-link :to="{
          name: 'entry',
          params: {
            id: entry.id
          }
        }"> {{ entry.sentence }}
        </router-link>
      </p>
    </div>
    <div v-if="entry && entry.drawing">
      <router-link :to="{
        name: 'entry',
        params: {
          id: entry.id
        }
      }">
        <img style="width: 100%;" v-bind:src="entry.drawing" alt="drawing" />
      </router-link>
    </div>
    <hr />
  </div>
</template>

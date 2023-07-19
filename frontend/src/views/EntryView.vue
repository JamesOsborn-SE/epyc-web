<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useGame } from '@/stores/game';
import { Entry } from '@/types/Entry';


const gameStore = useGame()
const entry = ref()
const props = defineProps({
  id: {
    type: String,
    required: true,
  }
})
onMounted(() => {
  gameStore
    .getEntry(props.id)
    .then((e: Entry) => {
      entry.value = e
    })
    .catch(
      console.log("oof")
    )
})

</script>

<template>
  <div class="about">
    <div v-show="entry && entry.sentence">
        <h2>Draw this sentence</h2>
        {{ entry.sentence }}
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

<template>
  <div class="column">
    <img :src="image" alt="a drawing" class="thumbnail"/>
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
    }
  },
  mounted() {
    const gameStore = useGame()
    gameStore
    .getLastImageEntry(this.gameId)
    .then((i: Entry)=>{
      this.image = i.drawing as string
    })
  },
  methods: {

  }
}

</script>

<style>

.thumbnail{
  align-self: center;
  width: 30%;
}

</style>
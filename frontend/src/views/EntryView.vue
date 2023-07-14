<script setup lang="ts"> 
    import { useGame } from '@/stores/game';
    import { defineProps, onMounted, ref } from "vue"
    import { Entry } from '@/types/Entry';
    
    const gameStore = useGame()
    const entry = ref()
    const props = defineProps({
      id: {
        type: String,
        required: true,
      }
    })
    onMounted( () => {
        gameStore
        .getEntry(props.id)
        .then( (e: Entry) =>{
          entry.value = e
        })
    } )

</script>

<template>
  <div class="about">
    <h1>{{ gameStore.getGame.id }}</h1>
    <div v-show="entry">
      {{ entry }}
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

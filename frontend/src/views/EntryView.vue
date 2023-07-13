<script setup lang="ts"> 
    import { useGame } from '@/stores/game';
    import Paint from '../components/Paint.vue'
    import { defineProps, onMounted } from "vue"
    import { useRouter } from "vue-router"
    import type { Entry } from '@/types/Entry';
    
    const gameStore = useGame()
    const props = defineProps( {
      id: {
        type: String,
        required: true,
      }
    })
    onMounted( () => {
        console.log(props.id)
        const e = gameStore.getEntry(props.id)
        // debugger
        e.then( (r: Entry) =>{
          console.log(r)
        })
    } )

</script>


<template>
  <div class="about">
    <h1>{{ $route.params.id }}</h1>
    <div v-if="$">

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

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useGame } from '@/stores/game';
import type { Game } from '@/types/Game';

const gameStore = useGame()
const sentence = ref(String())
const isSubmitting = ref(false)
const errors = ref([])

function onSubmit(event: Event) {
  isSubmitting.value = true
  event.preventDefault()
  gameStore.newGame(sentence.value).then((game: Game) => {
    const firstEntry = game.entries[0].id 
    router.push({ name: "entry", params: { id: firstEntry} })
  })
  isSubmitting.value = false
}

</script>

<template>
  <div>
    <h1>New Game</h1>
    <form :onsubmit="onSubmit">
      <div class="mb-3">
        <label>Sentence</label>
        <input class="long" v-model="sentence" :required="true" pattern='(\p{L}+ +){3,}.*' title="four or more words">
      </div>
      <div>
        <button class="btn btn-primary" type="submit" value="submit" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
          Start new game
        </button>
      </div>
      <p v-if="errors.values.length">
        <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      </p>
    </form>
  </div>
</template>

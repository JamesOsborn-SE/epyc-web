<script lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from 'vue-router'
import router from '@/router'
import { useGame } from '@/stores/game';
import { Entry } from '@/types/Entry';
import type { AxiosError } from "axios";
import Paint from "@/components/Paint.vue";

const imageData = ref()
const entry = ref()
const gameStore = ref()
let routeId = ""
const sentence = ref(String())
const isSubmitting = ref(false)
const errors = ref([])

export default {
  created(){
    this.$watch(
      () => this.$route.params,
      (toParams) => {
        gameStore.value
        .getEntry(toParams.id)
        .then((e: Entry) => {
          entry.value = e
          console.log("entry", e)
          imageData.value = "" + e.drawing
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
  setup(props) {
    gameStore.value = useGame()
    const route = useRoute()

    onMounted(() => {
      gameStore.value
        .getEntry(route.params.id)
        .then((e: Entry) => {
          entry.value = e
          console.log("entry", e)
          imageData.value = "" + e.drawing
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
  components: {
    Paint
  },
  methods: {
    handleSaveImage(imageBlob: Blob | null) {
      if (!imageBlob) {
        return
      }
      let reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = function () {
        let base64data = reader.result;
        if (base64data) {
          const newEntry = new Entry(null, null, null, entry.value.game_id, entry.value.sequence + 1, null, base64data)
          gameStore.value
            .newEntry(newEntry)
            .then((e: Entry) => {
              const entryId = e.id
              router.push({ name: 'entry', params: { id: entryId } })
            })
        }
      }
    },
    handleSentenceSave(event: Event) {
      isSubmitting.value = true
      event.preventDefault()
      console.log("sentence", sentence.value)
      const newEntry = new Entry(null, null, null, entry.value.game_id, entry.value.sequence + 1, sentence.value, null)
      gameStore.value
        .newEntry(newEntry)
        .then((e: Entry) => {
          const entryId = e.id
          router.push({ name: 'entry', params: { id: entryId } })
        })
      isSubmitting.value = false
    }
  },
  data() {
    return {
      entry,
      imageData,
      sentence,
      isSubmitting,
      errors,
    }
  }
}
</script>

<template>
  <div class="about">
    <div v-if="entry && entry.sentence">
      <h2>Draw this sentence</h2>
      {{ entry.sentence }}
      <Paint @save="handleSaveImage" />
    </div>
    <div v-if="entry && entry.drawing">
      <h2>sentence this drawing</h2>
      <img style="width: 100%;" v-bind:src="imageData" alt="drawing" />
      <form :onsubmit="handleSentenceSave">

        <div class="mb-3">
          <label class="form-label">Sentence</label>
          <input v-model="sentence" :required="true" pattern='(\p{L}+ +){3,}.*' title="four or more words and cannot start with a number">
        </div>
        <div class="mb-3">
          <button class="btn btn-primary" type="submit" value="submit" :disabled="isSubmitting">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
            Submit Sentence
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

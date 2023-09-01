<script lang="ts">
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import router from '@/router'
import { useGame } from '@/stores/game';
import { Entry } from '@/types/Entry';
import type { AxiosError } from "axios";
import Paint from "@/components/Paint.vue";
import { useAuth } from "@/stores/auth";

const imageData = ref()
const entry = ref()
const gameStore = ref()
const sentence = ref(String())
const isSubmitting = ref(false)
const errors = ref([])
const path = ref("")

export default {
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams) => {
        sentence.value = ""
        imageData.value = null
        gameStore.value
          .getEntry(toParams.id)
          .then((e: Entry) => {
            entry.value = e
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
  setup() {
    gameStore.value = useGame()
    const route = useRoute()
    path.value = route.fullPath
    onMounted(() => {
      gameStore.value
        .getEntry(route.params.id)
        .then((e: Entry) => {
          entry.value = e
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
          const newEntry = new Entry(null, null, null, entry.value.game_id, entry.value.sequence + 1, null, base64data as string)
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
      const newEntry = new Entry(null, null, null, entry.value.game_id, entry.value.sequence + 1, sentence.value, null)
      gameStore.value
        .newEntry(newEntry)
        .then((e: Entry) => {
          const entryId = e.id
          router.push({ name: 'entry', params: { id: entryId } })
        })
      isSubmitting.value = false
    },
    endGame(event: Event) {
      gameStore.value
        .endGame(entry.value.game_id)
        .then(() => {
          router.push({ name: 'game', params: { id: entry.value.game_id } })
        })
    },
    async shareThis(event: Event) {
      const auth = useAuth()
      const code = await auth.getCode(path)
      const shareData = {
        title: "Invite friends",
        url: `https://${location.host}/login?code=${code}`,
      }
      try {
        await navigator.share(shareData);
        console.log("shared successfully")
      } catch (err) {
        console.log("share err", err);
      }
    },
    canShare(): boolean {
      const canShare = 'share' in window.navigator;
      return canShare
    },
    async copyToClipboard() {
      const auth = useAuth()
      const code = await auth.getCode(path.value)
      const url = `https://${location.host}/login?code=${code}`
      navigator.clipboard.writeText(url).then(
        () => {
          console.log("clipboard successfully set")
        },
        () => {
          console.log("clipboard write failed")
        },
      );
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
  <div>
    <div v-if="entry && entry.sentence" class="column">
      <button v-if="canShare()" class="btn btn-secondary" value="shareThis" :disabled="isSubmitting" :onclick="shareThis">
        <span v-show="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
        share
      </button>
      <button v-if="!canShare()" class="btn btn-secondary" value="shareThis" :disabled="isSubmitting" :onclick="copyToClipboard">
        <span v-show="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
        copy sharable link to clipboard
      </button>
      <h2>Draw this sentence</h2>
      <p> {{ entry.sentence }} </p>
      <Paint @save="handleSaveImage" />
    </div>
    <div v-if="entry && entry.drawing" class="column">
      <h2>sentence this drawing</h2>
      <img style="width: 100%;" v-bind:src="imageData" alt="drawing" />
      <form style="width: 100%;" :onsubmit="handleSentenceSave">

        <div class="mb-3" style="margin-top: 1em;">
          <label class="form-label">Sentence</label>
          <input class="long" v-model="sentence" :required="true" pattern='(\p{L}+ +){3,}.*'
            title="four or more words and cannot start with a number">
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
    <button class="btn btn-secondary" type="submit" value="endGame" :disabled="isSubmitting" :onclick="endGame">
      <span v-show="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
      End Game For All
    </button>
  </div>
</template>

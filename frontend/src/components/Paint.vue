<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Painterro from 'painterro'
const emit = defineEmits(['save'])

</script>

<template>
  <div id="painterro" class="paint"></div>
  <button class="btn btn-primary" type="submit" value="submit" :onclick="add_blob_from_drawing">    
    Submit Drawing
  </button>
</template>

<script lang="ts">
const mimePng = 'image/png';
export default {
  name: 'Paint',
  data() {
    return {
      painterro: null,
      imageBlob: null,
    }
  },
  mounted() {
    const paint = Painterro({
      id: 'painterro',
      colorScheme: {
        main: '#f8f8f8',
        control: '#d5d5d5',
        controlContent: '#434649'
      },
      hiddenTools: ['crop', 'select', 'text', 'rotate', 'resize', 'open', 'close', 'zoomin', 'zoomout', 'settings', 'pixelize', 'file', 'save'],
      defaultTool: 'brush',
      defaultLineWidth: 8,
      activeColor: '#000000',
      activeColorAlpha: '1',
      availableEraserWidths: [1, 2, 4, 8, 16, 64],
      availableLineWidths: [1, 2, 4, 8, 16, 64],
      availableArrowLengths: [10, 40, 100],
      saveHandler: (image: { asBlob: (arg0: string) => BlobPart; }, done: (arg0: boolean) => void) => {
        const blob = image.asBlob(mimePng)
        this.add_blob(blob)
        done(true)
      }, 
     })
    this.painterro = paint
    paint.show()
  },
  methods: {
    add_blob(data: BlobPart) {
      const blob = new Blob([data], {
        type: mimePng,
      });
      this.$emit('save', blob)
    },
    add_blob_from_drawing() {
      this.painterro.save();
    }
  }
}

</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.paint {
  position: relative;
  align-self: center;
  height: calc(min(80vh, 80vw) + 40px);
  width: min(80vh, 80vw);
}
</style>

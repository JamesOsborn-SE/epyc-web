<template>
  <div style="display: flex; flex-direction: column;">
    <h2>{{ msg }}</h2>
    <h3>Draw this ^^</h3>
    <div id="painterro" class="paint"></div>
  </div>
</template>

<script>
import Painterro from 'painterro'

export default {
  name: 'Paint',
  data () {
    return {
      painterro: null,
      msg: 'A cat winks at you with the grace of a very sleepy toddler.'
    }
  },
  mounted () {
    this.painterro = Painterro({
      id: 'painterro',
      colorScheme: {
        main: '#f8f8f8',
        control: '#d5d5d5',
        controlContent: '#434649'
      },
      hiddenTools: ['crop', 'select', 'text', 'rotate', 'resize', 'open', 'close', 'zoomin', 'zoomout', 'settings', 'pixelize', 'file'],
      defaultTool: 'brush',
      defaultLineWidth: 8,
      activeColor: '#000000',
      activeColorAlpha: '1',
      availableEraserWidths: [1, 2, 4, 8, 16, 64],
      availableLineWidths: [1, 2, 4, 8, 16, 64],
      availableArrowLengths: [10, 40, 100],
      saveHandler: (image, done) => {
        const type = 'image/png'
        const file = new File([image.asBlob(type)], 'file.png', {
          type: type
        })
        this.add_file(file)
        done(true)
      }
    })
    this.painterro.show()
  },
  methods: {
    add_file (file) {
      console.log(file)
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
  height: calc(min(80vh,80vw) + 40px);
  width: min(80vh,80vw);
}
</style>

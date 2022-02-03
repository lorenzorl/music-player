<template>
  <div class="" :class="{ 'selected': !paused}">
    <div class="song" @click="change">
      <div class="song__title">
        {{ song.name }}
      </div>
      <div class="song__author">
        {{ song.author}}
      </div>
    </div>
    <div class="button button--small" 
      @click="play(index)"
      v-if="paused"
    >
      <font-awesome-icon size="xs" icon="play"/>
    </div>
    <div class="button button--small button--selected" 
      @click="pause(index)"
      v-if="!paused"
    >
      <font-awesome-icon size="xs" icon="pause"/>
    </div>
  </div>
</template>
<script>
  
export default {
  name: 'song',
  props: {
    song: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    paused: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    currentSong(){
      return this.$store.state.currentSong;
    }
  },
  methods: {
    play(index){
      const current = this.currentSong;
      if (current === null) {
        this.$store.dispatch('setCurrentSong', index);
      }
      if (current === null || current !== index) {
        this.$store.dispatch('changeSong', index);
        return;
      }
      this.$store.dispatch('playPlayer');
    },
    pause(){
      this.$store.dispatch('pausePlayer');
    },
    change(){
      const current = this.currentSong;
      if (current === null) {
        this.$store.dispatch('setCurrentSong', this.index);
      }
      if (current === null || current !== this.index) {
        this.$store.dispatch('changeSong', this.index);
      }
      this.$router.push('/player');
    }
  }
}

</script>
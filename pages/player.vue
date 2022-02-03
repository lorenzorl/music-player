<template>
  <div class="app">
    <header class="header">
      <div class="button" @click="$router.go(-1)">
        <font-awesome-icon icon="arrow-left"/>
      </div>
      <h1 class="header__title">Reproductor de Mel</h1>
      <div class="button" @click="stop">
        <font-awesome-icon icon="stop"/>
      </div>
    </header>
    <main class="main">
      <div class="image__wrapper">
        <div class="image image--big">
          <img :src="`/${currentThumbnail}`">
        </div>
      </div>
      <div class="song song--player">
        <div class="song__title">
          {{ song.name }}
        </div>
        <div class="song__author">
          {{ song.author}}
        </div>
      </div>
      <div class="player">
        <PlayerBar :audio="audio" :inter="interval"/>
        <div class="player__controls">
          <div class="button button--big" @click="prevSong">
            <font-awesome-icon icon="chevron-left"/>
          </div>
          <div 
            class="button button--big" 
            v-if="song.paused"
            @click="play"
          >
            <font-awesome-icon icon="play"/>
          </div>
          <div 
            class="button button--big button--selected" 
            v-else
            @click="pause"
          >
            <font-awesome-icon icon="pause"/>
          </div>
          <div class="button button--big" @click="nextSong">
            <font-awesome-icon icon="chevron-right"/>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
    return {
      interval: true
    }
  },
  computed: {
    song(){
      return this.$store.state.songs[this.$store.state.currentSong]
    },
    audio(){
      return this.$store.state.audio;
    },
    currentThumbnail(){
      return this.$store.getters.currentThumbnail;
    }
  },
  methods: {
    play(){
      this.interval = true;
      this.$store.dispatch('playPlayer');
    },
    pause(){
      this.interval = false;
      this.$store.dispatch('pausePlayer');
    },
    stop(){
      this.interval = false;
      this.$store.dispatch('stopPlayer');
    },
    nextSong(){
      this.$store.dispatch('nextSong');
    },
    prevSong(){
      this.$store.dispatch('prevSong');
    }
  }
}
</script>

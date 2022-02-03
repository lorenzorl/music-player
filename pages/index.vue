<template>
  <div class="app">
    <header class="header">
      <h1 class="header__title">Reproductor de Mel</h1>
    </header>
    <main class="main">
      <div class="image__wrapper">
        <div class="button" @click="like" >
          <font-awesome-icon icon="heart" :class="{ 'liked' : liked }"/>
        </div>
        <div class="image">
          <img :src="`/${currentThumbnail}`">
        </div>
        <div class="button">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-heart fa-w-16" style="fill: #c6c4c5;">
            <path style="transform: scale(1.4)" d="M51,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S79.05,153,51,153z M357,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S385.05,153,357,153z M204,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S232.05,153,204,153z"/>
          </svg>
        </div>
      </div>
      <div class="list">
        <Song 
          class="list__item" 
          v-for="(song, index) in songs" 
          :song="song"
          :index="index"
          :paused="song.paused"
          :key="`s${index}`"
        />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'index',
  computed: {
    songs(){
      return this.$store.state.songs;
    },
    currentThumbnail(){
      return this.$store.getters.currentThumbnail;
    },
    liked(){
      return this.$store.getters.liked;
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
    like(){
      this.$store.dispatch('like');
    },
    change(){
    }
  },
  beforeCreate(){
    if(process.browser){
      let positions = [];
      const ids = this.$store.state.songs.forEach((song, index) => {
        const liked = localStorage.getItem(song.id + '_liked');
        if(liked){
          positions.push(index);
        }
      });
      
      
      positions.forEach(pos => {
        this.$store.commit('setLike', pos);
      });
    }
  },
  created(){
    if(process.browser){
      this.$store.dispatch('initAudio');
    }
  }
}
</script>

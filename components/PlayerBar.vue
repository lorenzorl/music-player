<template>
  <div class="player-bar">
    <div class="player-bar__track">
      <div class="player-bar__shadow" :style="{ width : percent }"></div>
      <div class="player-bar__thumb" 
        ref="sliderThumb" 
        :style="{ left : percent }"></div>
    </div>
    <div class="player-bar__text">{{ time }}</div>
  </div>
</template>
<script>
  
export default {
  name: 'PlayerBar',
  data(){
    return {
      parentNode: null,
      currentTime: 0,
      interval: null
    }
  },
  props: ['audio', 'inter'],
  computed: {
    time(){
      let min = Math.floor(this.currentTime / 60 );
      if(min < 10) min = '0' + min;

      let sec = Math.floor(this.currentTime % 60 );
      if(sec < 10) sec = '0' + sec;

      return min + ':' + sec
    },
    percent(){
      return ((this.currentTime / this.audio.duration) * 100) + '%';
    }
  },
  watch: {
    inter(newVal){
      if (newVal) {
        this.initInterval();
      }
      else {
        this.clearInterval();
      }
    }
  },
  methods: {
    onMouseMove(e){
      e.preventDefault();
      const thumb = this.$refs.sliderThumb;
      const shadow = thumb.previousElementSibling;
      const text = thumb.parentNode.nextElementSibling;
      const targetRect = this.parentNode.getBoundingClientRect();
      let x = e.pageX - targetRect.left;

      if (x > targetRect.width) { x = targetRect.width};
      if (x < 0){ x = 0};

      const nx = x - (thumb.getBoundingClientRect().width / 2);

      thumb.style.left = `${nx}px`;

      const shadowWidth = Math.floor((nx * 100) / targetRect.width);
      shadow.style.width = `${shadowWidth}%`;

      this.$store.dispatch('setCurrentTime', this.getTimefromPercent(shadowWidth));

      // text.textContent = `${shadowWidth}%`;
    },
    onMouseUp(e){
      e.preventDefault();
      window.removeEventListener('mousemove', this.onMouseMove);
    },
    getTimefromPercent(percent){
      return this.max * (percent / 100);
    },
    initInterval(){
      this.interval = setInterval(() => {
        this.currentTime = this.$store.state.audio.currentTime;
        console.log(this.currentTime);
      }, 1000);
    },
    clearInterval(){
      clearInterval(this.interval);
    }
  },
  mounted(){
    this.parentNode = this.$refs.sliderThumb.parentNode;
    this.parentNode.addEventListener('mousedown', e => {
      this.onMouseMove(e);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    });

    this.initInterval();
  },
  beforeDestroy(){
    this.clearInterval();
  }
}

</script>
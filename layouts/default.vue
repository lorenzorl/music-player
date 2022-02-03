<template>
  <div style="width: 100%; height: 100%;">
    <div class="iphone" v-if="!isMobile" >
      <div class="iphone-top">
        <span class="camera"></span>
        <span class="sensor"></span>
        <span class="speaker"></span>
      </div>
      <div class="top-bar"></div>
      <div class="iphone-screen">
        <Nuxt />
      </div>
      <div class="buttons">
        <span class="on-off"></span>
        <span class="sleep"></span>
        <span class="up"></span>
        <span class="down"></span>
      </div>
      <div class="bottom-bar"></div>
      <div class="iphone-bottom">
        <span></span>
      </div>
    </div>
    <template v-else>
      <Nuxt />
    </template>
  </div>
</template>
<script>
export default {
  name: "Default",
  data(){
    return {
      isMobile: false
    }
  },
  beforeMount(){
    this.isMobile = window.innerWidth < 500 ? true : false;
    window.addEventListener('resize', e => {
      console.log(this);
      console.log(this.isMobile);
      if(window.innerWidth < 500){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
}
</script>
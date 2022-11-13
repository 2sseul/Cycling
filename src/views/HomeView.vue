<template>
  <div class="home">
    <weather-box class="weather"></weather-box>
    <p ref='typing' id="typing"></p>
  </div>
</template>

<script>
import WeatherBox from '@/components/WeatherBox.vue';

export default {
  name: 'HomeView',
  components: {
    WeatherBox,
  },
  data() {
    return {
      typoLength: 0,
      text: '안녕하세요!',
      typingSpeed: 100,
    }
  },
  methods: {
    typingOnEffect() {
      const mytext = this.$refs.typing;
      if (this.typoLength < this.text.length) {
        mytext.innerHTML += this.text[this.typoLength++];
        setTimeout(this.typingOnEffect, this.typingSpeed);
      } else {
        clearTimeout();
        setTimeout(this.typingOutEffect, 3000);
      } 
    },
    typingOutEffect() {
      const mytext = this.$refs.typing;
      if (this.typoLength> 0) {
        mytext.innerHTML = this.text.slice(0, this.typoLength-1);
        this.typoLength--;
        setTimeout(this.typingOutEffect, 200);
      } else {
        clearTimeout();
        setTimeout(this.typingOnEffect, 2000);
      }
    }
  },
  mounted() {
    this.typingOnEffect();
  }
}
</script>

<style scoped>

.home {
  background: url('../assets/img/bg_sunset.jpg');
  background-size: cover;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
}

#typing {
  margin: 0;
  padding: 0;
  font-size: 2rem;
  color: #fff;
  font-weight: 600;
  line-height: 3rem;
  margin: 15% 0;
}

#typing::after {
  margin-left: 1px;
  display: inline-block;
  content: "\00a0";
  width: 5px;
  height: 3rem;
  line-height: 3rem;
  background-color: #fff;
  animation: cursorFlicker 0.8s infinite;
}

@keyframes cursorFlicker {
  0% {
    opacity: 100%;
  }
  50% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

.weather {
  position: absolute;
  right: 20px;
}
</style>
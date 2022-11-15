<template>
  <div class="video_container" ref="container">
    <div class="video_blur"></div>
    <div class="inner_container">
      <div class="temp"></div>
    </div>
    <div class="list">
      <video-list></video-list>
      <video-list></video-list>
      <video-list></video-list>
    </div>
    <i @click="moveTop" class="fa-solid fa-circle-chevron-up btn_moveTop"></i>
  </div>
</template>

<script>
import VideoList from '@/components/video/VideoList.vue';
import { mapState } from 'vuex';
export default {
    name: 'VideoView',
    components: {
      VideoList,
    },
    methods: {
      classChanger() {
        const container = this.$refs.container;
        if (this.isNightView) {
          container.classList.add("dark");
        } else {
          container.classList.remove("dark");
        }
      },
      moveBottom() {
        window.scroll({
          behavior: 'smooth',
          top: document.body.offsetHeight,
        });
      },
      moveTop() {
        window.scroll({
          behavior: 'smooth',
          top: document.body.offsetTop,
        });
      }
    },
    computed: {
      isNightView() {
        return this.$store.getters.getIsNightView;
      },
      ...mapState([
        'videos',
      ]),
    },
    watch: {
      isNightView(val) {
        this.classChanger();
        return val;
      }
    },
    mounted() {
        this.classChanger();
        setTimeout(this.moveBottom, 300);
    },
    destroyed() {
      clearTimeout();
    }
}
</script>

<style scoped>

.video_blur {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 100vh;
  transition: .5s ease;
}

.video_container.dark .video_blur {
  background-color: rgba( 0, 0, 0, 0.3 );
}

.video_container {
  background: url('../assets/img/bg/bg_video.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200vh;
  display: flex;
  justify-content: center;
  z-index: 1;
}
.inner_container {
    width: 80%;
    height: 80%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    transition: .5s ease;
    position: absolute;
    left: 10%;
    top: 120px;
    box-shadow: rgba(0, 0, 0, 0.35) 0 10px 15px;
    background-color: rgba( 255, 255, 255, 0.5 );
    overflow: hidden;
}
.video_container.dark .inner_container {
    background-color: rgba( 0, 0, 0, 0.5 );
}

.list {
  width: 90%;
  position: absolute;
  top: 115%;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.8);

}

.btn_moveTop {
  color: rgba(255, 255, 255, 0.6);
  font-size: 3rem;
  position: fixed;
  right: 20px;
  bottom: 20px;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.btn_moveTop:hover {
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
}
</style>
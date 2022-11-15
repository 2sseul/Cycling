<template>
  <div class="video_container">
    <div ref="inner" class="inner_container">
      <!-- <video-list v-for="obj in videos" :key="obj.id" :list="obj.data"></video-list> -->
    </div>
  </div>
</template>

<script>
// import VideoList from '@/components/video/VideoList.vue'
import { mapState } from 'vuex';
export default {
    name: 'VideoView',
    components: {
      // VideoList,
    },
    methods: {
        classChanger() {
        const inner = this.$refs.inner;
        if (this.isNightView) {
          inner.classList.add("dark");
        } else {
          inner.classList.remove("dark");
        }
      },
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
      console.log(this.videos);
    }
}
</script>

<style scoped>
.video_container {
  background: url('../assets/img/bg/bg_bike.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 1;
}
.inner_container {
    width: 80%;
    height: 800px;
    left: 10%;
    top: 120px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transition: .5s ease;
    position: fixed;
    box-shadow: rgba(0, 0, 0, 0.35) 0 10px 15px;
    background-color: rgba( 255, 255, 255, 0.6 );
    overflow: hidden;
    padding: 20px;
}
.inner_container.dark {
    background-color: rgba( 0, 0, 0, 0.6 );
}
</style>
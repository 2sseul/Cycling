<template>
  <div class="video_container" ref="video_container">
    <div class="video_blur"></div>
    <div ref="inner" class="inner_container">
      <video-detail @toggleSize="toggleSize"></video-detail>
    </div>
    <div ref="list" class="list">
      <video-list
          v-for="(list, idx) in videos"
          :key="list.id" :listId="idx"

          :title="list.title"
          :list="list.data"
          @moveTop="moveTop"
      >
      </video-list>
    </div>
    <i @click="moveTop" class="fa-solid fa-circle-chevron-up btn_moveTop"></i>
  </div>
</template>

<script>
import VideoList from '@/components/video/VideoList.vue';
import VideoDetail from '@/components/video/VideoDetail.vue';
import { mapState } from 'vuex';
export default {
    name: 'VideoView',
    components: {
      VideoList,
      VideoDetail,
    },
    data() {
      return {
        timeoutId: '',
      }
    },
    methods: {
      classChanger() {
        const video_container = this.$refs.video_container;
        if (this.isNightView) {
          video_container.classList.add("dark");
        } else {
          video_container.classList.remove("dark");
        }
      },
      moveBottom(offset) {
        const off = offset ? offset : 0;
        window.scroll({
          behavior: 'smooth',
          top: document.body.offsetHeight - off,
        });
      },
      moveTop() {
        window.scroll({
          behavior: 'smooth',
          top: document.body.offsetTop,
        });
      },
      toggleSize(isShow) {
        const inner = this.$refs.inner;
        const list = this.$refs.list;
        if (isShow) {
          inner.classList.add('extend');
          list.classList.add('hidden');
          this.moveBottom(1010);
        } else {
          inner.classList.remove('extend');
          list.classList.remove('hidden');
          this.moveTop();
        }
      },
    },
    computed: {
      isNightView() {
        return this.$store.getters.getIsNightView;
      },
      ...mapState([
        'videos',
        'isShowVideoDetail',
      ]),
    },
    watch: {
      isNightView(val) {
        this.classChanger();
        return val;
      },
    },
    beforeMount() {
      this.$store.dispatch('getVideoList');
    },
    mounted() {
      this.classChanger();
      this.timeoutId = setTimeout(this.moveBottom, 300);
      console.log(this.videos);
    },
    destroyed() {
      clearTimeout(this.timeoutId);
    }
}
</script>

<style scoped>
.extend {
  height: 180vh!important;
}

.hidden {
  height: 0px;
}

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
  width: 80%;
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
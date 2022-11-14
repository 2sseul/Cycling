<template>
  <div class="container">
    <video-detail class="detail"></video-detail>
    <div class="videoList"></div>
  </div>
</template>

<script>
import VideoDetail from '@/components/video/VideoDetail.vue';
export default {
    name: 'VideoView',
    components: {
        VideoDetail,
    }
}
</script>

<style scoped>
.container {
  background: url('../assets/img/bg_video.jpg');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.detail {
    
}
</style>
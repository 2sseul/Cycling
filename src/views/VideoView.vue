<template>
  <div class="container">
    <video-detail class="detail"></video-detail>
    <video-list class="list"></video-list>
  </div>
</template>

<script>
import VideoDetail from '@/components/video/VideoDetail.vue';
import VideoList from '@/components/video/VideoList.vue';

export default {
    name: 'VideoView',
    components: {
        VideoDetail,
        VideoList,
    }
}
</script>

<style scoped>
.container {
  background: url('../assets/img/bg_video.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.detail {
  width: 60%;
  min-width: 480px;
  min-height: 270px;
  margin-top: 140px;
  margin-bottom: 40px;
}

.list {
  width: 100px;
  height: 2000px;
  border: 1px solid black;
}
</style>
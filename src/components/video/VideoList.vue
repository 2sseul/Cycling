<template>
  <div class="video_list">
    <div class="video_title">{{ title }}</div>
    <div class="wrapper">
      <video-list-section
            v-for="i in sectionCnt"
            :key="i"
            :sectionId="i"
            :listId="listId"
            :videoSection="list.slice((i-1)*4, (i-1)*4+4)"
            :sectionCnt="sectionCnt"
            @moveTop="moveTop">
      </video-list-section>
    </div>
  </div>
</template>

<script>
import VideoListSection from './VideoListSection.vue';
export default {
  name: "VideoList",
  components: {
    VideoListSection,
  },
  props: {
    list: Array,
    title: String,
    listId: Number,
  },
  computed: {
    sectionCnt() {
      return this.list.length / 5;
    }
  },
  methods: {
    moveTop() {
      this.$emit("moveTop");
    }
  }
};
</script>

<style scoped>
.video_list {
  width: 100%;
  height: 190px;
  margin: 20px 0;
}

.video_list .video_title {
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: #eee;
  margin-bottom: 2px;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(5, 100%);
  overflow: hidden;
  scroll-behavior: smooth;
}
.wrapper section {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, auto);
  margin-bottom: 20px;
}
.wrapper section .item {
  padding: 0 2px;
  transition: .5s all;
  width: 280px;
}

.wrapper section .item:hover {
  margin: 0 40px;
  transform: scale(1.2);
}

.wrapper section .item img {
  width: 100%;
}

section a {
  position: absolute;
  color: #fff;
  text-decoration: none;
  font-size: 6em;
  background: rgb(0, 0, 0);
  width: 80px;
  padding: 20px;
  text-align: center;
  z-index: 1;
}

section a:nth-of-type(1) {
  top: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    -90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
}

section a:nth-of-type(2) {
  top: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>
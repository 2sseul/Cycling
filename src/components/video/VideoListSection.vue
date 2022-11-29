<template>
  <section :id="'section_'+listId+'_'+sectionId">
    <a v-if="sectionId == 1" :href="'#section_' + listId + '_' + sectionCnt" class="arrow__btn">‹</a>
    <a v-else :href="'#section_' + listId + '_' + (sectionId - 1)" class="arrow__btn">‹</a>
        <VideoListItem
            v-for="(video, idx) in videoSection"
            :key="idx + sectionId"
            :video="video"
            @moveTop="moveTop">
        </VideoListItem>
    <a v-if="sectionId == sectionCnt" :href="'#section_' + listId + '_1'" class="arrow__btn">›</a>
    <a v-else :href="'#section_' + listId + '_' + (sectionId + 1)" class="arrow__btn">›</a>
  </section>
</template>

<script>
import VideoListItem from './VideoListItem.vue';
export default {
    name: 'VideoListSection',
    components: {
        VideoListItem,
    },
    props: [
        'sectionId',
        'videoSection',
        'sectionCnt',
        'listId',
    ],
    methods: {
      moveTop() {
        this.$emit('moveTop');
      }
    }
}
</script>

<style scoped>
section {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, auto);
  margin-bottom: 20px;
}

section a {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  font-size: 6em;
  background: rgb(0, 0, 0);
  width: 40px;
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
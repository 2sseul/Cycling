<template>
  <section id="">
    <a href="#section3" class="arrow__btn">‹</a>
        <VideoListItem></VideoListItem>
    <a href="#section2" class="arrow__btn">›</a>z
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
        'videoSection'
    ],
}
</script>

<style>

</style>
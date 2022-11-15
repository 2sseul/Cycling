<template>
  <div class="list_container">
    <!-- <div>{{ list.name }}</div> -->
    <carousel>
        <!-- <video-list-item v-for="(item, index) in list" :key="index" :video="item"></video-list-item> -->
    </carousel>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
// import VideoListItem from '@/components/video/VideoListItem.vue';

export default {
    name: 'VideoList',
    components: {
        carousel,
        // VideoListItem,
    },
    props: {
        list: Object,
    },
    mounted() {
      // console.log(this.list);
    }
}
</script>

<style scoped>
.list_container {
    width: 100%;
    height: 140px;
}

.list_container {
  text-align: left;
}

</style>
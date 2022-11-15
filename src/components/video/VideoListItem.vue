<template>
  <div class="video_container">

  </div>
</template>

<script>
export default {
    name: 'VideoListItem',
    props: {
        video: Object,
    },
    mounted() {
        
    }
}
</script>

<style scoped>
.video_container {
    width: 190px;
}

.video_container:hover {
    cursor: pointer;
}

.video_container > img {
    width: 100%;
}
</style>
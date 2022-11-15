<template>
  <div class="item_container"></div>
</template>

<script>
export default {
    name: 'VideoListItem',
    props: {
        video: Object,
    },
    mounted() {
        console.log(this.video);
    }
}
</script>

<style>

</style>
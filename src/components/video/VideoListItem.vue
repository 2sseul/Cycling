<template>
    <div class="item" @click="showDetail">
        <img :src="video.thumbnail" alt="thumbnail" />
    </div>
</template>

<script>
export default {
    name: 'VideoListItem',
    props: {
        video: Object,
    },
    methods: {
        showDetail() {
            this.$store.dispatch('selectVideo', this.video);
            this.$emit('moveTop');
        }
    },
}
</script>

<style scoped>
.item {
    padding: 0 2px;
    transition: .5s all;
    width: 280px;
}

.item:hover {
    margin: 0 40px;
    transform: scale(1.2);
    cursor: pointer;
}

.item > img {
    width: 100%;
}
</style>
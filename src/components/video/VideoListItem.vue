<template>
    <div class="item">
        <img
        src="https://occ-0-1567-1123.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABRvngexxF8H1-OzRWFSj6ddD-aB93tTBP9kMNz3cIVfuIfLEP1E_0saiNAwOtrM6xSOXvoiSCMsihWSkW0dq808-R7_lBnr6WHbjkKBX6I3sD0uCcS8kSPbRjEDdG8CeeVXEAEV6spQ.webp"
        alt="Describe Image"
        />
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
.item {
    padding: 0 2px;
    transition: .5s all;
    width: 280px;
}

.item:hover {
    margin: 0 40px;
    transform: scale(1.2);
}

.item > img {
    width: 100%;
}
</style>
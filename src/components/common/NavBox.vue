<template>
  <ul ref="list" class="list">
    <nav-box-item v-for="item in navList" :item="item" :key="item.name"></nav-box-item>
  </ul>
</template>

<script>
import NavBoxItem from './NavBoxItem.vue';

export default {
    name: 'NavBox',
    components: {
        NavBoxItem,
    },
    data() {
      return {
        navList: [
            { url: '', icon: 'fa fa-home fa-2x', name: 'Home' },
            { url: '', icon: 'fa fa-table fa-2x', name: 'Boards' },
            { url: '', icon: 'fa fa-map-marker fa-2x', name: 'Maps' },
            { url: '', icon: 'fa fa-info fa-2x', name: 'Documentation' }
        ],
      }
    },
    methods: {
        classChanger() {
            const list = this.$refs.list;
            if (this.isNightView) {
                list.classList.add("dark");
            } else {
                list.classList.remove("dark");
            }
        },
    },
    computed: {
      isNightView() {
        return this.$store.getters.getIsNightView;
      }
    },
    watch: {
      isNightView(val) {
        this.classChanger();
        return val;
      }
    },
}
</script>

<style scoped>
.list {
    margin: 0;
    padding: 0;
    color: #000;
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 30%;
}
</style>
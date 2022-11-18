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
            { id: 'home', url: '/', icon: 'fa fa-home fa-2x', name: 'Home' },
            { id: 'video', url: '/video', icon: 'fa-brands fa-youtube', name: 'Videos' },
            { id: 'board', url: '/board', icon: 'fa fa-table fa-2x', name: 'Boards' },
            { id: 'calendar', url: '/calendar', icon: 'fa-solid fa-calendar', name:'Calendar' },
            { id: 'mypage', url: '/mypage', icon: 'fa-solid fa-user', name: 'MyPage' }
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

<style>
.list {
    margin: 0;
    padding: 0;
    color: #000;
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 30%;
    overflow: hidden;
}

.list.dark {
  color: #fff;
}

.list a {
  color: #000;
}

.list.dark a {
  color: #fff;
}

</style>
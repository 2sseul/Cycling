<template>
  <div id="app">
    <div id="blur" ref="blur"></div>
    <HeaderView id="header"></HeaderView>
    <router-view/>
  </div>
</template>

<script>
import HeaderView from './views/HeaderView.vue';
import { mapState } from 'vuex';

export default {
    name: 'App',
    components: {
      HeaderView,
    },
    methods: {
      classChanger() {
            const blur = this.$refs.blur;
            if (this.isNightView) {
              blur.classList.add("dark");
            } else {
              blur.classList.remove("dark");
            }
        },
    },
    computed: {
        isNightView() {
            return this.$store.state.isNightView;
        },
        ...mapState([
          'isShowUserInfo',
          'userInfo',
        ]),
    },
    watch: {
        isNightView(val) {
            this.classChanger();
            return val;
        }
    },
    created() {
      // this.$store.dispatch('setVideoList');
      this.$store.dispatch('getUserInfo');
    }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
}

#blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: .5s ease;
}

#blur.dark {
  background-color:rgba(0, 0, 0, 0.3);
}

#header {
  z-index: 2;
}

</style>

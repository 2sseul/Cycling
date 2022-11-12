<template>
  <div id="app">
    <HeaderView></HeaderView>
    <side-menu-view></side-menu-view>
    <router-view/>
  </div>
</template>

<script>
import HeaderView from './views/HeaderView.vue';
import SideMenuView from './views/SideMenuView.vue';
export default {
    name: 'App',
    components: {
      HeaderView,
      SideMenuView,
    }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>

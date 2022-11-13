<template>
  <div ref="header" class="header">
    <div class="side_nav"></div>
    <div class="nav">
        <div class="container_topNav"></div>
        <div>
            <input id='toggle' type="checkbox" @click="toggleView">
            <label for="toggle" class="cont"></label>
        </div>
        <i v-if="isNightView" ref="moon" class="fa-regular fa-moon"></i>
        <i v-else ref="sun" class="fa-regular fa-sun"></i>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HeaderView',
    methods: {
      classChanger() {
        const body = document.querySelector("body");
        const header = this.$refs.header;
        if (this.isNightView) {
          body.classList.remove("bright");
          body.classList.add("dark");
          header.classList.add("dark");
        } else {
          body.classList.remove("dark");
          body.classList.add("bright");
          header.classList.remove("dark");
        }
      },
      toggleView() {
        this.$store.dispatch('toggleView');
      }
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
    mounted() {
      const body = document.querySelector("body");
      body.classList.add("bright");
    }
}
</script>

<style>
:root {
  --point-color: #1c4769;
  --sub-color: #212121;
}

body.dark {
  color: #fff;
  background-color: #1c4769;
}

body.bright {
  color: #000;
  background-color: #fff;
}

.header {
    width: 100%;
    height: 80px;
    background-color: var(--point-color);
    display: flex;
    justify-content: space-between;
    align-content: center;
    z-index: 1;
    transition: .5s ease;
}

.header.dark {
  background-color: var(--sub-color);
}

.nav {
    display: flex;
    align-items: center;
}

.fa-moon, .fa-sun {
    font-size: 1.4rem;
    color: #fff; 
    margin: 20px;
}

.cont {
  height: 20px;
  width: 40px;
  background: #202430;
  border-radius: 80px;
  overflow: hidden;
  cursor: pointer;

  transition: 0.3s;
  display: flex;
  align-items: center;
}

#toggle {
  display: none;
}

#toggle:checked ~ .cont {
  background: whitesmoke;
}

.cont:before {
  content: "";
  margin: 0 5px;
  height: 16px;
  width: 16px;
  background: whitesmoke;
  border-radius: 80px;
  transition: 0.5s;
}

#toggle:checked ~ .cont:before {
  transform: translateX(110%);
  background: #202430;
}
</style>
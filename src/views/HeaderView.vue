<template>
  <div ref="header" class="header">
    <div class="header_blur"></div>
    <div class="logo">logo</div>
    <nav-box class="topNav"></nav-box>
    <div class="darkmode">
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
import NavBox from '../components/common/NavBox.vue';
export default {
    name: 'HeaderView',
    components: {
        NavBox,
    },
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

.header_blur {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  opacity: 0.2;
  background-color: #fff;
  z-index: -1;
  transition: 0.5s ease;
}

body.dark .header_blur {
  background-color: #000;
  opacity: 0.2;
}

body.dark {
  color: #fff;
  background-color: #000;
}

body.bright {
  color: #000;
  background-color: #fff;
}

.header {
    width: 80%;
    height: 60px;
    left: 10%;
    top: 30px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    transition: .5s ease;
    position: fixed;
    box-shadow: rgba(0, 0, 0, 0.35) 0 10px 15px;
    background-color: rgba( 255, 255, 255, 0.4 );
}

.header.dark {
  background-color: rgba( 0, 0, 0, 0.4 );
}

.header .logo {
  width: 50px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}

.darkmode {
  display: flex;
  align-items: center;
}

.fa-moon, .fa-sun {
  font-size: 1.4rem;
  margin: 20px;
}

.fa-sun {
  color: #133337;
}

.fa-moon {
  color: #fff;
}

.cont {
  height: 20px;
  width: 40px;
  background: #133337;
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
  transform: translateX(100%);
  background: #133337;
}
</style>
<template>
  <div class="container">
    <div ref="mypage" class="mypage">
        
    </div>
  </div>
</template>

<script>
export default {
    name: 'MyPageView',
    methods: {
        classChanger() {
        const mypage = this.$refs.mypage;
        if (this.isNightView) {
          mypage.classList.add("dark");
        } else {
          mypage.classList.remove("dark");
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
    mounted() {
        this.classChanger();
    }
}
</script>

<style scoped>
.container {
  background: url('../assets/img/bg/bg_bike.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.mypage {
    width: 80%;
    height: 80%;
    left: 10%;
    top: 120px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    transition: .5s ease;
    position: fixed;
    box-shadow: rgba(0, 0, 0, 0.35) 0 10px 15px;
    background-color: rgba( 255, 255, 255, 0.6 );
}

.mypage.dark {
    background-color: rgba( 0, 0, 0, 0.5 );
}
</style>
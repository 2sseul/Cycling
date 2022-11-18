<template>
  <div class="board_container">
    <div ref="board" class="board">
        <div class="board_nav">
            <i class="fa-solid fa-pen-to-square write"></i>
            <i class="fa-solid fa-list list"></i>
        </div>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BoardView',
    methods: {
        classChanger() {
            const board = this.$refs.board;
            if (this.isNightView) {
                board.classList.add("dark");
            } else {
                board.classList.remove("dark");
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
.board_container {
  background: url('../assets/img/bg/bg_bike.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.board {
  width: 80%;
  height: 80%;
  left: 10%;
  top: 120px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  transition: .5s ease;
  position: fixed;
  box-shadow: rgba(0, 0, 0, 0.35) 0 10px 15px;
  background-color: rgba(255, 255, 255, 0.6);
}

.board.dark {
  background-color: rgba(0, 0, 0, 0.5);
}

.board > .board_nav {
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    height: 55px;
    border: 1px solid black;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.board > .board_nav > i {
    font-size: 1.6rem;
    margin: 0 1px;
}
.board > .board_nav > i:hover {
    font-size: 1.7rem;
    font-weight: 600;
}

</style>
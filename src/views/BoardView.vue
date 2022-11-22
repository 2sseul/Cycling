<template>
  <div class="board_container">
    <div ref="board" class="board">
        <div class="board_nav">
            <div class="board_title">
                <span>사진 게시판</span>
            </div>
            <div class="nav_item">
                <router-link v-for="item in navList"
                            :to="item.link"
                            :key="item.id">
                    <i :class="item.class"></i>
                </router-link>
            </div>
        </div>
        <div class="board_main">
            <router-view :isNightView="isNightView"></router-view>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BoardView',
    data() {
        return {
            pageTitle: '사진 게시판',
            navList: [
                { id: 1, title: '사진 게시판', link: '/board', class: 'fa-solid fa-list btn_list' },
                { id: 2, title: '게시글 등록', link: '/board/write', class: 'fa-solid fa-pen-to-square btn_write' },
            ],
        }
    },
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
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.board > .board_nav > .board_title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-left: 20px;
}

.board > .board_nav > .nav_item {
    display: flex;
    align-items: center;
}

.board > .board_nav > .nav_item > a {
    color: #000;
}
.board.dark > .board_nav > .nav_item > a {
    color: #fff;
}

.board > .board_nav > .nav_item i {
    font-size: 1.6rem;
    margin: 0 20px;
    display: inline-block;
    width: 20px;
}
.board > .board_nav .nav_item i:hover {
    font-size: 1.8rem;
    cursor: pointer;
}

.board > .board_main {
    width: 100%;
    height: calc(100% - 55px);
    padding: 10px 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}

</style>
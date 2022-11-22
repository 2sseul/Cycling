<template>
    <li class="boardItem">
        <img :src="board.imgResource" />
        <div class="boardContent">
        <span class="tagList">{{ board.content.join(" ") }}</span>
        <span class="reg_date">등록일시 : {{ board.reg_date }}</span>
        <span class="ride_km">주행거리 : {{ board.ride_km }}km</span>
        </div>
        <i class="fa-solid fa-trash" @click="deleteBoard"></i>
    </li>
</template>

<script>
export default {
    name: 'BoardItem',
    props: {
        board: Object,
    },
    methods: {
        deleteBoard() {
            this.$store.dispatch("deleteBoard", this.board.board_id);
        }
    },
}
</script>

<style scoped>
.myBoard > .boardListBox > .boardList > .boardItem {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  overflow: hidden;
  transition: .5s ease;
}

.myBoard > .boardListBox > .boardList > .boardItem:hover {
  transform: scale(1.04);
}

.myBoard > .boardListBox > .boardList > .boardItem > img {
  width: 200px;
  object-fit: cover;
  height: 100%;
  border-radius: 10px;
}

.myBoard > .boardListBox > .boardList > .boardItem > .boardContent {
  display: flex;
  width: calc(100% - 200px - 0.8rem);
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 10px;
  box-sizing: border-box;
  font-weight: 600;
}

.myBoard > .boardListBox > .boardList > .boardItem > .boardContent > .tagList {
  font-size: 0.8rem;
}

.myBoard > .boardListBox > .boardList > .boardItem > .boardContent > .reg_date {
  font-size: 0.7rem;
  margin-top: 10px;
  margin-bottom: 4px;
}

.myBoard > .boardListBox > .boardList > .boardItem > .boardContent > .ride_km {
  font-size: 0.7rem;
}

.myBoard > .boardListBox > .boardList > .boardItem > .fa-trash {
  font-size: 0.8rem;
  padding-right: 20px;
  box-sizing: border-box;
  display: inline-block;
  height: 0.8rem;
  position: relative;
  top: 5px;
}

.myBoard > .boardListBox > .boardList > .boardItem > .fa-trash:hover {
  color: red;
  cursor: pointer;
}
</style>
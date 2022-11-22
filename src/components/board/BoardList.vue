<template>
  <div ref="board_list_container" class="board_list_container">
    <div class="board_body">
      <div v-if="boardList.length == 0" class="noPost">등록된 게시글이 없습니다.</div>
      <div v-else class="board_list">
        <board-list-card v-for="board in boardList" :key="board.board_id" :board="board" :likeList="boardLikeList"></board-list-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import BoardListCard from './BoardListCard.vue';
export default {
  name: 'BoardList',
  data() {
    return {
      boardLikeList: [],
    }
  },
  components: {
    BoardListCard,
  },
  computed: {
    ...mapGetters([
      'getBoardList',
      'getBoardLikeList',
    ]),
    ...mapState([
      'boardList',
      'userInfo',
    ])
  },
  watch: {
    getBoardList() {
      
    },
    getBoardLikeList(val) {
      this.boardLikeList = val;
    },
  },
  beforeMount() {
    this.$store.dispatch('getBoardList');
    this.$store.dispatch('getBoardLikeList');
  },
}
</script>

<style scoped>
img {
  width: 100px;
}

.board_list_container {
  width: 100%;
}

.board_list_container > .board_body {
  width: 100%;
  height: 100%;
  top: 0;
  overflow-x: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
}

.board_list_container > .board_body > .noPost {
  position: relative;
  top: -20px;
  font-weight: 600;
}

.board_list_container > .board_body > .board_list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}

</style>
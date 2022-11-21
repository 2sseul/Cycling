<template>
  <div ref="board_list_container" class="board_list_container">
    <div class="board_body">
      <div v-if="boardList.length == 0" class="noPost">등록된 게시글이 없습니다.</div>
      <div v-else class="board_list">
        <div class="board_card" v-for="board in boardList" :key="board.board_id">
          <img :src="`${board.imgResource}`" />
          <ul class="tag_list">
            <li v-for="(tag, index) in board.content" :key="index">
              {{ tag }}
            </li>
          </ul>
          <div class="card_footer">
            <div class="user_info">
              <div class="profile"></div>
              <span class="nickname">{{ board.user_id }}</span>
            </div>
            <div class="like_cnt">
              <i v-if="isCheckLike" @click="updateLikeCnt" class="fa-solid fa-heart"></i>
              <i v-else @click="updateLikeCnt" class="fa-regular fa-heart"></i>
              <span class="cnt">{{ board.like_cnt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'BoardList',
  data() {
    return {
      'isCheckLike': false,
    }
  },
  methods: {
    updateLikeCnt() {
      
    }
  },
  computed: {
    ...mapGetters([
      'getBoardList',
    ]),
    ...mapState([
      'boardList',
      'userInfo',
    ])
  },
  watch: {
    getBoardList() {
      
    },
  },
  beforeMount() {
    this.$store.dispatch('getBoardList');
  },
  mounted() {
    console.log(this.boardList.length);
  }
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

.board_card {
  width: 300px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  color: #000;
  transition: .5s ease;
}

.board_card:hover {
  transform: scale(1.02);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 25px;
}

.board_card > img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}


.board_card > .tag_list {
  width: 100%;
  height: 50px;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  padding-left: 20px;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
}


.board_card > .tag_list > li {
  margin-right: 10px;
}

.board_card > .card_footer {
  width: 100%;
  height: 60px;
  background-color: rgba(225, 225, 225, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.board_card > .card_footer > .user_info {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
}

.board_card > .card_footer > .user_info > .profile {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: white;
}


.board_card > .card_footer > .user_info > .nickname {
  margin-left: 10px;
}

.board_card > .card_footer > .like_cnt {
  display: flex;
  align-items: center;
}

.board_card > .card_footer > .like_cnt > .fa-solid,.fa-heart {
  margin-right: 10px;
  color: red;
  transition: .2s ease;
}

.board_card > .card_footer > .like_cnt > .fa-regular,.fa-heart {
  margin-right: 10px;
  color: #fff;
  transition: .2s ease;
}

.board_card > .card_footer > .like_cnt > .fa-heart:hover {
  cursor: pointer;
  font-size: 1.1rem;
  color: red;
}

.board_card > .card_footer > .like_cnt > .cnt {
  font-weight: 600;
  font-size: 0.9rem;
}
</style>
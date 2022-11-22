<template>
    <div class="board_card">
        <div class="img_box">
            <img :src="`${board.imgResource}`" />
        </div>
        <ul class="tag_list">
            <li v-for="(tag, index) in board.content" :key="index">
                {{ tag }}
            </li>
        </ul>
        <div class="card_footer">
            <div class="user_info">
                <div class="profile"></div>
                <span class="nickname">{{ board.nickname }}</span>
                <span class="ride_km">/ 주행거리 : {{ board.ride_km }}km</span>
            </div>
            <div class="like_cnt">
                <i v-if="isLike" @click="updateLikeCnt" class="fa-solid fa-heart"></i>
                <i v-else @click="updateLikeCnt" class="fa-regular fa-heart"></i>
                <span class="cnt">{{ board.like_cnt }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoardListCard',
    data() {
        return {
            'myBoard': {},
            'isLike': false,
        }
    },
    props: {
        board: Object,
        likeList: Array,
    },
    methods: {
        updateLikeCnt() {
            this.$store.dispatch("toggleBoardLike", {
                'board_id': this.board.board_id,
                'isLike': this.isLike,
            });
        },
        checkIsLike() {
            for (const like of this.likeList) {
                if (like.board_id == this.board.board_id) {
                    this.isLike = true;
                    return;
                }
            }
            this.isLike = false;
        }
    },
  watch: {
    likeList() {
        this.checkIsLike();
    },
    isLike() {

    },
  },
  mounted() {
    this.checkIsLike();
    this.myBoard = this.board;
  },
}
</script>

<style scoped>
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

.board_card > .img_box {
    width: 100%;
    height: 300px;
    overflow: hidden;
    display: flex;
    justify-content: center;
}

.board_card > img {
    width: 100%;
    object-fit: cover;
}


.board_card > .tag_list {
  width: 100%;
  height: 40px;
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
  height: 50px;
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
  margin: 0 10px;
}

.board_card > .card_footer > .user_info > .ride_km {
  font-size: 0.7rem;
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
<template>
  <div class="detail_container">
    <span v-if="!isShowVideoDetail" class="noVideo">선택된 영상이 없습니다.</span>
    <div v-else class="videoBox">
      <div class="videoDetailInfo">
        <div>
          <span class="channelName">{{ video.channel_name }}</span>
          <span class="publishedAt">{{ video.publishedAt }}</span>
        </div>
      </div>
      <div class="video">
        <iframe id="iframe"
            :src="videoURL"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
        <i @click="toggleFavorite" class="fa-solid fa-bookmark"></i>
      </div>
      <div class="commentBox">
        <div v-if="!isShowComment">
          <span @click="toggleShow">댓글보기</span>
          <i class="fa-solid fa-arrow-down"></i>
        </div>
        <div v-else>
          <span @click="toggleShow">댓글숨기기</span>
          <i class="fa-solid fa-arrow-up"></i>
        </div>
        <div class="comments">
          <form @submit.prevent="">
            <input type="text" placeholder="댓글을 남겨주세요." />
            <i class="fa-solid fa-pen"></i>
          </form>
          <div class="margin"></div>
          <div class="noComment" v-if="commentList.length == 0">등록된 댓글이 없습니다</div>
          <div v-else>
            <comment-list></comment-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommentList from '../comments/CommentList.vue';
export default {
  name: 'VideoDetail',
  data() {
    return {
      isShowComment: false,
      commentList: [
        { comment_id: 1, content: '좋은 영상이네요' },
      ],
    }
  },
  components: {
    CommentList,
  },
  methods: {
    toggleFavorite() {
      alert("즐겨찾기 기능 미구현");
    },
    toggleShow() {
      this.isShowComment = !this.isShowComment;
      this.$emit("toggleSize", this.isShowComment);
    }
  },
  computed: {
    videoURL() {
      const videoId = this.video.video_id;
      return `https://www.youtube.com/embed/${videoId}`;
    },
    ...mapState([
      'video',
      'isShowVideoDetail',
    ])
  },
  mounted() {
    this.toggleShow();
    this.$store.state.isShowVideoDetail = true;
  }
}
</script>

<style scoped>
.detail_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.extend {
  height: 120%;
}

.detail_container > .noVideo {
  font-size: 1rem;
  border: none;
}

.detail_container > .videoBox {
  min-width: 480px;
  min-height: 270px;
  width: 100%;
  height: 100%;
}

#iframe {
  width: 1180;
  height: 630;
}

.detail_container > .videoBox > .videoDetailInfo {
  width: 100%;
  height: 40px;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 5px;
  display: flex;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
}

.detail_container > .videoBox > .videoDetailInfo > div {
  width: 1180px;
  margin: 0 auto;
  text-align: left;
}

.detail_container > .videoBox > .videoDetailInfo .channelName {
  font-size: 1.2rem;
  font-weight: 600;
  margin-right: 10px;
}
.detail_container > .videoBox > .videoDetailInfo .publishedAt {
  font-size: 0.8rem;
  margin-right: 10px;
}

.detail_container > .videoBox > .video {
  width: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
}

.detail_container > .videoBox > .video > iframe {
  width: 960px;
  height: 540px;
}

.fa-bookmark {
  font-size: 2rem;
  position: relative;
  top: -10px;
  left: 10px;
  color: #fff;
  transition: 0.2s ease;
  height: 10px;
}

.fa-bookmark:hover {
  color: rgb(230, 230, 3);
  transform: scale(1.02);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
}

.commentBox {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.8);
}

.commentBox > div {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.commentBox > div > span {
  font-size: 0.8rem;
  color: #fff;
}
.commentBox > div > span:hover {
  cursor: pointer;
  font-weight: 600;
}

.commentBox > div > i {
  font-size: 0.8rem;
  margin-top: 3px;
  color: #fff;
}

.comments {
  width: 100%;
  height: 110vh;
  box-sizing: border-box;
  padding: 20px;
  margin-top: 10px;
  z-index: 11;
}

.comments > form {
  display: flex;
  justify-content: center;
}

.comments input {
  border: none;
  background: transparent;
  border-bottom: 1px solid #fff;
  caret-color: #fff;
  height: 1.6rem;
  line-height: 1.6rem;
  width: 80%;
  color: #fff;
}
.comments input:focus {
  outline: none;
  border-bottom: 2px solid #fff;
}

.comments > form > i {
  font-size: 1.2rem;
  color: #fff;
  margin-left: 5px;
}

.margin {
  height: 100px;
}

.noComment {
  color: #fff;
  font-size: 1.4rem;
  margin-top: 20%;
}
</style>
<template>
  <div class="detail_container">
    <span v-if="!isShowVideoDetail" class="noVideo">선택된 영상이 없습니다.</span>
    <div v-else class="videoBox">
      <div class="videoDetailInfo">
        <div>
          <span class="channelName">{{ video.snippet.channelTitle }}</span>
          <span class="publishedAt">{{ video.snippet.publishedAt }}</span>
        </div>
      </div>
      <div class="video">
        <iframe
            width="960"
            height="540"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'VideoDetail',
  data() {
    return {
      isShowComment: false,
    }
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
      const videoId = this.video.id.videoId;
      return `https://www.youtube.com/embed/${videoId}`;
    },
    ...mapState([
      'video',
      'isShowVideoDetail',
    ])
  },
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

.detail_container > .videoBox > .videoDetailInfo {
  width: 960px;
  height: 40px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 5px;
  display: flex;
  align-items: flex-end;
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
  width: 960;
  height: 540;
}

.fa-bookmark {
  font-size: 1.8rem;
  position: relative;
  top: -5px;
  left: 10px;
  color: #fff;
  transition: 0.2s ease;
}

.fa-bookmark:hover {
  color: rgb(230, 230, 3);
  transform: scale(1.02);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
}

.commentBox {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.commentBox > div {
  display: flex;
  flex-direction: column;
}

.commentBox > div > span {
  font-size: 0.8rem;
}
.commentBox > div > span:hover {
  cursor: pointer;
  font-weight: 600;
}

.commentBox > div > i {
  font-size: 0.8rem;
  margin-top: 3px;
}

.comments {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
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
</style>
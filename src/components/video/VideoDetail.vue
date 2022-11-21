<template>
  <div class="detail_container">
    <span v-if="!video.video_id" class="noVideo">선택된 영상이 없습니다.</span>
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
        <i @click="toggleFavorite" :class="{'fa-solid': true, 'fa-bookmark':true, 'isBookmarked': isBookmarked }"></i>
      </div>
      <comment-box @toggleShow="toggleShow"></comment-box>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommentBox from '../comments/CommentBox.vue';
export default {
  name: 'VideoDetail',
  components: {
    CommentBox,
  },
  methods: {
    toggleFavorite() {
      if (!this.isBookmarked) {
        this.$store.dispatch('addBookmark', this.video.video_id);
      } else {
        this.$store.dispatch('removeBookmark', this.video.video_id);
      }
     },
    toggleShow(isShow) {
      this.$emit("toggleSize", isShow);
    }
  },
  computed: {
    videoURL() {
      const videoId = this.video.video_id;
      return `https://www.youtube.com/embed/${videoId}`;
    },
    ...mapState([
      'video', 'isBookmarked',
    ])
  },
  watch: {
    isBookmarked(val) {
      return val;
    },
    video() {
      this.$store.dispatch('getBookmarks');
    }
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

#iframe {
  max-width: 1180px;
  max-height: 630px;
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

.fa-bookmark.isBookmarked {
  color: rgb(230, 230, 3);
}

.fa-bookmark:hover {
  color: rgb(230, 230, 3);
  transform: scale(1.02);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
}
</style>
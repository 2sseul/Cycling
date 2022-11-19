<template>
  <div class="commentBox">
    <div v-if="!isHideComment">
        <span @click="toggleShow">댓글 더보기</span>
        <i class="fa-solid fa-arrow-down"></i>
    </div>
    <div v-else>
        <span @click="toggleShow">댓글 숨기기</span>
        <i class="fa-solid fa-arrow-up"></i>
    </div>
    <div class="comments">
        <form @submit.prevent="">
        <input @keyup.enter="registComment" type="text" placeholder="댓글을 남겨주세요." id="comment_input" />
        <i @click="registComment" class="fa-solid fa-pen"></i>
        </form>
        <div class="noComment" v-if="comments.length == 0">등록된 댓글이 없습니다</div>
        <comment-list v-else :comments="comments"></comment-list>
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CommentList from '../comments/CommentList.vue';
export default {
    name: 'CommentBox',
    components: {
        CommentList,
    },
    data() {
        return {
            isHideComment: true,
        }
    },
    methods: {
        toggleShow() {
            this.isHideComment = !this.isHideComment;
            this.$emit("toggleShow", this.isHideComment);
        },
        registComment() {
            const comment_input = document.querySelector("#comment_input");
            const data = {
                'video_id': this.video.video_id,
                'content': comment_input.value
            };
            this.$store.dispatch('registComment', data);
            comment_input.value = '';
        }
    },
    computed: {
        ...mapState([
            'video',
            'comments'
        ])
    },
    mounted() {
        this.toggleShow();
    }
}
</script>

<style scoped>
.commentBox {
  padding-top: 10px;
  height: calc(100% - 595px);
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
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  margin-top: 10px;
  z-index: 11;
  overflow-y: scroll;
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

.noComment {
  color: #fff;
  font-size: 1.4rem;
  margin-top: 20%;
}
</style>
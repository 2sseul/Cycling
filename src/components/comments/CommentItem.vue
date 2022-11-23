<template>
  <li :class="classList_commentItem">
    <div class="user_profile">
        <img v-if="comment.profileResource" :src="comment.profileResource" alt="profile_img" />
        <img v-else id="noImg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile_img" />
    </div>
    <div class="comment_info">
    <div class="comment_header">
        <div class="header_info">
        <span class="user_name">{{ comment.nickname }}</span>
        <span class="reg_date">{{ comment.reg_date }}</span>
        </div>
        <ul class="header_nav">
        <li @click="showInput('add')" id="toggleSubInput">답글달기</li>
        <li v-if="userInfo.user_id == comment.user_id" @click="deleteComment" class="btn_del">삭제</li>
        <li v-if="userInfo.user_id == comment.user_id" @click="showInput('edit')" class="btn_edit">수정</li>
        </ul>
    </div>
    <p class="comment_content">{{ comment.content }}</p>
    <form @submit.prevent="registComment" :id="`form-${comment.comment_id}`" class="form_subComment hidden">
        <input type="text" class="input_subcomment" :id="`subInput_${comment.comment_id}`" placeholder="내용 입력"/>
        <button @click.prevent="registComment" type="button">제출</button>
        <button @click="hideInput" type="button">취소</button>
    </form>
    </div>
</li>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'CommentItem',
    props: [
        'comment',
    ],
    data() {
        return {
            classList_commentItem: {
                "comment_item": true,
                "isChild": false,
            },
            commentType: 'add',
        }
    },
    methods: {
        registComment() {
            const subInput = document.getElementById(`subInput_${this.comment.comment_id}`);

            let data = null;
            if (this.commentType == 'edit') {
                console.log("수정");
                data = {
                    comment_id: this.comment.comment_id,
                    video_id: this.comment.video_id,
                    content: subInput.value,
                }
                this.$store.dispatch("editComment", data);
            } else if (this.commentType == 'add') {
                data = {
                    parent_id: this.comment.comment_id,
                    video_id: this.comment.video_id,
                    content: subInput.value,
                }   
                this.$store.dispatch("registComment", data);
            }
            subInput.value = "";
            this.hideInput();
        },
        deleteComment() {
            if (confirm("삭제하시겠습니까?")) {
                this.$store.dispatch("deleteComment", this.comment);
            }
        },
        updateComment() {
            this.showInput();
        },
        showInput(type) {
            this.commentType = type;
            const form = document.getElementById(`form-${this.comment.comment_id}`);
            form.classList.remove('hidden');
            form.firstChild.focus();
        },
        hideInput() {
            const form = document.getElementById(`form-${this.comment.comment_id}`);
            form.classList.add('hidden');
        }
    },
    computed: {
        ...mapState([
            'userInfo',
        ])
    },
    beforeMount() {
        if (this.comment.parent_id != this.comment.comment_id) {
            this.classList_commentItem["isChild"] = true;
        }
    }
}
</script>

<style scoped>

.comment_item {
  width: calc(100% - 60px);
  padding: 10px 20px;
  display: flex;
  box-sizing: border-box;
}

.comment_item.isChild {
    padding-left: 60px;
}

.comment_item > .user_profile {
  width: 45px;
  height: 45px;
  border-radius: 25px;
  overflow: hidden;
  margin-right: 15px;
  position: relative;
  top: 5px;
}

.comment_item > .user_profile > img {
  height: 100%;
}

.comment_item > .comment_info {
  width: calc(85% - 60px);
}

.comment_item > .comment_info > .comment_header {
  width: 100%;
  display: flex;
  align-items: center;
}

.comment_item > .comment_info > .comment_header > .header_info > .user_name {
  margin-right: 10px;
}

.comment_item > .comment_info > .comment_header > .header_info > .reg_date {
  font-size: 0.6rem;
}

.comment_item > .comment_info > .comment_header > .header_nav {
  list-style: none;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  margin-left: 20px;
}

.comment_item > .comment_info > .comment_header > .header_nav > li {
  margin: 0 5px;
}

.comment_item > .comment_info > .comment_header > .header_nav > li:hover {
  cursor: pointer;
  font-weight: 600;
}

.comment_item > .comment_info > .comment_content {
  font-size: 0.8rem;
  padding-left: 10px;
  box-sizing: border-box;
}

#toggleSubInput {
    font-size: 0.8rem;
}

.comment_item.isChild #toggleSubInput {
    display: none;
}

#toggleSubInput:hover {
    font-weight: 600;
}

.hidden {
    height: 0px!important;
}

.form_subComment {
    height: 2.2rem;
    transition: .5s ease;
    overflow: hidden;
    margin-left: 10px;
    display: flex;
    align-items: center;
}

.form_subComment > input {
    border: none;
    background: transparent;
    border-bottom: 1px solid #fff;
    caret-color: #fff;
    color: #fff;
    width: 60%;
    min-width: 200px; 
    margin-right: 10px;
    padding: 10px;
}

.form_subComment > input:focus {
    outline: none;
    border-bottom: 2px solid #fff;
}

.form_subComment > button {
    width: 50px;
    height: 1.7rem;
    margin-left: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: #ddd;
}

.form_subComment > button:hover {
    background-color: 1px solid #fff;
    cursor: pointer;
    font-weight: 600;
}
</style>
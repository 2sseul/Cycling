<template>
  <div ref="board_write_container" class="board_write_container">
    <div class="img_form">
      <div class="img_container" ref="img_container">
        <img id="img_preview" class="preview hidden" src="" />
        <div class="img_input">
          <span>
            <i class="fa-solid fa-image"></i>
            이미지를 선택해주세요
          </span>
          <input @change="imgChange" id="upload_img" type="file" accept=".jpg, .jpeg, .png" />
        </div>
      </div>
      <label for="upload_img" class="img_box"></label>
    </div>
    <div class="board_input">


    <div class="board_sample">
      <div>
        <img src="" id="sample_preview" class="hidden" />
        <span id="sample_txt">이미지 없음</span>
      </div>
      <ul class="tag_list">
        <li @click="delTag"
            v-for="(tag, idx) in data.tagList"
            :id="tag"
            :key="idx">
          {{ tag }}
        </li>
      </ul>
      <div class="card_footer">
        <div class="user_info">
          <div class="profile">
            <img v-if="userInfo.profile_img" :src="userInfo.imgResource" alt="profile_img" />
            <img v-else id="noImg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile_img" />
          </div>
          <span v-if="userInfo" class="nickname">{{ userInfo.user_id }}</span>
          <span v-else class="nickname">Unknown</span>
        </div>
        <div class="like_cnt">
          <i class="fa-solid fa-heart"></i>
          <span class="cnt">0</span>
        </div>
      </div>
    </div>

    <div class="tip">생성된 태그(#) 목록은 클릭하여 삭제할 수 있습니다.</div>

      <div class="input_list">
        <input @keyup.enter="addTag" class="input_addTag" type="text" placeholder="#태그 추가" />
        <input v-model="data.dist" class="input_dist" type="number" placeholder="km" min="0" />
        <button @click="postBoard" class="submit">게시글 등록</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BoardWrite',
  data() {
    return {
      data: {
        file: '',
        tagList: [],
        dist: 0,
      }
    }
  },
  methods: {
    imgChange() {
      const img_preview = document.querySelector("#img_preview");
      const img_input = document.querySelector(".img_input");

      const sample_preview = document.querySelector("#sample_preview");
      const sample_txt = document.querySelector("#sample_txt");

      img_preview.classList.remove("hidden");
      img_input.classList.add("hidden");

      sample_preview.classList.remove("hidden");
      sample_txt.classList.add("hidden");

      const upload_img = document.querySelector("#upload_img");
      this.data.file = upload_img.files[0];

      var reader = new FileReader();
      reader.onload = function(e) {
        img_preview.src = e.target.result;
        sample_preview.src = e.target.result;
      };
      reader.readAsDataURL(this.data.file);
    },
    classChanger() {
        const board_write_container = this.$refs.board_write_container;
        if (this.isNightView) {
          board_write_container.classList.add("dark");
        } else {
          board_write_container.classList.remove("dark");
        }
    },
    addTag(e) {
      if (this.data.tagList.length == 3) {
        alert("태그는 최대 3개까지 등록할 수 있습니다.");
        return;
      } else if (e.target.value.length > 10) {
        alert("태그 입력은 최대 10자까지 가능합니다");
        return;
      }


      for (const tag of this.data.tagList) {
        if (tag.slice(1) == e.target.value) {
          alert("이미 등록된 태그입니다");
          e.target.value = '';
          return;
        }
      }

      this.data.tagList.push(`#${e.target.value}`);
      e.target.value = '';
    },
    delTag(e) {
      this.data.tagList = this.data.tagList.filter(item => 
        item != e.target.innerText
      );
    },
    postBoard() {
      if (!this.data.file) {
        alert("이미지를 등록해주세요");
        return;
      }
      else if (this.data.tagList.length == 0) {
        alert("최소 1개 이상의 태그를 등록해주세요");
        return;
      }
      else if (this.data.dist == 0) {
        alert("주행거리를 입력해주세요");
        return;
      }
      
      if (confirm("글을 등록하시겠습니까?")) {
        this.$store.dispatch('uploadBoard', this.data);
      }

    }
  },
  computed: {
        isNightView() {
            return this.$store.getters.getIsNightView;
        },
        ...mapState([
          'userInfo'
        ]),
    },
    watch: {
        isNightView(val) {
        this.classChanger();
          return val;
        }
    },
    mounted() {
        this.classChanger();
        console.log(this.userInfo);
    }
}
</script>

<style scoped>
.hidden {
  display: none!important;
}

.board_write_container {
  width: 100%;
  min-width: 800px;
  display: flex;
  justify-content: center;
}

.board_write_container > .img_form {
  width: 60%;
  display: flex;
  justify-content: center;
}

.board_write_container > .img_form > .img_container {
  width: 100%;
  height: 60vh;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: .5s ease;
}

.board_write_container.dark .img_container {
  background-color: #000!important;
}

.board_write_container > .img_form >  .img_container > .preview {
  width: 100%;
  object-fit: cover;
}

.board_write_container > .img_form > .img_box {
  width: 55%;
  height: 60vh;
  position: absolute;
  background: transparent;
}

.img_box:hover {
  cursor: pointer;
}


.img_container > .img_input {
  border: 5px dotted #000;
  border-radius: 10px;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
}

.img_box > .img_input {
  cursor: pointer;
}


.board_write_container.dark .img_input {
  border: 5px dotted #fff;
}

.imt_box > .img_input > span {
  font-size: 0.8rem;
  font-weight: 600;
  color: #000;
}

.img_box > .img_input > span > i {
  font-size: 1.2rem;
}

#upload_img {
  display: none;
}

.board_write_container > .board_input {
  width: 40%;
  height: 60vh;
  text-align: left;
  padding-left: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.input_list {
  display: flex;
  width: 100%;
  height: 15rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.input_addTag {
  width: 80%;
  height: 2rem;
  margin: 10px 0;
  padding-left: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
  border: 1px solid #012D36;
}

.input_addTag:focus {
  outline: 1px solid #00333e;
}

.input_dist {
  margin-left: 10px;
  width: 80%;
  height: 2rem;
  margin: 10px 0;
  padding-left: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
  border: 1px solid #012D36;
}

.input_dist:focus {
  outline: 1px solid #00333e;
}

.input_list > .submit {
  height: 2.2rem;
  width: 84%;
  margin: 10px 0;
  margin-left: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: #004250;
  color: #fff;
  position: relative;
  right: 5px;
}

.input_list > .submit:hover {
  font-weight: 600;
  background-color: #012D36;
  cursor: pointer;
}


.tip {
  font-size: 0.8rem;
  font-weight: 600;
}


.board_sample {
  width: 80%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  color: #000;
}

.board_sample > div {
  width: 100%;
  height: 340px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.board_sample > div > img {
  width: 100%;
  height: 340px;
  object-fit: cover;
}

.board_sample > div > #sample_txt {
  font-weight: 600;
  font-size: 0.8rem;
}

.board_write_container.dark  #sample_txt  {
  color: #fff;
}

.board_sample > .tag_list {
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


.board_sample > .tag_list > li {
  margin-right: 10px;
}

.board_sample > .tag_list > li:hover {
  color: red;
}

.board_sample > .card_footer {
  width: 100%;
  height: 40px;
  background-color: rgba(225, 225, 225, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.board_sample > .card_footer > .user_info {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
}

.board_sample > .card_footer > .user_info > .profile {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: white;
  overflow: hidden;
}

.board_sample > .card_footer > .user_info > .profile > img{
  height: 100%;
}


.board_sample > .card_footer > .user_info > .nickname {
  margin-left: 10px;
}

.board_sample > .card_footer > .like_cnt {
  display: flex;
  align-items: center;
}

.board_sample > .card_footer > .like_cnt > .fa-solid,.fa-heart {
  margin-right: 10px;
  color: red;
  transition: .2s ease;
}

.board_sample > .card_footer > .like_cnt > .cnt {
  font-weight: 600;
  font-size: 0.9rem;
}
</style>
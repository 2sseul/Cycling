<template>
  <div class="container">
    <div ref="mypage" class="mypage">
      <!--프로필 컨테이너  -->
      <div class="myProfile">
        <div class="myId"><b>{{ userInfo.user_id }}</b></div>
        <div class="myProfileImg">
          <div class="imgCover">
            <img id="myImg" class="hidden" :src="userInfo.imgResource" alt="profile_img" />
            <img id="noImg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile_img" />
          </div>
          <label for="input_profile">
            <i class="fa-solid fa-pen-to-square img_edit"></i>
          </label>
          <input type="file" @change="imgChange" id="input_profile" accept=".jpg, .jpeg, .png"/>
        </div>
        <div class="myNickname">
          <span>{{ userInfo.nickname }}</span>
          <i class="fa-solid fa-pen-to-square nickname_edit" @click="toggleNicknameInput"></i>
        </div>

        <form class="form_nickname closed" @submit.prevent="updateNickname">
          <input id="input_nickname" type="text" v-model="tempNickname" />
          <button type="submit">수정</button>
        </form>

        <div class="myDetail">
          <div>
            <i class="fa-solid fa-envelope"></i>
            <div class="myEmail">{{ userInfo.email }}</div>
          </div>
          <div>
            <i class="fa-solid fa-phone"></i>
            <div class="myPno">{{ userInfo.pno }}</div>
          </div>
          <div>
            <i class="fa-regular fa-calendar-days"></i>
            <div class="myRegDate">{{ userInfo.reg_date }}</div>
          </div>
        </div>
      </div>
      
      <div class="vr"></div>
      <div class="myBoard"> 
        <div class="myBoard_header">내 게시글</div>
        <div v-if="myBoardList.length == 0" class="noBoard">게시글이 없습니다.</div>
        <div v-else class="boardListBox">
          <ul class="boardList">
            <board-item v-for="board in myBoardList" :key="board.board_id" :board="board"></board-item>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { mapGetters } from 'vuex';
import BoardItem from '../components/board/BoardItem.vue';

export default {
  name: 'MyPageView',
  components: {
    BoardItem,
  },
  data(){
    return{
      selectFile: null, // 파일 객체
      previewImgUrl: 'https://www.pngkey.com/png/full/157-1579943_no-profile-picture-round.png', // 미리보기 이미지 URL
      isUploading: false, // 파일 업로드 체크
      response: null, // 파일 업로드후 응답값
      modifyFlag: false,
      list:[],
      myBoardList: [],
      userInfo: {},
      tempNickname: "",
    }
  },
  methods: {
    classChanger() {
      const mypage = this.$refs.mypage;
      if (this.isNightView) {
        mypage.classList.add("dark");
      } else {
        mypage.classList.remove("dark");
      }
    },
    imgChange() {
      const input = document.querySelector("#input_profile");

      const file = input.files[0];
      if(file.size > 1024 * 1024 * 4){
        alert('4MB 이하 파일만 등록할 수 있습니다.\n\n' + '현재파일 용량 : ' + (Math.round(file.size / 1024 / 1024 * 100) / 100) + 'MB');
        return;
      }

      this.userInfo.profile_img = "upload";
      const myImg = document.querySelector("#myImg");
      this.imgShow();

      var reader = new FileReader();
      reader.onload = function(e) {
        myImg.src = e.target.result;
      };
      reader.readAsDataURL(file);

      this.updateUserProfileImg(file);
    },
    updateUserProfileImg(file) {
      this.$store.dispatch('updateUserProfileImg', file);
    },
    toggleNicknameInput() {
      const form_nickname = document.querySelector(".form_nickname");
      form_nickname.classList.toggle('closed');

      const input_nickname = document.querySelector("#input_nickname");
      input_nickname.focus();
    },
    updateNickname() {
      if (this.tempNickname.length == 0) {
        alert("새로운 닉네임을 작성해주세요.");
        return;
      }
      this.$store.dispatch("updateUserNickname", this.tempNickname);
      this.toggleNicknameInput();
      this.tempNickname = "";
    },
    imgShow() {
      const myImg = document.querySelector("#myImg");
      const noImg = document.querySelector("#noImg");

      myImg.classList.remove("hidden");
      noImg.classList.add("hidden");
    },
  },
  computed: {
    isNightView() {
      return this.$store.getters.getIsNightView;
    },
    ...mapGetters([
      'getMyBoardList',
      'getUserInfo',
    ]),
  },
  watch: {
    isNightView(val) {
      this.classChanger();
      return val;
    },
    getMyBoardList(myBoardList) {
      this.myBoardList = myBoardList;
    },
    getUserInfo(val) {
      let info = val;
      if (val.reg_date) {
        info.reg_date = info.reg_date.split(" ")[0];
      }

      if (val.profile_img) {
        this.imgShow();
      }
      this.userInfo = info;
    },
  },
  beforeMount() {
    this.$store.dispatch('getMyBoardList');
    this.$store.dispatch('getUserInfo');
  },
  mounted() {
    this.classChanger();
  }
}
</script>

<style scoped>

.hidden {
  display: none!important;
}
.container {
  background: url('../assets/img/bg/bg_bike.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.mypage {
  width: 80%;
  height: 80%;
  left: 10%;
  top: 120px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  transition: .5s ease;
  position: fixed;
  box-shadow: rgba(0, 0, 0, 0.35) 0 10px 15px;
  background-color: rgba(255, 255, 255, 0.6);
}

.mypage.dark {
  background-color: rgba(0, 0, 0, 0.5);
}

/** profile */
.myProfile {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.myProfile > .myId {
  margin-bottom: 6px;
  font-size: 1rem;
  font-weight: 600;
  font-family: Verdana, "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.myProfile > .myProfileImg {
  height: 170px;
}

.myProfile > .myProfileImg > input {
  display: none;
}

.myProfile > .myProfileImg > .imgCover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: #000;
  transition: .5s ease;
  overflow: hidden;
}

.myProfile > .myProfileImg > .imgCover > img {
  background-color: #000;
  transition: .5s ease;
  height: 100%;
}

.mypage.dark .myProfile > .myProfileImg > img {
  background-color: #fff;
}

.myProfile > .myProfileImg > label > .img_edit {
  font-size: 1.4rem;
  color: #000;
  position: relative;
  top: -25px;
  left: 70px;
}

.myProfile > .myProfileImg > label > .img_edit:hover {
  color: #00a;
  cursor: pointer;
}

.myProfile > .myNickname {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  position: relative;
  left: 15px;
}

.myProfile > .form_nickname {
  height: 2rem;
  display: flex;
  overflow: hidden;
  transition: .5s ease;
  position: relative;
  left: 20px;
}
.closed {
  height: 0px!important;
}

.myProfile > .form_nickname > #input_nickname {
  font-size: 1.2rem;
  width: 200px;
  outline: none;
  border-radius: 5px;
}

.myProfile > .form_nickname > #input_nickname:focus {
  border-bottom: 1px solid #000;
}

.myProfile > .form_nickname > button {
  width: 50px;
  height: 2rem;
  margin-left: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: rgb(38, 50, 56);
  color: #eee;
}



.myProfile > .myNickname > .nickname_edit {
  margin-left: 10px;
}

.myProfile > .myNickname > .nickname_edit:hover {
  color: #00a;
  cursor: pointer;
}

.myProfile > .myDetail {
  margin-top: 20px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.myProfile > .myDetail > div {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.myProfile > .myDetail > div > i {
  margin-right: 14px;
}

.myProfile > .myDetail > div > div {
  width: 300px;
  text-align: left;
  border-bottom: 1px solid black;
  padding-left: 10px;
  box-sizing: border-box;
  text-overflow: ellipsis;
}


.vr {
  margin-right: 10px;
  width: 1px;
  height: 95%;
  background-color: #000;
  transition: .5s ease;
}

.mypage.dark .vr {
  background-color: #fff;
}

.myBoard {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.myBoard > .myBoard_header {
  width: 100%;
  display: flex;
  align-items: flex-end;
  height: 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  padding-top: 10px;
  box-sizing: border-box;
}

.myBoard > .noBoard {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 3rem);
  font-weight: 600;
  position: relative;
  top: -20px;
}

.myBoard > .boardListBox {
  width: 100%;
  height: calc(100% - 3rem);
}

.myBoard > .boardListBox > .boardList {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  padding-left: 10px;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
}


</style>
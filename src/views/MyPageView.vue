<template>
  <div class="container">
    <div ref="mypage" class="mypage">
      <!--프로필 컨테이너  -->
      <div class="myProfile">
        <div class="myId">{{ userInfo.user_id }}</div>
        <div class="myProfileImg">
          <img v-if="userInfo.profile_img" src="" alt="profile_img" />
          <img v-else src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile_img" />
          <i class="fa-solid fa-pen-to-square img_edit"></i>
        </div>
        <div class="myNickname"></div>
        <div class="myDetail">

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
// axios module import
import http from "../http"
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
    previewFile() {
        // 선택된 파일이 있는가?
        if (0 < this.$refs.selectFile.files.length) {
          // 0 번째 파일을 가져 온다.
          this.selectFile = this.$refs.selectFile.files[0]
          // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.
          let fileExt = this.selectFile.name.substring(
            this.selectFile.name.lastIndexOf(".") + 1
          )
          // 소문자로 변환
          fileExt = fileExt.toLowerCase()
          // 이미지 확장자 체크, 1메가 바이트 이하 인지 체크
          if (
            ["jpeg", "png", "gif", "bmp"].includes(fileExt) &&
            this.selectFile.size <= 1048576
          ) {
            // FileReader 를 활용하여 파일을 읽는다
            var reader = new FileReader()
            reader.onload = e => {
              // base64
              this.previewImgUrl = e.target.result
              console.log(this.previewImgUrl);
            }
            reader.readAsDataURL(this.selectFile)
          } else if (this.selectFile.size <= 1048576) {
            // 이미지외 파일
            this.previewImgUrl = null
          } else {
            alert("파일을 다시 선택해 주세요.")
            this.selectFile = null
            this.previewImgUrl = null
          }
        } else {
          // 파일을 선택하지 않았을때
          this.selectFile = null
          this.previewImgUrl = null
        }
        console.log(this.selectFile)
      },
      async formSubmit() {
        if (this.selectFile) {
          // Form 필드 생성
          let form = new FormData()
          form.append("file", this.selectFile) // api file name
          this.isUploading = true

          http
            .post("https://localhost:9999/api/user/modify", form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(res => {
              this.response = res
              this.isUploading = false
            })
            .catch(error => {
              this.response = error
              this.isUploading = false
            })
        } else {
          alert("파일을 선택해 주세요.")
        }

        return true
      },
      modifyOn(){
        this.modifyFlag = true;
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
      this.userInfo = val;
    }
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
  font-size: 1.2rem;
  font-weight: 600;
}

.myProfile > .myProfileImg > img {
  display: flex;
  justify-content: center;
}

.myProfile > .myProfileImg > img {
  width: 150px;
  height: 150px;
  border-radius: 75px;
}

.myProfile > .myProfileImg > .img_edit {
  font-size: 1.2rem;
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
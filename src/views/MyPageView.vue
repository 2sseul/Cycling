<template>
  <div class="container">
    <div ref="mypage" class="mypage">
      <!--프로필 컨테이너  -->
      <div v-if="!modifyFlag" class="card-container">
        <h4>userId</h4>
        <div class="file-upload">
          <form>
            <img :src="previewImgUrl" style="width:200px;" class="round"/><br/>
          </form>
        </div>
          <input type="text" class="text_box readonly" value="nickname" readonly/><br/>
          <input type="text" class="text_box readonly" readonly />
        
        <div></div>
        <button class="btn modify" @click="modifyOn"><i class="fa-regular fa-user-pen"></i></button>
      </div>
      <!--프로필 수정 컨테이너 -->
      <div v-else class="card-container">
        <h4>userId</h4>
        <div class="file-upload">
          <form @submit.prevent="formSubmit" method="post">
            <img :src="previewImgUrl" style="width:200px;" class="round"/><br/>
            <input type="file" ref="selectFile" @change="previewFile" accept="image/*"/>
            <div>
              <input type="text" class="text_box"  placeholder="nickname 수정"/>
            </div>
            <button class="primary" type="submit" :disabled="isUploading">Upload</button>
          </form>
        </div>
        <!--닉네임 수정-->
        <input type="text" class="text_box"  />
        
      </div>
      <div class="boomark"> 

      </div>
    </div>
  </div>
</template>

<script>
// axios module import
import http from "../http"

export default {
  name: 'MyPageView',
  data(){
    return{
      selectFile: null, // 파일 객체
        previewImgUrl: 'https://www.pngkey.com/png/full/157-1579943_no-profile-picture-round.png', // 미리보기 이미지 URL
        isUploading: false, // 파일 업로드 체크
        response: null, // 파일 업로드후 응답값
        modifyFlag: false,
        list:[]
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
      }
  },
  computed: {
    isNightView() {
      return this.$store.getters.getIsNightView;
    }
  },
  watch: {
    isNightView(val) {
      this.classChanger();
      return val;
    }
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
h3 {
  margin: 10px 0;
}

h4 {
  margin: 5px 0;
  text-transform: uppercase;
  font-style: italic;
}

p {
  font-size: 14px;
  line-height: 21px;
}

.card-container {
  border-radius: 5px;
  color: black;
  position: relative;
  width: 50%;
  max-width: 100%;
}

.round {
  height: 200px;
  object-fit: cover;
  text-align:center;
}

.card-container .round {
  border: 1px solid #03BFCB;
  border-radius: 50%;
  padding: 7px;
}

button.primary {
  background-color: #03BFCB;
  border: 1px solid #03BFCB;
  border-radius: 3px;
  color: #231E39;
  font-weight: 500;
  padding: 10px 25px;
  cursor:pointer;
}

button.primary.ghost {
  background-color: transparent;
  color: #02899C;
}

button.modify{
  background-color:none;
  border: none;
  
}

.text_box {
  height: 40px;
  width: 30%;
  border: 0;
  border-bottom: 1px solid #000000;
  outline: none;
  font-size: 15px;
  font-weight: 300;
  background-color: rgba(0, 0, 0, 0);
  margin-left: 10px;
  margin-bottom: 10px;
}


</style>
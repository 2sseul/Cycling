<template>
  <div class="container">
    <div ref="mypage" class="mypage">
      <!--프로필 이미지 -->
      <div class="card-container">
        <h4>userId</h4>
        <div class="file-upload">
          <form @submit.prevent="formSubmit" method="post">
            <img :src="previewImgUrl" style="width:200px;" class="round"/><br/>
            <input type="file" ref="selectFile" @change="previewFile" accept="image/*"/>
            <button class="primary" type="submit" :disabled="isUploading">Upload</button>
          </form>
        </div>
        <h4>nickname</h4>
        
      </div>
      <div class="boomark"> 

      </div>
    </div>
  </div>
</template>

<script>
// axios module import
// import http from "../http"

export default {
  name: 'MyPageView',
  data(){
    return{
      selectFile: null, // 파일 객체
        previewImgUrl: 'https://www.pngkey.com/png/full/157-1579943_no-profile-picture-round.png', // 미리보기 이미지 URL
        isUploading: false, // 파일 업로드 체크
        response: null, // 파일 업로드후 응답값
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
      // async formSubmit() {
      //   if (this.selectFile) {
      //     // Form 필드 생성
      //     let form = new FormData()
      //     form.append("file", this.selectFile) // api file name
      //     this.isUploading = true

      //     http
      //       .post("/api/sample/upload/", form, {
      //         headers: {
      //           "Content-Type": "multipart/form-data",
      //         },
      //       })
      //       .then(res => {
      //         this.response = res
      //         this.isUploading = false
      //       })
      //       .catch(error => {
      //         this.response = error
      //         this.isUploading = false
      //       })
      //   } else {
      //     alert("파일을 선택해 주세요.")
      //   }

      //   return true
      // },
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
}

p {
  font-size: 14px;
  line-height: 21px;
}

.input_img {
  display: block;
}

.profilebox {
  border-radius: 72px 72px 72px 72px;
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
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  padding: 10px 25px;
  cursor:pointer;
}

button.primary.ghost {
  background-color: transparent;
  color: #02899C;
}

.skills {
  text-align: left;
  padding: 15px;
  margin-top: 30px;
}

.skills ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.skills ul li {
  border: 1px solid #2D2747;
  border-radius: 2px;
  display: inline-block;
  font-size: 12px;
  margin: 0 7px 7px 0;
  padding: 7px;
}


</style>
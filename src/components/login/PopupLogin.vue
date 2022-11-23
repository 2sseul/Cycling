<template>
  <div class="blur">
    <div ref="login_container" class="container">
      <i id="close" class="fa-solid fa-xmark" @click="close"></i>

      <div class="findId_container">
        <popup-find-id @toggleFindIdForm="toggleFindIdForm"></popup-find-id>
      </div>

      <div class="findPw_container">
        <popup-find-pw @toggleFindPwForm="toggleFindPwForm"></popup-find-pw>
      </div>

      <div class="login-container">
        <div class="login_all" id="login">
          <form class="login-form">
            <h3>로그인</h3>
            <div class="logi">
              <i class="fa-solid fa-user"></i>
              <input type="text" class="text_box input_login" placeholder="Username" v-model="userId" />
            </div>
            <div>
              <i class="fa-solid fa-key"></i>
              <input type="password" class="text_box input_password" placeholder="Password" v-model="userPwd" />
            </div>
            <div class="submit-container">
              <span class="login_find" @click="toggleFindIdForm">아이디찾기</span>
              <span class="login_find" @click="toggleFindPwForm">비밀번호 찾기</span>
              <div>
                <button type="submit" class="login-button" @click.prevent="doLogin">로그인</button>
                <button type="submit" class="login-button" @click.prevent="popupRegist">회원가입</button>
              </div>
            </div>
            <hr style="width:500px;" />
          </form>
          <div class="box">
            <span>소셜계정으로 로그인</span>
            <div class="login-box">
              <div class="kakao-login social-btn">
                <span> <img src="@/assets/img/login/color-kakao-logo.png" height="120%" width="auto" alt=""></span>
                <span>
                  <img src="@/assets/img/login/color-kakao-logo.png" height="120%" width="auto" alt=""></span>
              </div>
              <div class="naver-login social-btn">
                <span> <img src="@/assets/img/login/white-naver-logo.png" height="100%" width="auto" alt=""></span>
                <span>
                  <img src="@/assets/img/login/color-naver-logo.png" height="100%" width="auto" alt=""></span>
              </div>
              <div class="google-login social-btn" @click="googleLoginBtn">
                <span> <img src="@/assets/img/login/white-google-logo.png" height="110%" width="auto" alt=""></span>
                <span>
                  <img src="@/assets/img/login/color-google-logo.png" height="120%" width="auto" alt=""></span>
              </div>
              <div id="my-signin2" style="display:none"></div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import PopupFindId from './PopupFindId.vue';
import PopupFindPw from './PopupFindPw.vue';
export default {
  name: 'PopupLogin',
  components: {
    PopupFindId,
    PopupFindPw,
  },
  data(){
    return{
      userId: '',
      userPwd: '',
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    popupRegist() {
      this.$emit('popupRegist');
    },
    doLogin(){
      if (this.userId.length == 0) {
        alert("아이디를 입력해주세요");
        return;
      } else if (this.userPwd.length == 0) {
        alert("비밀번호를 입력해주세요");
        return;
      }
      const loginInfo = {
        'user_id': this.userId,
        'password': this.userPwd
      };
      this.$store.dispatch('login', loginInfo);
    },
    classChanger() {
      const login_container = this.$refs.login_container;
      if (this.isNightView) {
        login_container.classList.add("dark");
      } else {
        login_container.classList.remove("dark");
      }
    },

    toggleFindIdForm() {
      const findId_container = document.querySelector(".findId_container");
      findId_container.classList.toggle("extend");
    },
    toggleFindPwForm() {
      const findPw_container = document.querySelector(".findPw_container");
      findPw_container.classList.toggle("extend");
    },

    googleLoginBtn(){
      var self = this;

      window.gapi.signin2.render('my-signin2',{
        scope: 'profile email',
        width:240,
        height:50,
        longtitle: true,
        theme: 'dark',
        onsuccess: this.GoogleLoginSuccess,
        onfailure: this.GoogleLoginFailure,
      });
      setTimeout(function () {
        if (!self.googleLoginCheck) {
          const auth = window.gapi.auth2.getAuthInstance();
          auth.isSignedIn.get();
          document.querySelector('.abcRioButton').click();
        }
      }, 1500)
    },
    // async onSuccess(googleUser){

    //   const user_join_type = "google"
    //   const googleEmail = googleUser.getBasicProfile().getEmail();

    //   const res = await fetch('https://localhost8080/api',{
    //     method:"POST",
    //     headers:{
    //       "Context-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email:`${googleEmail}`,
    //       user_join_type: user_join_type
    //     }),
    //   })

    //   const data = await res.json();
    //   this.checkSnSLogin(data, googleEmail,user_join_type);

    //   if(googleEmail != 'undefined'){
    //     console.log(googleEmail);
    //   }
    // },
    // onFailure(error){
    //   console.log(error);
    // }
    async GoogleLoginSuccess(googleUser) {
      const googleEmail = googleUser.getBasicProfile().getEmail();
      if (googleEmail !== 'undefined') {
        console.log(googleEmail);
        console.log("성공");
      }
    },
    //구글 로그인 콜백함수 (실패)
    GoogleLoginFailure(error) {
      console.log(error);
      console.log("실패");
    },
  },
  computed: {
    isNightView() {
      return this.$store.getters.getIsNightView;
    },
  },
  watch: {
    isNightView(val) {
      this.classChanger();
      return val;
    },
  },
  mounted() {
    this.classChanger();
  },
}
</script>

<style scoped>

/** login container */
.container {
  width: 700px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  overflow: hidden;
}

.container.dark {
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: rgba(255, 255, 255, 0.2) 0px 7px 29px 0px;
}

.container.dark input {
  color: #fff;
}

#close {
  position: relative;
  font-size: 1.6rem;
  top: 14px;
  left: 320px;
}

#close:hover {
  font-weight: 600;
  color: red;
  cursor: pointer;
}

.login-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: 25px;
  transition: .5s ease;
}

/** login input box */
.text_box {
  height: 40px;
  width: 60%;
  border: 0;
  border-bottom: 1px solid #a9a9a9;
  outline: none;
  font-size: 15px;
  font-weight: 300;
  background-color: rgba(0, 0, 0, 0);
  margin-left: 10px;
}

.input_login:focus, .input_password:focus {
  border-bottom: 1px solid #757575;
}

.login_find {
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
}

.login_find:hover {
  cursor: pointer;
  font-weight: 600;;
}

.login-button {
  width: 207px;
  height: 38px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  margin-left: 10px;
  margin-top: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: rgb(38, 50, 56);
  color: #eee;
}

.login-button:hover {
  background-color: rgb(48, 60, 66);
  font-weight: 600;
}

.submit-container {
  font-size: 14px;
}

/** social login */
.box {
  margin-top: 20px;
}

.box > span {
  font-size: 0.8rem;
  display: inline-block;
  margin-bottom: 10px;
}

.login-box {
  width: 100%;
  height: 100%;
  transition: 0.5s;
  display: flex;
  justify-content: center;
}

.login-box.active {
  transform: translateY(-100%);
}

.social-btn {
  width: 125px;
  height: 50px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  outline: none;
  margin: 5px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  transition: .5s;
}

.social-btn span {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;

  box-sizing: border-box;
  transition: .5s;
  font-size: 16px;
}

.social-btn span:nth-child(1) {
  bottom: 0%;
}

.social-btn span:nth-child(2) {
  top: 100%;
}

.social-btn:hover span:nth-child(1) {
  bottom: 100%;
}

.social-btn:hover span:nth-child(2) {
  top: 0;
}

.google-login span:nth-child(1) {
  background: #dd4b39;
}

.google-login span:nth-child(2) {
  color: #dd4b39;
}

.kakao-login span:nth-child(1) {
  background: #f9e000;
}

.kakao-login span:nth-child(2) {
  color: #f9e000;
}

.naver-login span:nth-child(1) {
  background: #2db400;
}

.naver-login span:nth-child(2) {
  color: #2db400;
}


.extend {
  height: 500px!important;
}

.findId_container {
  width: 100%;
  height: 0px;
  transition: .7s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.findPw_container {
  width: 100%;
  height: 0px;
  transition: .7s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/** icons */
</style>
<template>
  <div class="blur">
    <div class="container">
      <i id="close" class="fa-solid fa-xmark" @click="close"></i>
      <div class="join_container">
        <div class="form-control">
          <form>
            <h3>회원가입</h3>
            <div class>
              <i class="fa-solid fa-user"></i>
              <input type="text" class="text_box input" placeholder="Username" v-model="userId" />
              <div v-if="!idValid" class="fail">
                <i class="fas fa-exclamation-circle"></i>
                <small> 유효하지 않은 아이디 입니다.</small>
              </div>
              <span v-else class="success"> 
                <i class="fas fa-check-circle"></i>
              </span>
            </div>
            <div>
              <i class="fa-solid fa-key"></i>
              <input type="password" class="text_box input" placeholder="Password" v-model="userPwd" @blur="pwdValid" />
              <div v-if="!pwdValidFlag" class="fail">
                <i class="fas fa-exclamation-circle"></i>
                <small> 유효하지 않은 비밀번호 입니다.</small>
              </div>
              <span v-else class="success"> 
                <i class="fas fa-check-circle"></i>
              </span>
            </div>
            <div>
              <i class="fa-solid fa-key"></i>
              <input type="password" class="text_box input" placeholder="Confirm Password" v-model="userPwdChk"
                @blur="pwdChkValid" />
              <div v-if="!pwdChkValidFlag" class="fail">
                <i class="fas fa-exclamation-circle"></i>
                <small> 비밀번호가 일치하지 않습니다.</small>
              </div>
              <span v-else class="success"> 
                <i class="fas fa-check-circle"></i>
              </span>
            </div>
            <div>
              <i class="fa-solid fa-face-smile"></i>
              <input type="text" class="text_box input" placeholder="Nickname" v-model="nickname" @blur="nickNameValid"/>
              <div v-if="!nickNameValidFlag" class="fail">
                <i class="fas fa-exclamation-circle"></i>
                <small> 닉네임을 확인하세요. </small>
              </div>
              <span v-else class="success"> 
                <i class="fas fa-check-circle"></i>
              </span>
            </div>
            <div>
              <i class="fa-solid fa-phone"></i>
              <input type="text" class="text_box input" placeholder="Phone" v-model="phone" @blur="phoneValid" />
              <div v-if="!phoneValidFlag" class="fail">
                <i class="fas fa-exclamation-circle"></i>
                <small> ex. 000-000-000</small>
              </div>
              <span v-else class="success"> 
                <i class="fas fa-check-circle"></i>
              </span>
            </div>
            <div>
              <i class="fa-solid fa-envelope"></i>
              <input type="text" class="text_box emails" placeholder="E-maile" v-model="email" @blur="emailValid" />
              <span v-if="!emailValidFlag" class="fail">
                <button type="submit" class="button check-button">전송 불가</button><br/>
                <i class="fas fa-exclamation-circle"></i>
                <small> ex. test@google.com </small>
              </span>
              <span v-else class="success"> 
                <i class="fas fa-check-circle"></i>
                <button type="submit" class="button check-button">인증번호 전송</button>
              </span>
            </div>
            <div>
              <i class="fa-solid fa-circle-check"></i>
              <input type="text" class="text_box emails" placeholder="인증번호" />
              <button type="submit" class="button check-button">인증번호 확인</button>
            </div>
            <button type="submit" class="button join-button">확인</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'PopupRegist',
  computed: {
    idValid() {
      if (this.userId === '') {
        return false;
      } else {
        return /^[A-Za-z0-9]+$/.test(this.userId)
      }
    },
  },
  data() {
    return {
      userId: '',
      userPwd: '',
      userPwdChk: '',
      nickname: '',
      phone: '',
      email: '',
      comfirm: '',
      pwdValidFlag: false,
      pwdChkValidFlag: false,
      phoneValidFlag: false,
      emailValidFlag: false,
      nickNameValidFlag: false,
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    pwdValid() {
      if (
        /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(this.userPwd)
      ) {
        this.pwdValidFlag = true
      } else {
        this.pwdValidFlag = false
      }
    },
    pwdChkValid() {
      this.pwdChkValidFlag = this.userPwd === this.userPwdChk ? true : false;
    },
    phoneValid() {
      if (
        /(\d{3}).*(\d{3}).*(\d{4})/.test(this.phone)
      ) {
        this.phoneValidFlag = true
      } else {
        this.phoneValidFlag = false
      }
    },
    emailValid(){
      if(/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(this.email)){
        this.emailValidFlag = true;
      }else{
        this.emailValidFlag = false;
      }
    },nickNameValid(){
      //db에 있는 닉네임들이랑 체크해서 없는거만 true
    }

  }
}



</script>

<style scoped>
.container {
  width: 700px;
  height: 750px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  overflow: hidden;
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

.join_container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: 50px;
}

/** join form */
.text_box {
  height: 40px;
  border: 0;
  border-bottom: 1px solid #a9a9a9;
  outline: none;
  font-size: 15px;
  font-weight: 300;
  background-color: rgba(0, 0, 0, 0);
  margin-left: 10px;
  margin-bottom: 5px;
}

.input {
  width: 500px;
}

.emails {
  width: 380px;
}

.button {
  height: 38px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: rgb(38, 50, 56);
  color: #eee;
}

.check-button {
  width: 110px;
}

.join-button {
  width: 207px;
  margin-top: 40px;
}

/** right error */
.form-control input:focus {
  outline: 0;
  border-color: #777;
}

/* .form-control.success input {
  border-color: #e74c3c;
} */

.form-control > .fas {
  visibility: hidden;
  position: absolute;
  top: 40px;
  right: 10px;
}

.success i.fa-check-circle {
  color: #2ecc71;
  visibility: visible;
}

.fail i.fa-exclamation-circle {
  color: #e74c3c;
  visibility: visible;
}

.form-control small {
  color: #e74c3c;
  bottom: 0;
  left: 0;
  visibility: hidden;
}

.fail small {
  visibility: visible;
}

.form-control input:focus {
  outline: 0;
  border-color: #777;
}
</style>

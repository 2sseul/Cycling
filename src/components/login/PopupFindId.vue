<template>
  <form class="find-id-form">
        <h3>아이디 찾기</h3>
        <div class="logi">
            <i class="fa-solid fa-envelope"></i>
            <input type="text" class="text_box input_email" placeholder="사용자 이메일 입력" v-model="email" />
        </div>
        <div>
            <i class="fa-solid fa-user"></i>
            <input type="text" class="text_box user_id" placeholder="조회된 사용자 아이디" v-model="temp" readonly />
        </div>
        <div class="submit-container">
        <div>
            <button type="submit" class="login-button" @click.prevent="findUserId">아이디 찾기</button>
            <button type="submit" class="login-button" @click.prevent="toggleFindIdForm">취소</button>
        </div>
        </div>
        <hr style="width:500px;" />
    </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'PopupFindId',
    data() {
        return {
            email: "",
            temp: "",
        }
    },
    methods: {
        toggleFindIdForm() {
            this.$emit("toggleFindIdForm");
            this.email = "";
            this.$store.dispatch('clearTemp');
        },
        findUserId() {
            if (this.email.length == 0) {
                alert("이메일을 입력해주세요.");
                return;
            } else if( !(/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(this.email)) ){
                alert("올바른 이메일 형식이 아닙니다.");
                return;
            }

            this.$store.dispatch("findUserId", this.email);
        }
    },
    computed: {
        ...mapGetters([
            'getTemp',
        ])
    },
    watch: {
        getTemp(val) {
            this.temp = val;
        }
    }
}
</script>

<style scoped>

.find-id-form {
    position: relative;
    top: -40px;
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

.user_id {
    color: blue;
}

.input_email:focus, .input_password:focus {
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
</style>
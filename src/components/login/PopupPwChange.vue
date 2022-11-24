<template>
    <form class="change-pw-form">
        <h3>비밀번호 변경</h3>
        <div>
            <i class="fa-solid fa-user"></i>
            <input type="password" @keyup="pwdValid" :class="{text_box:true , inputPass: true, input:true, valid: !pwdValidFlag}" placeholder="새로운 비밀번호 입력" v-model="pass" />
            <div v-if="!pwdValidFlag" class="fail">
                <i class="fas fa-exclamation-circle"></i>
                <small> 유효하지 않은 비밀번호 입니다.</small>
            </div>
            <span v-else :class="{ success : true, hide : !hasPw }"> 
                <i class="fas fa-check-circle"></i>
                <div class="fail"></div>
            </span>
        </div>
        <div class="logi">
            <i class="fa-solid fa-envelope"></i>
            <input type="password" @keyup="pwdChkValid" :class="{text_box: true, input: true, input_PassChk: true, valid: !pwdChkValidFlag}" placeholder="비밀번호 확인" v-model="passChk" />
            <div v-if="!pwdChkValidFlag" class="fail">
                <i class="fas fa-exclamation-circle"></i>
                <small> 비밀번호가 일치하지 않습니다.</small>
            </div>
            <span v-else :class="{ success : true, hide : !hasPwChk }"> 
                <i class="fas fa-check-circle"></i>
                <div class="fail"></div>
            </span>
        </div>
        <div class="submit-container">
            <div>
                <button type="submit" class="login-button" @click.prevent="changePw">확인</button>
                <button type="submit" class="login-button" @click.prevent="toggleAll">취소</button>
            </div>
        </div>
        <hr style="width:500px;" />
    </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'PopupPwChange',
    data() {
        return {
            pass: "",
            passChk: "",
            pwdValidFlag: true,
            pwdChkValidFlag: true,
            hasPw: false,
            hasPwChk: false,
            temp: "",
        }
    },
    methods: {
        toggleAll() {
            this.pass = "";
            this.passChk = "";
            this.pwdValidFlag =  true;
            this.pwdChkValidFlag = true;
            this.hasPw = false;
            this.hasPwChk = false;
            this.$emit("toggleChangeForm");
            this.$emit("toggleFindPwForm");
        },
        changePw() {
            if (this.pass.length == 0 || this.passChk.length == 0 || !this.pwdValidFlag || !this.pwdChkValidFlag) {
                alert("비밀번호를 확인해주세요");
                return;
            }
            this.$store.dispatch("changePw", {
                'user_id': this.temp,
                'pass': this.pass
            });
            this.pass = "";
            this.passChk = "";
            this.pwdValidFlag =  true;
            this.pwdChkValidFlag = true;
            this.hasPw = false;
            this.hasPwChk = false;
            this.$emit("toggleChangeForm");
            this.$emit("toggleFindPwForm");
        },
        pwdValid() {
            if (this.pass.length == 0) {
                this.pwdValidFlag = true;
                this.hasPw = false;
            } else if (
                /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(this.pass)
            ) {
                this.pwdValidFlag = true;
                this.hasPw = true;
            } else {
                this.pwdValidFlag = false;
                this.hasPw = true;
            }
        },
        pwdChkValid() {
            if (this.passChk.length == 0) {
                this.pwdChkValidFlag = true;
                this.hasPwChk = false;
            } else {
                this.pwdChkValidFlag = (this.pass === this.passChk) ? true : false;
                this.hasPwChk = true;
            }
        },
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
.hide {
    visibility: hidden!important;
    display: none;
}
.change-pw-form {
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

#key {
    margin-top: 10px;
}

.input_email:focus, .input_key:focus {
    border-bottom: 1px solid #757575;
}

.input_key:focus::placeholder {
    font-weight: 600;
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


.fail{
  height:20px;
}

.success > i{
  display:inline-block;
  width:20px;
}

.success i.fa-check-circle {
  color: #2ecc71;
  visibility: visible;
}

.fail i.fa-exclamation-circle {
  color: #e74c3c;
  visibility: visible;
}

.check{
  border-color:#2ecc71;
}

.valid {
  border-color: #e74c3c;
}
</style>
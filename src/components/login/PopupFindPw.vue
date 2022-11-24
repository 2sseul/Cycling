<template>
    <form class="find-pw-form">
        <h3>비밀번호 찾기</h3>
        <div>
            <i class="fa-solid fa-user"></i>
            <input type="text" class="text_box input_userId" placeholder="사용자 아이디 입력" v-model="user_id" />
        </div>
        <div class="logi">
            <i class="fa-solid fa-envelope"></i>
            <input type="text" class="text_box input_email" placeholder="사용자 이메일 입력" v-model="email" />
        </div>
        <div>
            <i class="fa-solid fa-key"></i>
            <input id="key" type="text" class="text_box input_key" placeholder="인증번호 입력" v-model="securityNumber" readonly />
        </div>
        <div class="submit-container">
        <div>
            <button v-if="!temp" type="submit" class="login-button" @click.prevent="findUserPw">인증번호 발송</button>
            <button v-else type="submit" class="login-button" @click.prevent="codeCheck">확인</button>
            <button type="submit" class="login-button" @click.prevent="toggleFindPwForm">취소</button>
        </div>
        </div>
        <hr style="width:500px;" />
    </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'PopupFindPw',
    data() {
        return {
            user_id: "",
            email: "",
            temp: "",
            securityNumber: "",
        }
    },
    methods: {
        toggleFindPwForm() {
            this.$emit("toggleFindPwForm");
            this.$store.dispatch("clearTemp");
            this.user_id = "";
            this.email = "";

            const input_key = document.querySelector("#key");
            input_key.readOnly = true;
        },
        findUserPw() {
            if (this.email.length == 0) {
                alert("이메일을 입력해주세요.");
                return;
            } else if( !(/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(this.email)) ){
                alert("올바른 이메일 형식이 아닙니다.");
                return;
            }
            const input_key = document.querySelector("#key");
            input_key.readOnly = false;
            input_key.focus();

            this.$store.dispatch("findUserPw", {
                'user_id': this.user_id,
                'email': this.email,
                'type': 1,
            });
        },
        codeCheck() {
            if (this.temp == this.securityNumber) {
                alert("인증되었습니다.");
                this.$emit("toggleChangeForm");
                // 비밀번호 변경화면으로 이동
                this.$store.dispatch("setTemp", this.user_id);
                this.user_id = "";
                this.email = "";
                this.securityNumber = "";

                const input_key = document.querySelector("#key");
                input_key.readOnly = true;
            } else {
                alert("인증코드를 확인해주세요.");
            }
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

.find-pw-form {
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
</style>
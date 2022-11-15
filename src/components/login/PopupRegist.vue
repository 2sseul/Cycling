<template>
    <div class="blur">
        <div class="container">
            <i id="close" class="fa-solid fa-xmark" @click="close"></i>
            <div class="join_container">
                <div class="form_control"> 
                <h3>회원가입</h3>
                 <div class="logi">
                    <i class="fa-solid fa-user"></i>
                    <input type="text" class="text_box input" placeholder="Username" id="userId" />
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <small>Error message</small>
                </div>
                <div>
                    <i class="fa-solid fa-key"></i>
                    <input type="password" class="text_box input" placeholder="Password" id="userPwd" />
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <small>Error message</small>
                </div>
                <div>
                    <i class="fa-solid fa-key"></i>
                    <input type="password" class="text_box input" placeholder="Confirm Password" id="userPwdChk" />
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <small>Error message</small>
                </div>
                <div>
                    <i class="fa-solid fa-face-smile"></i>
                    <input type="text" class="text_box input" placeholder="Nickname" id="nickname"/>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <small>Error message</small>
                </div>
                <div>
                    <i class="fa-solid fa-phone"></i>
                    <input type="text" class="text_box input" placeholder="Phone" id="phone" />
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <small>Error message</small>
                </div>
                <div>
                    <i class="fa-solid fa-envelope"></i>
                    <input type="text" class="text_box emails" placeholder="E-maile" id="email" />
                    <button type="submit" class="button check-button">인증번호 전송</button>
                </div>
                <div>
                    <i class="fa-solid fa-circle-check"></i>
                    <input type="text" class="text_box emails" placeholder="인증번호" id="confirm" />
                    <button type="submit" class="button check-button">인증번호 확인</button>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <small>Error message</small>
                </div>
                <button type="submit" class="button join-button">확인</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PopupRegist',
    methods: {
        close() {
            this.$emit('close');
        },
        
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

.join_container{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top:75px;
}

/** join form */
.text_box{
  height:40px;
  border:0;
  border-bottom:1px solid #a9a9a9;
  outline:none;
  font-size:15px;
  font-weight:300;
  background-color: rgba(0, 0, 0, 0);
  margin-left:10px;
  margin-bottom:10px;
}

.input{
    width:90%;
}

.emails{
  width:290px;
}

.button{
  height:38px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
  margin-left:10px;
  border-radius: 10px;
  border:none;
  cursor: pointer;
  background-color:rgb(38,50,56);
  color:#eee;
}

.check-button{
    width:110px;
}

.join-button{
    width:207px;
    margin-top:40px;
}

/** right error */
.form-control input:focus {
  outline: 0;
  border-color: #777;
}

.form-control.success input {
  border-color: #2ecc71;
}

.form-control.error input {
  border-color: #e74c3c;
}

.form-control i {
  visibility: hidden;
  position: absolute;
  top: 40px;
  right: 10px;
}

.form-control.success i.fa-check-circle {
  color: #2ecc71;
  visibility: visible;
}

.form-control.error i.fa-exclamation-circle {
  color: #e74c3c;
  visibility: visible;
}

.form-control small {
  color: #e74c3c;
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}

.form-control.error small {
  visibility: visible;
}

</style>

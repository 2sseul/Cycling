<template>
  <div class="blur">
    <div class="container">
        <i id="close" class="fa-solid fa-xmark" @click="close"></i>
        <div class="login-container">
        <section class="login" id="login">
            <h4>로그인</h4>
            <form class="login-form">
            <i class="fa-solid fa-user"></i>
            <input type="text" class="login-input" placeholder="Username" required autofocus/>
            <i class="fa-solid fa-key"></i>
            <input type="password" class="login-input" placeholder="Password" required/>
            <div class="submit-container">
            <span>아이디찾기</span>
            <button type="submit" class="login-button">로그인</button>
            <button type="submit" class="login-button">회원가입</button>
            </div>
            <span>소셜계정으로 로그인</span>
            <div class="box">
                <div class="login-box">
                    <div class="kakao-login social-btn"> 
                    <span> <img src="@/assets/img/color-kakao-logo.png" height="120%" width="auto" alt=""></span>
                    <span>
                    <img src="@/assets/img/color-kakao-logo.png" height="120%" width="auto" alt=""></span> 
                    </div>
                    <div class="naver-login social-btn"> 
                    <span> <img src="@/assets/img/white-naver-logo.png" height="100%" width="auto" alt=""></span>
                    <span>
                    <img src="@/assets/img/color-naver-logo.png" height="100%" width="auto" alt=""></span> 
                    </div>
                    <div class="google-login social-btn"> 
                    <span> <img src="@/assets/img/white-google-logo.png" height="110%" width="auto" alt=""></span>
                    <span>
                    <img src="@/assets/img/color-google-logo.png" height="120%" width="auto" alt=""></span> 
                    </div>
                </div>
            </div>
            </form>
        </section>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PopupLogin',
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.container {
    width: 700px;
    height: 500px;
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

.login-box{
  width: 100%;
  height: 100%;
  transition: 0.5s;
  display: flex;
  justify-content: center;
}

.login-box.active{
  transform: translateY(-100%);
}


.social-btn{
  width: 125px;
  height: 50px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
  outline: none;
  margin: 5px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  transition: .5s;
} 
.social-btn span{
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  
  box-sizing: border-box; 
  transition: .5s;
  font-size: 16px;
}
 
.social-btn span:nth-child(1){
  bottom: 0%;
}

.social-btn span:nth-child(2){
  top: 100%;
}
.social-btn:hover span:nth-child(1){
  bottom: 100%;
} 

.social-btn:hover span:nth-child(2){
  top: 0; 
}

.google-login span:nth-child(1){
  background: #dd4b39;
}

.google-login span:nth-child(2){
  color: #dd4b39;
}

.kakao-login span:nth-child(1){
  background: #f9e000;
}

.kakao-login span:nth-child(2){
  color: #f9e000;
}

.naver-login span:nth-child(1){
  background: #2db400;
}

.naver-login span:nth-child(2){
  color: #2db400;
}

</style>
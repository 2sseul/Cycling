<template>
  <div class="home">
    <popup-login ref="login" :class="{
      popup_login: true,
      hidden: isLoginHidden
    }" @close="closeLogin" @popupRegist="popRegist"></popup-login>
    <popup-regist ref="regist" :class="{
      popup_regist: true,
      hidden: isRegistHidden
    }" @close="closeRegist"></popup-regist>
    <user-box class="user" @popLogin="popLogin"></user-box>
    <weather-box class="weather"></weather-box>
    <ranking-board class="ranking"></ranking-board>
    <p ref='typing' id="typing"></p>
  </div>
</template>

<script>
import WeatherBox from '@/components/common/WeatherBox.vue';
import UserBox from '@/components/common/UserBox.vue';
import PopupLogin from '@/components/login/PopupLogin.vue';
import PopupRegist from '@/components/login/PopupRegist.vue';
import RankingBoard from '@/components/common/RankingBoard.vue';

export default {
  name: 'HomeView',
  components: {
    WeatherBox,
    UserBox,
    PopupLogin,
    PopupRegist,
    RankingBoard,
  },
  data() {
    return {
      typoLength: 0,
      text: 'SSYCLE 방문을 환영합니다!',
      typingSpeed: 150,
      isLoginHidden: true,
      isRegistHidden: true,
      timeOutId: '',
    }
  },
  methods: {
    typingOnEffect() {
      const mytext = this.$refs.typing;
      if (this.typoLength < this.text.length) {
        mytext.innerHTML += this.text[this.typoLength++];
        this.timeOutId = setTimeout(this.typingOnEffect, this.typingSpeed);
      } else {
        clearTimeout();
        this.timeOutId = setTimeout(() => {
          this.timeOutId = setTimeout(this.typingOutEffect, this.typingSpeed);

        }, 3000);
      } 
    },
    typingOutEffect() {
      const mytext = this.$refs.typing;
      if (this.typoLength> 0) {
        mytext.innerHTML = this.text.slice(0, this.typoLength-1);
        this.typoLength--;
        this.timeOutId = setTimeout(this.typingOutEffect, 300);
      } else {
        clearTimeout();
        this.timeOutId = setTimeout(this.typingOnEffect, 1500);
      }
    },
    popLogin() {
      this.isLoginHidden = false;
    },
    closeLogin() {
      this.isLoginHidden = true;
    },
    popRegist() {
      this.isLoginHidden = true;
      this.isRegistHidden = false;
    },
    closeRegist() {
      this.isRegistHidden = true;
    },
  },
  mounted() {
    this.typingOnEffect();
  },
  beforeDestroy() {
    clearTimeout(this.timeOutId);
  }
}
</script>

<style scoped>

.home {
  background: url('../assets/img/bg/bg_bike.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 1;
}

#typing {
  margin: 0;
  padding: 0;
  font-size: 2rem;
  color: #fff;
  font-weight: 600;
  line-height: 3rem;
  margin: 25% 0;
  letter-spacing: 2px;
  z-index: 2;
}

#typing::after {
  margin-left: 1px;
  display: inline-block;
  content: "\00a0";
  width: 5px;
  height: 3rem;
  line-height: 3rem;
  background-color: #fff;
  animation: cursorFlicker 0.8s infinite;
}

@keyframes cursorFlicker {
  0% {
    opacity: 100%;
  }
  50% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

.user {
  position: absolute;
  top: 110px;
  right: 10%;
  z-index: 2;
}

.weather {
  position: absolute;
  top: 160px;
  right: 10%;
  z-index: 2;
}

.popup_login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s ease;
}

.popup_regist {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s ease;
}

.hidden {
  display: none;
}

</style>
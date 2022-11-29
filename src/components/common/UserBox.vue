<template>
  <div id="container" ref="container">
    <div class="login">
        <div v-if="isShowUserInfo">
            <span class="greeting">환영합니다!
                <span class="nickname">{{ userInfo.nickname }}</span>
            님 :)</span>
            <i @click="doLogout" class="fa-solid fa-right-from-bracket logout"></i>
        </div>
        <div v-else>
            <span id="login" @click="popLogin">로그인</span>
            <span>이 필요합니다.</span>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'UserBox',
    methods: {
        classChanger() {
            const container = this.$refs.container;
            if (this.isNightView) {
                container.classList.add("dark");
            } else {
                container.classList.remove("dark");
            }
        },
        popLogin() {
            this.$emit('popLogin');
        },
        doLogout() {
            clearTimeout();
            this.$store.dispatch('logout');
        }
    },
    data() {
        return {
            isShowUserInfo: false,
        }
    },
    computed: {
        isNightView() {
            return this.$store.state.isNightView;
        },
        ...mapState([
            'userInfo',
        ]),
    },
    watch: {
        isNightView(val) {
            this.classChanger();
            return val;
        },
    },
    mounted() {
        this.classChanger();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            this.$store.dispatch("setUserInfo", userInfo);
            this.isShowUserInfo = true;
        }
    }
}
</script>

<style scoped>
#container {
    width: 280px;
    height: 80px;
    background-color: rgba( 255, 255, 255, 0.4 );
    box-shadow: rgba(0, 0, 0, 0.35) 0 10px 15px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .5s ease;
    color: #000;
    user-select: none;
}

#container.dark {
    background-color: rgba( 0, 0, 0, 0.4 );
    color: #fff;
}

#container > .temp {
    font-size: 1rem;
    font-weight: 600;
}

#login {
    text-decoration: underline;
    font-weight: 600;
    margin-left: 10px;
}

#login:hover {
    color: blue;
    cursor: pointer;
}

.logout {
    position: relative;
    top: -22px;
    right: 4px;
    width: 20px;
}

.logout:hover {
    cursor: pointer;
}

.greeting {
    font-size: 0.8rem;
    width: 100%;
    position: relative;
    left: 10px;
    display: inline-block;
    width: 260px;
}

.nickname {
    font-weight: 600;
}
</style>
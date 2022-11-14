<template>
  <div class="container" ref="container">
    <span class="temp">로그인이 필요합니다.</span>
  </div>
</template>

<script>
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
    },
    computed: {
        isNightView() {
            return this.$store.state.isNightView;
        }
    },
    watch: {
        isNightView(val) {
            this.classChanger();
            return val;
        }
    },
}
</script>

<style scoped>
.container {
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
}

.container.dark {
    background-color: rgba( 0, 0, 0, 0.4 );
    color: #fff;
}

.container > .temp {
    font-size: 1rem;
    font-weight: 600;
}
</style>
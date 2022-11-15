<template>
    <div class="blur">
        <div class="container">
            <i id="close" class="fa-solid fa-xmark" @click="close"></i>
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
</style>
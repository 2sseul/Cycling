<template>
    <div id="sideMenu">
        <i class="fa-solid fa-bars" @click="toggleSideBar"></i>
        <div ref="sidemenu" class="CLOSED" id="container">
            <ul class="menuList">
                <li>목록 1</li>
                <li>목록 2</li>
                <li>목록 3</li>
                <li>목록 4</li>
                <li>목록 5</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideMenuView',
    data() {
        return {
            isSideBarOpened: false,
        }
    },
    methods: {
        toggleSideBar() {
            const sideMenu = this.$refs.sidemenu;
            if (this.isSideBarOpened) {
                sideMenu.classList.remove('OPENED');
                sideMenu.classList.add('CLOSED');
            } else {
                sideMenu.classList.remove('CLOSED');
                sideMenu.classList.add('OPENED');
            }
            this.isSideBarOpened = !this.isSideBarOpened;
        }
    }
}
</script>

<style scoped>
#sideMenu {
    position: absolute;
    top: 0;
    left: 0;
}

.fa-bars {
    position: absolute;
    top: 28px;
    left: 28px;
    color: #ddd;
    font-size: 1.4rem;
}

.fa-bars:hover {
    color: #fff;
    cursor: pointer;
}

#container {
    height: 100vh;
    background-color: #002d51;
    transition: 0.5s ease;
    padding-top: 80px;
    overflow: hidden;
    color: #fff;
    box-sizing: border-box
}

.menuList {
    list-style: none;
    margin: 0;
    padding: 0;
    margin: 20px;
}

.menuList > li {
    min-width: 300px;
    text-align: left;
}

.OPENED {
    width: 300px;
}

.CLOSED {
    width: 0px;
}
</style>
<template>
    <nav class="main-menu" ref="nav">
        <ul>
            <main-menu-item v-for="item in navList" :item="item" :key="item.name"></main-menu-item>
        </ul>

        <ul class="logout">
            <li>
                <a href="#">
                    <i class="fa fa-power-off fa-2x"></i>
                    <span class="nav-text">
                        Logout
                    </span>
                </a>
            </li>  
        </ul>
    </nav>
</template>

<script>
import MainMenuItem from '../components/MainMenuItem.vue';
export default {
    name: 'SideMenuView',
    components: {
        MainMenuItem,
    },
    data() {
        return {
            isSideBarOpened: false,
            navList: [
                { url: '', icon: 'fa fa-home fa-2x', name: 'Home' },
                { url: '', icon: 'fa fa-table fa-2x', name: 'Boards' },
                { url: '', icon: 'fa fa-map-marker fa-2x', name: 'Maps' },
                { url: '', icon: 'fa fa-info fa-2x', name: 'Documentation' }
            ],
        }
    },
    methods: {
        classChanger() {
        const nav = this.$refs.nav;
        if (this.isNightView) {
          nav.classList.add("dark");
        } else {
          nav.classList.remove("dark");
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

<style>
:root {
  --point-color: #1c4769;
  --sub-color: #212121;
}
.fa-2x {
    font-size: 2em;
}
.fa {
    position: relative;
    display: table-cell;
    width: 60px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    font-size:20px;
}


.main-menu:hover,nav.main-menu.expanded {
    width:250px;
}

.main-menu {
    background: var(--point-color);
    position:absolute;
    top:80px;
    bottom:0;
    padding-top: 40px;
    box-sizing: border-box;
    height:calc(100vh - 80px);
    left:0;
    width:60px;
    overflow:hidden;
    -webkit-transition:all .5s ease;
    transition:all .5s ease;
    -webkit-transform:translateZ(0) scale(1,1);
    z-index:1000;
}

.main-menu.dark {
    background: var(--sub-color);
}

.main-menu>ul {
    margin:7px 0;
}

.main-menu li {
    position:relative;
    display:block;
    width:250px;
    height: 42px;
}

.main-menu li>a {
    position:relative;
    display:table;
    border-collapse:collapse;
    border-spacing:0;
    color:#999;
    font-family: arial;
    font-size: 14px;
    text-decoration:none;
    -webkit-transform:translateZ(0) scale(1,1);
    -webkit-transition:all .5s ease;
    transition:all .5s ease;
    overflow: hidden;
}

.main-menu .nav-icon {
    position:relative;
    display:table-cell;
    width:60px;
    height:36px;
    text-align:center;
    vertical-align:middle;
    font-size:18px;
}

.main-menu .nav-text {
    position:relative;
    display:table-cell;
    vertical-align:middle;
    width:190px;
    font-family: 'Titillium Web', sans-serif;
}

.main-menu>ul.logout {
    position:absolute;
    left:0;
    bottom:0;
}

.no-touch .scrollable.hover {
    overflow-y:hidden;
}

.no-touch .scrollable.hover:hover {
    overflow-y:auto;
    overflow:visible;
}

a:hover,a:focus {
    text-decoration:none;
}

nav {
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    -o-user-select:none;
    user-select:none;
}

nav ul,nav li {
    outline:0;
    margin:0;
    padding:0;
}
.main-menu li:hover>a,nav.main-menu li.active>a,.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus,.dropdown-menu>.active>a,.dropdown-menu>.active>a:hover,.dropdown-menu>.active>a:focus,.no-touch .dashboard-page nav.dashboard-menu ul li:hover a,.dashboard-page nav.dashboard-menu ul li.active a {
    color:#fff;
    background-color:#5fa2db;
}
.area {
    float: left;
    background: #e2e2e2;
    width: 100%;
    height: 100%;
}

@font-face {
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 300;
  src: local('Titillium WebLight'), local('TitilliumWeb-Light'), url(http://themes.googleusercontent.com/static/fonts/titilliumweb/v2/anMUvcNT0H1YN4FII8wpr24bNCNEoFTpS2BTjF6FB5E.woff) format('woff');
}

</style>
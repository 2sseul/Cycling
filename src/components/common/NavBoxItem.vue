<template>
    <li class="nav_item">
        <router-link :to="item.url">
            <i :class="item.icon" :id="item.id"></i>
            <span class="name">{{ item.name }}</span>
        </router-link>
    </li>
</template>

<script>
export default {
    name: 'NavBoxItem',
    props: {
        item: Object,
    },
}
</script>

<style scoped>
.nav_item {
    width: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
}

.nav_item:hover {
    cursor: pointer;
}

.nav_item > a {
    text-decoration: none;
}

.nav_item i {
    font-size: 1rem;
    transition: .5s ease;
    display: flex;
    flex-direction: column;
}

.nav_item:hover i {
    font-size: 1.2rem;
}

.nav_item .name {
    display: none;
    font-size: 0.8rem;
    animation: show_up 300ms forwards ease-in;
    transform-origin: bottom;
    margin-top: 5px;
    font-weight: 600;
}

@keyframes show_up {
	0% {
		transform: translate3d(0, 150%, 0);
	}
	100% {
		transform: translateZ(0);
	}
}

.nav_item:hover .name {
    display: block;
}

.nav_item:hover #home {
    color: grey;
}
.nav_item:hover #video {
    color: red;
}
.nav_item:hover #board {
    color: aqua;
}
.nav_item:hover #calendar {
    color: orange;
}
.nav_item:hover #mypage {
    color: green;
}

</style>
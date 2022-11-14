<template>
    <li class="nav_item">
        <i :class="item.icon"></i>
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
    color: #000;
    transition: .5s ease;
}

.nav_item i {
    font-size: 1rem;
}

.nav_item:hover i {
    font-size: 1.2rem;
}

</style>
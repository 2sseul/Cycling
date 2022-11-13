<template>
    <li>
        <a @click.prevent="" :href="item.url">
            <i :class="item.icon"></i>
            <span class="nav-text">
                {{ item.name }}
            </span>
        </a>
    </li>
</template>

<script>
export default {
    name: 'MainMenuItem',
    props: {
        item: Object,
    },
}
</script>

<style>

</style>
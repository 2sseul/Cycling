<template>
  <div class="board_list_container">
    리스트
  </div>
</template>

<script>
export default {
  name: 'BoardList',
  beforeMount() {
    this.$store.dispatch('getBoardList');
  }
}
</script>

<style scoped>

</style>
<template>
  <ul class="comment_list">
    <comment-item v-for="comment in comments" :comment="comment" :key="comment.comment_id"></comment-item>
  </ul>
</template>

<script>
import CommentItem from './CommentItem.vue';
export default {
  name: 'CommentList',
  props: {
    comments: Array,
  },
  components: {
    CommentItem,
  },
}
</script>

<style scoped>
.comment_list {
  list-style: none;
  color: #fff;
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
  margin-top: 100px;
}
</style>
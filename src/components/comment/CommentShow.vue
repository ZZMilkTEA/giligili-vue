<template>
  <div class="comment-show">
    <div class="comment-user">

      <el-avatar  v-if="commentInfo.avatar" class="user-avatar"
                  :src="commentInfo.avatar"></el-avatar>
      <el-avatar  v-else class="user-avatar"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <div class="info">
        <div class="user-name">{{commentInfo.nickname}}</div>
        <div class="comment-time">{{commentInfo.time | moment("YYYY-MM-DD h:mm:ss")}}</div>
      </div>
    </div>
    <div class="comment-content">{{commentInfo.content}}</div>
  </div>
</template>

<script>
    export default {
        name: "CommentShow",

      props: {
          commentInfo:{
            default: () => {}
          }
    },
    }
</script>

<style scoped>
  .info {
    display: inline;
  }

  .user-avatar{
    float: left;
    margin-right: 0.5em;
  }

  .comment-time {
    font-size: 0.8em
  ;
  }

  .comment-content {
    margin-top: 1em;
    margin-left: 2em;
  }
</style>

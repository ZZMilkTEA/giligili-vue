<template>
  <div class="comment-show">
    <div class="comment-user" @click="goUserPage(commentInfo.id)">
      <div class="user-avatar">
        <el-avatar  v-if="commentInfo.avatar"
                    :src="commentInfo.avatar"></el-avatar>
        <el-avatar v-else class="user-avatar" :size="40" icon="el-icon-user-solid"></el-avatar>
      </div>
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

      methods:{
        goUserPage(uid){
          this.$router.push({name: 'User', params: {id: uid}})
        },
      }
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
    font-size: 0.8em;
  }

  .comment-content {
    margin-top: 1em;
    margin-left: 2em;
  }

  .comment-user:hover {
    color: #00a1d6;
    cursor: pointer;
  }
</style>

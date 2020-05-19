<template>
    <div class="comment-list">
      <div v-for="comment in comments">
        <comment-show v-bind:comment-info="{avatar:comment.user.avatar, time:comment.created_at,
         nickname:comment.user.nickname, content:comment.content}" ></comment-show>
        <el-divider></el-divider>
      </div>
      <comment-show></comment-show>
    </div>
</template>

<script>
  import commentShow from './CommentShow'
  import * as API from "../../api/comment";
    export default {
        name: "CommentList",

      data(){
          return{
            comments: [],
            start: 0,
            limit: 10,
            total: 0,
          }
      },
      props:{
        type:'',
      },
      components: {
        commentShow,
      },

      methods:{
        load() {
          API.listCommentsById(this.start, this.limit, this.type, this.$route.params.id).then((res) => {
            this.comments = res.data.items;
            this.total = res.data.total;
          });
        },
      },

      beforeMount() {
        this.load();
      },
    }
</script>

<style scoped>
  .comment-list {
    max-width: 960px;
    margin: 2em auto;
  }
</style>

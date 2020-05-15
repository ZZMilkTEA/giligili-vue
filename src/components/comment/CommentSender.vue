<template>
    <div class="comment-send">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
        v-model="form.content"
        class="ipt-txt">
      </el-input>
      <el-button type="primary" class="comment-submit" @click="onSubmit">发送</el-button>
    </div>
</template>

<script>
  import * as API from "../../api/comment"

    export default {
        name: "CommentSender",

      data() {
        return {
          form:{
            content: '',
          },
        }
      },

      methods:{
        onSubmit() {
          API.postComment(this.form, this.$route.params.id, this.$store.getters.getToken).then((res) => {
            if (res.status > 0) {
              this.$notify.warning({
                title:'评论失败',
                message: res.msg,
              });
            } else {
              this.$notify({
                title: '评论成功',
                message: ``,
                type: 'success',
              });
              this.$router.go(0)
            }
          }).catch((error) => {
            this.$notify.error({
              title: '网路错误，或者服务器宕机',
              message: error,
            });
          });
        }
      }
  }
</script>

<style scoped>
 .ipt-txt {
   font-size: 12px;
   display: inline-block;
   box-sizing: border-box;
   background-color: #f4f5f7;
   border: 1px solid #e5e9ef;
   overflow: auto;
   border-radius: 4px;
   color: #555;
   width: 80%!important;
   height: 65px;
   transition: 0s;
   padding: 5px 10px;
   line-height: normal;
 }

  .comment-submit {
    width: 70px;
    height: 64px;
    right: -80px;
    top: 0;
    padding: 4px 15px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    min-width: 60px;
    vertical-align: top;
    cursor: pointer;
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
    transition: .1s;
    user-select: none;
    outline: none;
  }
</style>

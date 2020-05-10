<template>
  <div class="me">
    <h2>用户信息：</h2>
    <div>头像：{{user.avatar}}</div>
    <div>UID：{{user.id}}</div>
    <div>用户名：{{user.user_name}}</div>
    <div>昵称：{{user.nickname}}</div>
    <div>状态：{{user.status}}</div>
    <div>创建日期：{{user.created_at | moment("YYYY-MM-DD h:mm:ss") }}</div>
  </div>
</template>

<script>
  import * as API from '../api/user/';

  export default {
    name: 'User',

    data() {
      return {
        user:{},
      }
    },
    methods: {
      getUserInfo: function() {
        API.userGetInfo(this.$route.params.userID).then((res) => {
          if (res.status === 0) {
            this.user = res.data;
          }
        })
      },
    },
    created() {
      this.getUserInfo();
    }
  };
</script>

<style>

</style>

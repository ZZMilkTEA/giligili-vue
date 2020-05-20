<template>
  <el-menu class="top-bar" mode="horizontal" router>
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/post-media">投稿</el-menu-item>
    <el-menu-item index="/notice">公告</el-menu-item>
    <el-menu-item index="/about">关于我们</el-menu-item>

    <div class="user-area">
      <div v-if="!userNickname">
        <router-link to="/signUp" ><el-button type="primary" class="navRightEl" id="sign_up" >注册</el-button></router-link>
        <router-link to="/signIn" ><el-button type="primary"  class="navRightEl" id="login" >登陆</el-button></router-link>
      </div>
      <div v-else>
        <el-button type="warning" class="navRightEl" v-on:click="onLogout">登出</el-button>
        <div class="user-info" @click="goUserPage($store.getters.getUserId)">
          <span class="navRightEl">{{userNickname}}</span>
          <el-avatar v-if="userAvatar" v-else :size="50" class="navRightEl" :src="this.userAvatar"></el-avatar>
          <el-avatar v-else :size="60" class="navRightEl" icon="el-icon-user-solid"></el-avatar>
        </div>
      </div>
    </div>


  </el-menu>
</template>

<script>
import * as API from "../api/user";

export default {
  name: 'NavBar',

  data(){
    return{
      userNickname:'',
      userAvatar:'',
    }
  },
  methods: {
    //用户登出
    onLogout() {
          this.$store.commit('setToken','')
          this.$notify({
            title: '登出成功',
            message: '登出成功',
            type: 'success',
        });
      this.$router.go(0);
    },

    //用户昵称、id获取
    getUserInfo: function () {
      let token = this.$store.getters.getToken;
      if (token !== ''){
        API.userTokenRefresh(token) .then((res) =>{
          if (res.status === 0) {
            this.$store.commit('setToken', res.data);
            API.userTokenGetInfo(token).then((res) =>{
              this.$store.commit('setUser', res.data);
              this.userNickname = this.$store.getters.getUserNickname;
              this.userAvatar = this.$store.getters.getUserAvatar;
            });
          } else {
            this.$store.commit('setToken','')
            this.$notify({
              title: '登录超时',
              message: `如需登录请重新登陆`,
              type: 'warning',
            });
          }
        });
      }
    },

    goUserPage(uid){
      this.$router.push({name: 'User', params: {id: uid}})
    }
  },

  beforeMount() {
    this.getUserInfo();
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .top-bar {
    margin-bottom: 20px;
  }

  .navRightEl {
    float: right;
    margin-top: 0.4em;
    margin-right: 1em;
  }

   .user-info:hover {
    color: #00a1d6;
    cursor: pointer;
  }
</style>

<template>
  <el-menu class="top-bar" mode="horizontal" router>
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/postvideo">投稿视频</el-menu-item>
    <el-menu-item index="/notice">公告</el-menu-item>
    <el-menu-item index="/about">关于我们</el-menu-item>
    <div v-if="!showname">
      <router-link to="/signUp" ><el-button type="primary" class="navRightEl" id="sign_up" >注册</el-button></router-link>
      <router-link to="/signIn" ><el-button type="primary"  class="navRightEl" id="login" >登陆</el-button></router-link>
    </div>
    <div v-else>
      <el-button type="warning" class="navRightEl" v-on:click="onLogout">登出</el-button>
      <span @click="goUserPage(uid)" class="navRightEl">{{showname}}</span>
    </div>

  </el-menu>
</template>

<script>
import * as API from "../api/user";

export default {
  name: 'NavBar',

  data(){
    return{
      showname:"",
      uid:"",
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
    getUserName: function () {
      API.userTokenGetInfo(this.$store.getters.getToken).then((res) =>{
          this.showname = res.data.nickname;
          this.uid = res.data.user_id;
      });
    },

    goUserPage(uid){
      this.$router.push({name: 'User', params: {userID: uid}})
    }
  },

  beforeMount() {
    this.getUserName();
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
</style>

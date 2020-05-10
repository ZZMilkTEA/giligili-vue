<template>
  <div class="login">
    <h2>登陆：</h2>
    <el-form ref="form" :model="form" label-width="80px" :label-position=labelPosition>
      <el-form-item label="用户名">
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input show-password v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as API from '@/api/user/';

export default {
  name: 'SignIn',
  data() {
    return {
      labelPosition: 'top',
      form: {
        user_name: '',
        password: '',
      },
    };
  },
  methods: {
    onSubmit() {
      API.userLogin(this.form).then((res) => {
        if (res.status > 0) {
          this.$notify.error({
            title: '登陆失败',
            message: res.msg,
          });
        } else {
          this.$store.commit('setToken', res.data);
          this.$notify({
            title: '登陆成功',
            message: '登陆成功，回到上一页面',
            type: 'success',
          });
          this.$parent.reload();
          this.$router.go(-1);
        }
      }).catch((error) => {
        this.$notify.error({
          title: '网路错误，或者服务器宕机',
          message: error,
        });
      });
    },
  },
};
</script>

<style>

</style>

<template>
  <div class="sign_up">
    <h2>注册：</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input show-password v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input show-password v-model="form.password_confirm"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as API from '../api/user';

export default {
  name: 'SignUp',
  data() {
    return {
      form: {
        user_name: '',
        nickname: '',
        password: '',
        password_confirm: '',
      },
    };
  },
  methods: {
    onSubmit() {
      API.userRegister(this.form).then((res) => {
        if (res.status === 0) {
          this.$notify.success({
            title: '注册成功',
            message: res.msg,
          });
          this.$router.push({name:'login'});
        } else {
          this.$notify.error({
            title: '注册失败',
            message: res.msg,
          });
        }
      }).catch((error) => {
        this.$notify.error({
          title: '网路错误，或者服务器宕机',
          message: error,
        });
      });
    },
  },
  components: {
  },
};
</script>

<style>

</style>

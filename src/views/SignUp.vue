<template>
  <div class="sign_up">
    <h2>注册：</h2>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="user_name">
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password_confirm">
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        user_name: '',
        nickname: '',
        password: '',
        password_confirm: '',
      },
      rules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' },
          { whitespace: "true", message: '不得包含空格'}
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 30, message: '长度在 8 到 40 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        password_confirm: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 8, max: 30, message: '长度在 8 到 40 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
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
          this.$router.push({name:'SignIn'});
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

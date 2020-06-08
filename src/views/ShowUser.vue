<template>
  <div class="me">
    <h2>用户信息：</h2>
    <div style="display: inline">头像：</div>
    <el-avatar v-if="user.avatar.length !== 0" v-else :size="70" class="user-avatar" :src="user.avatar"></el-avatar>
    <el-avatar v-else :size="60" class="user-avatar" icon="el-icon-user-solid"></el-avatar>
    <el-button v-if="this.$route.params.id === this.$store.getters.getUserId" class="upload-button"
               type="primary" @click="dialogVisible = true">更改头像</el-button>


    <div>UID：{{user.id}}</div>
    <div>用户名：{{user.user_name}}</div>
    <div>昵称：{{user.nickname}}</div>
    <div>权限等级：{{user.permission}}</div>
    <div>状态：{{user.status}}</div>
    <div>创建日期：{{user.created_at | moment("YYYY-MM-DD h:mm:ss") }}</div>
    <report-button v-if="this.$route.params.id"
                   style="color: #dd6161"
                   report-type="user"
                   :reported-id="user.id"
                   :reported-name="user.nickname"
    ></report-button>
    <h3>用户的视频</h3>
    <card-container method="myPassed" type="video"></card-container>
    <h3>用户的音频</h3>
    <card-container method="myPassed" type="audio"></card-container>

    <el-dialog
      title="上传头像"
      :visible.sync="dialogVisible"
      width="30%"
    >
        <el-upload
          class="avatar-uploader"
          label="描述"
          action=""
          ref="upload"
          :before-upload="beforeAvatarUpload"
          :http-request="uploadAvatarRequest"
          :show-file-list="false">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">只能上传png/jpg文件，且不超过500kb</div>
        </el-upload>


      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">上传</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import * as API from '../api/user/';
  import CardContainer from '../components/CardContainer';
  import ReportButton from "../components/ReportButton";
  import * as uploadAPI from "../api/upload";
  import * as userAPI from "../api/user";

  export default {
    name: 'User',

    components:{
      CardContainer,
      ReportButton
    },

    data() {
      return {
        avatarUrl :'',
        user:{},
        videos:[],
        form :{
          avatar:'',
        },
        dialogVisible:false,
      }
    },
    methods: {
      getUserInfo() {
        API.userGetInfo(this.$route.params.id).then((res) => {
          if (res.status === 0) {
            this.user = res.data;
          }
        })
      },

      beforeAvatarUpload(file) {
        const isImage = (file.type === 'image/png' || file.type === 'image/jpeg');
        const isLt500K = file.size / 1024  < 500;
        if (!isImage) {
          this.$message.error('上传头像图片只能是图片!');
        }
        if (!isLt500K) {
          this.$message.error('上传头像图片大小不能超过 500KB!');
        }
        return isImage && isLt500K;
      },

      uploadAvatarRequest(option) {
        uploadAPI.postUploadToken(option.file.name,this.$store.getters.getToken).then((res) => {
          const oReq = new XMLHttpRequest();
          oReq.open('PUT', res.data.put, true);
          oReq.send(option.file);
          oReq.onload = () => {
            this.avatarUrl = res.data.get;
            this.form.avatar = res.data.key;
          };
        }).catch((error) => {
          this.$notify.error({
            title: '网路错误，或者服务器宕机',
            message: error,
          });
        });
      },

      onSubmit() {
        userAPI.changeUserAvatar(this.form,this.$route.params.id, this.$store.getters.getToken).then((res) => {
          if (res.status > 0) {
            this.$notify.error({
              title: '更改失败',
              message: res.msg,
            });
          } else {
            this.$notify({
              title: '更改成功',
              message: `看看你的新头像吧~`,
              type: 'success',
            });
            this.user.avatar = this.avatarUrl;
          }
        }).catch((error) => {
          this.$notify.error({
            title: '网路错误，或者服务器宕机',
            message: error,
          });
        });
      },

    },

    created() {
      this.getUserInfo();
    }
  };
</script>

<style>
  .user-avatar{
    vertical-align:middle;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    max-width: 178px;
    max-height: 178px;
    display: block;
  }
  .el-upload__tip{
    margin-top: 1em;
  }

  .upload-button{
    margin-left: 20px;
  }
</style>

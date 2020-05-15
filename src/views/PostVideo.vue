<template>
  <div class="post-video">
    <div v-if="formShow">
      <h2>欢迎投稿：</h2>
      <el-form ref="form" :model="form" label-width="10em">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="分区">
          <el-select  v-model="form.type">
            <el-option label="教育" value="education"></el-option>
            <el-option label="美食" value="food"></el-option>
            <el-option label="科技" value="technology"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="视频投稿方式">
          <el-radio-group v-model="form.from_outside">
            <el-radio label="0">自己上传</el-radio>
            <el-radio label="1">外链资源</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="form.from_outside" label="视频地址">
          <el-input type="url" v-model="form.url"></el-input>
        </el-form-item>

        <el-form-item v-if="!form.from_outside" label="视频文件">
          <el-upload
            class="video-uploader"
            drag
            :show-file-list="false"
            :before-upload="beforeVideoUpload"
            :http-request="uploadVideoRequest"
            action="">
            <div v-if="progress.showProgress === false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过300mb</div>
            </div>
            <el-progress v-if="progress.showProgress === true" type="circle" :percentage="progress.videoUploadPercent"
                         :status="progress.status" style="margin-top:30px;"></el-progress>
          </el-upload>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.info"></el-input>
        </el-form-item>

        <el-form-item label="视频封面">
          <el-upload
            class="avatar-uploader"
            label="描述"
            action=""
            ref="upload"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadAvatarRequest"
            :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传png/jpg文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">投稿</el-button>
        </el-form-item>

      </el-form>
    </div>
    <div v-else>
      <h1>此功能需要登录</h1>
    </div>
  </div>

</template>

<script>
import * as API from '../api/video/';
import uploadAPI from '../api/upload/';

export default {
  name: 'PostVideo',
  data() {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      formShow: true,
      editable:false,
      form: {
        title: '',
        info: '',
        url: '',
        avatar: '',
        type: '',
        from_outside: '0',
      },
      progress:{
        showProgress:false,
        videoUploadPercent:0,
        status:'',
      },
    };
  },
  methods: {
    //--------------------上传视频相关函数----------------------------
    beforeVideoUpload(file) {
      const isLt = file.size / 1024 / 1024  < 300;
      if (['video/mp4'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式');
        return false;
      }
      if (!isLt) {
        this.$message.error('上传视频大小不能超过300MB哦!');
        return false;
      }
    },
    uploadVideoRequest(option) {
      this.progress.showProgress = true;
      this.progress.status = '';
      uploadAPI(option.file.name,this.$store.getters.getToken).then((res) => {
        const oReq = new XMLHttpRequest();
        oReq.open('PUT', res.data.put, true);
        oReq.upload.addEventListener("progress",this.progressFunction,false); //调用方法监听上传进度
        oReq.onload = () => {
          this.form.url = res.data.key;
          this.progress.status = "success";
          this.$message({
            type: "success",
            message: "视频上传完成"
          });
        };
        oReq.send(option.file);

      }).catch((error) => {
        this.$notify.error({
          title: '网路错误，或者服务器宕机',
          message: error,
        });
      });
    },

    progressFunction(event) {
      // 设置进度显示
      if (event.lengthComputable) {
        let percent = Math.floor(event.loaded / event.total * 100);
        if (percent > 100) {
          percent = 100;
        }
        this.progress.videoUploadPercent = percent;
      }
      this.progress.showProgress = true;
    },

    //--------------------上传头像相关函数----------------------------
    beforeAvatarUpload(file) {
      const isImage = (file.type === 'image/png' || file.type === 'image/jpeg');
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error('上传头像图片只能是图片!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },
    uploadAvatarRequest(option) {
      uploadAPI(option.file.name,this.$store.getters.getToken).then((res) => {
        const oReq = new XMLHttpRequest();
        oReq.open('PUT', res.data.put, true);
        oReq.send(option.file);
        oReq.onload = () => {
          this.imageUrl = res.data.get;
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
      API.postVideo(this.form,this.$store.getters.getToken).then((res) => {
        if (res.status > 0) {
          this.$notify.error({
            title: '投稿失败',
            message: res.msg,
          });
        } else {
          this.$notify({
            title: '投稿成功',
            message: `请等待审核结果`,
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
    },
  },
  beforeMount() {
    if(this.$store.getters.getToken === ''){
      this.formShow = false;
    }
  }
};


</script>

<style>
  .avatar-uploader {
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
  .video-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .el-upload__tip{
    margin-top: -1em;
  }
  .avatar {
    max-width: 178px;
    max-height: 178px;
    display: block;
  }

</style>

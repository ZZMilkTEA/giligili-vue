<template>
  <div class="post-video">
    <div v-if="formShow">
      <h2>欢迎投稿：</h2>

      <el-form ref="form" :model="form" label-width="10em">

        <el-form-item label="投稿种类">
          <el-radio-group v-model="uploadType">
            <el-radio label="video">视频</el-radio>
            <el-radio label="audio">音频</el-radio>
          </el-radio-group>
        </el-form-item>

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
          <el-radio-group v-model="uploadMethod">
            <el-radio label="0">自己上传</el-radio>
            <el-radio label="1">外链资源</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="form.from_outside" label="视频地址">
          <el-input type="url" v-model="form.url"></el-input>
        </el-form-item>


        <el-form-item v-if="!form.from_outside" label="媒体文件">
          <el-upload v-if="uploadType === 'video'"
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
            <el-progress v-if="progress.showProgress === true" type="circle" :percentage="progress.uploadPercent"
                         :status="progress.status" style="margin-top:30px;"></el-progress>
          </el-upload>

          <el-upload v-else
                     class="video-uploader"
                     drag
                     :show-file-list="false"
                     :before-upload="beforeAudioUpload"
                     :http-request="uploadAudioRequest"
                     action="">
            <div v-if="progress.showProgress === false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传mp3文件，且不超过20mb</div>
            </div>
            <el-progress v-if="progress.showProgress === true" type="circle" :percentage="progress.uploadPercent"
                         :status="progress.status" style="margin-top:30px;"></el-progress>
          </el-upload>

        </el-form-item>

        <el-form-item label="简介">
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
import * as videoAPI from '../api/video/';
import * as audioAPI from '../api/audio/';
import * as uploadAPI from '../api/upload/';

export default {
  name: 'PostVideo',
  data() {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      editable:false,
      formShow:false,
      uploadMethod:'0',
      uploadType:'video',
      form: {
        title: '',
        info: '',
        url: '',
        avatar: '',
        type: '',
        from_outside: false,
      },
      progress:{
        showProgress:false,
        uploadPercent:0,
        status:'',
      },
    };
  },

  watch:{
    uploadMethod: function (val) {
      if (val === '0'){
        this.form.from_outside = false;
      } else {
        this.form.from_outside = true;
      }
    },
    uploadType: function () {
      this.progress.showProgress = false;
      this.progress.status = '';
      this.progress.uploadPercent = 0;
    }
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
      uploadAPI.postUploadToken(option.file.name,this.$store.getters.getToken).then((res) => {
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
    //--------------------上传音频相关函数----------------------------
    beforeAudioUpload(file) {
      const isLt = file.size / 1024 / 1024  < 20;
      if (['audio/mpeg'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的音频格式');
        return false;
      }
      if (!isLt) {
        this.$message.error('上传视频大小不能超过20MB哦!');
        return false;
      }
    },
    uploadAudioRequest(option) {
      this.progress.showProgress = true;
      this.progress.status = '';
      uploadAPI.postUploadToken(option.file.name,this.$store.getters.getToken).then((res) => {
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

    //-------------------上传进度条----------------------
    progressFunction(event) {
      // 设置进度显示
      if (event.lengthComputable) {
        let percent = Math.floor(event.loaded / event.total * 100);
        if (percent > 100) {
          percent = 100;
        }
        this.progress.uploadPercent = percent;
      }
      this.progress.showProgress = true;
    },

    //--------------------上传封面相关函数----------------------------
    beforeAvatarUpload(file) {
      const isImage = (file.type === 'image/png' || file.type === 'image/jpeg');
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error('上传封面图片只能是图片!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },
    uploadAvatarRequest(option) {
      uploadAPI.postUploadToken(option.file.name,this.$store.getters.getToken).then((res) => {
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

    //-------------提交投稿-----------------------
    onSubmit() {
      if (this.uploadType === "video"){
        videoAPI.postVideo(this.form,this.$store.getters.getToken).then((res) => {
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
      } else {
        audioAPI.postAudio(this.form,this.$store.getters.getToken).then((res) => {
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
      }
    },
  },
  beforeMount() {
    if(this.$store.getters.getUserId !== ''){
      this.formShow = true;
    }
  }
};


</script>

<style>

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

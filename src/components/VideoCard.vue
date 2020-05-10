<template>
  <el-card class="video-card" @click.native="goVideo(cardInfo.video)">
<!--    <img class="video-avatar" :src="cardInfo.avatar">-->
    <img class="video-avatar"  :src="cardInfo.avatar">
    <div>
      <div class="video-title">{{cardInfo.title}}</div>
      <div class="video-bottom clearfix">
        <span class="video-info">{{cardInfo.info.substring(0, 40)}}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
    export default {
      name: "VideoCard",

      props: {
        cardInfo:{
          type: Object,
          default: () => {}
        }
      },

      data(){
        return {
        }
      },

      methods:{
        goVideo(video) {
          this.$router.push({name: 'showVideo', params: {videoID: video.id}});
        },
      }
    }
</script>

<style scoped>
  .video-avatar {
    width: 100%;
  }
  .video-title {
    margin: 4px 0px 4px 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .video-bottom {
    margin-top: 4px;
  }
  .video-info {
    color: #909399;
  }
  .video-card {
    margin-bottom: 14px;
    cursor: pointer;
  }
</style>

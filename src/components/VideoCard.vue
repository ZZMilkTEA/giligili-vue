<template>
  <el-card class="video-card" @click.native="goVideo(cardInfo.video)">
    <div class="cardContainer-picContainer">
      <img v-if="cardInfo.avatar" class="video-avatar"  :src="cardInfo.avatar">
      <img v-else class="video-avatar"  src="../assets/video-avatar.jpg">
    </div>
    <div>
      <div class="video-title">{{cardInfo.title}}</div>
      <div class="video-bottom clearfix">
        <span v-if="cardInfo.info" class="video-info">{{cardInfo.info.substring(0, 40)}}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
    export default {
      name: "VideoCard",

      props: {
        cardInfo:{
          default: () => {}
        }
      },

      data(){
        return {
        }
      },

      methods:{
        goVideo(video) {
          this.$router.push({name: 'showVideo', params: {id: video.id}});
        },
      }
    }
</script>

<style scoped>
  .cardContainer-picContainer{
    width: 100%;
    height: 12em;
  }

  .video-avatar {
    width:100%;
    height: 100%;
    object-fit:cover;
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
    height: 18.5em;
    margin-bottom: 14px;
    cursor: pointer;
  }
</style>

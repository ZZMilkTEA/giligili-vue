<template>
  <el-card class="video-card" @click.native="goMedia(cardInfo.item)">
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
      name: "MediaCard",

      props: {
        cardInfo:{
          default: () => {}
        },
        type: String,
      },

      data(){
        return {
        }
      },

      methods:{
        goMedia(item) {
          if (this.type === 'video'){
            let routeData = this.$router.resolve({name: 'ShowVideo', params: {id: item.id}});
            window.open(routeData.href, '_blank');
            return;
          }
          if (this.type === 'audio'){
            let routeData = this.$router.resolve({name: 'ShowAudio', params: {id: item.id}});
            window.open(routeData.href, '_blank');
            return;
          }
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

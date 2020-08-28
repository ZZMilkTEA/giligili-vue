<template>
  <div class="show-video">

    <div class="header">
      <div class="video-header">
        <h2>{{video.title}}</h2>
        <div class="video-data">
          {{video.created_at | moment("YYYY-MM-DD h:mm:ss") }}创建 ·
          {{video.view}}观赏
        </div>
      </div>

      <div class="poster-info" @click="goUserPage(video.user.id)">
        <span class="poster-nickname">{{video.user.nickname}}</span>
        <div class="poster-avatar">
          <el-avatar  v-if="video.user.avatar" class="poster-avatar"
                      :src="video.user.avatar"></el-avatar>
          <el-avatar v-else :size="50" class="poster-avatar" icon="el-icon-user-solid"></el-avatar>
        </div>
      </div>
    </div>

    <vue-baberrage class="baberrage"
        :isShow= "barrageIsShow"
        :barrageList = "barrageList"
        :loop = "barrageLoop"
         :throttleGap = "2000"
         :box-height="300"
    >
    </vue-baberrage>

    <video-player
      class="video-player-box"
      :options="playerOptions">
    </video-player>
    <el-button type="primary" @click="barrageIsShow = !barrageIsShow" > 弹幕开关</el-button>
    <report-button style="float: right;color: #dd6161;"
                   report-type="video"
                   :reported-id="video.id"
                   :reported-name="video.title"
    ></report-button>

    <div class="video-info">
      <pre>{{video.info}}</pre>
    </div>

    <el-divider></el-divider>
    <h3>评论</h3>
    <comment-sender></comment-sender>
    <comment-list type="video" ref="commentList"></comment-list>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import * as API from '../api/video/';
import commentSender from '../components/comment/CommentSender';
import commentList from '../components/comment/CommentList';
import reportButton from  '../components/ReportButton';
import { MESSAGE_TYPE } from 'vue-baberrage';


export default {
  name: 'ShowVideo',
  components: {
    videoPlayer,
    commentSender,
    commentList,
    reportButton,
  },

  data() {
    return {
      video: {},
      playerOptions: {
        fluid: true,
        autoplay: false,
        sources: [{
          type: 'video/mp4',
          src: '',
        }],
      },

      barrageIsShow: false,
      barrageLoop: false,
      barrageList: [],

    };
  },

  watch:{
    barrageIsShow:function (val) {
      let timeoutID
      if (val){
        let _this = this;
        setTimeout(function loop() {
          _this.addToList();
          timeoutID = setTimeout(loop,_this.randomInt(2000,6000))
        },300)
      } else {
        clearTimeout(timeoutID);
      }
    }
  },

  methods: {
    load() {
      API.getVideo(this.$route.params.id).then((res) => {
        if (res.status === 0) {
          this.video = res.data;
          this.playerOptions.sources[0].src = this.video.url;
        } else {
          this.$notify.error({
            title: '无法获取视频内容',
            message: res.msg,
          })
        }

      });
    },

    goUserPage(uid) {
      let routeData = this.$router.resolve({name: 'User', params: {id: uid}});
      window.open(routeData.href, '_blank');
    },

    addToList (){
      let comments = this.$refs.commentList.comments;
      let i =this.randomInt(0, comments.length-1)
        this.barrageList.push({
          id: comments[i].user.id,
          avatar: comments[i].user.avatar,
          msg: comments[i].content,
          time:7,
          type: MESSAGE_TYPE.NORMAL,
        })
    },
    randomInt(from, to){
      return parseInt(Math.random() * (to - from + 1) + from);
    },
  },


  beforeMount() {
    this.load();
  },
};

</script>

<style scoped>
 .header {
  margin-bottom: 16px;
}
 .header:after{
     content: "";
     display: block;
     clear: both;
   }

 .video-header {
   float: left;
 }

.video-header h2{
  margin-bottom: 0;
  font-size: 18px;
  font-weight: 500;
  color: #212121;
  line-height: 26px;
  height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.video-data {
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}

.show-video .video-info {
  white-space: pre-line;
  transition: all .3s;
  font-size: 1.2em;
  color: #212121;
  letter-spacing: 0;
  line-height: 18px;
  height: 63px;
  width: 573px;
  overflow: hidden;
}

 .poster-info{
   float: right;
   display: inline;
   margin-top: 12px;
 }
 .poster-info:hover {
  color: #00a1d6;
   cursor: pointer;
}
 .poster-nickname{
   float: right;
   font-size: 1em;
 }

.poster-avatar{
  float: right;
  margin-right: 0.5em;
}

  .baberrage{
    z-index: 2;
    max-height: 300px;
    pointer-events: none;
  }
</style>

<template>
  <div class="show-audio">

    <div class="header">
      <div class="audio-header">
        <h2>{{audio.title}}</h2>
        <div class="audio-data">
          {{audio.created_at | moment("YYYY-MM-DD h:mm:ss") }}创建 ·
          {{audio.view}}观赏
        </div>
      </div>

      <div class="poster-info" @click="goUserPage(audio.user.id)">
        <span class="poster-nickname">{{audio.user.nickname}}</span>
        <div class="poster-avatar">
          <el-avatar  v-if="audio.user.avatar" class="poster-avatar"
                      :src="audio.user.avatar"></el-avatar>
          <el-avatar v-else :size="50" class="user-avatar" icon="el-icon-user-solid"></el-avatar>
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
    <audio-shower :file="this.audio.url"></audio-shower>

    <div class="audio-info">
      <pre>{{audio.info}}</pre>
    </div>
    <el-button type="primary" @click="barrageIsShow = !barrageIsShow" > 弹幕开关</el-button>
    <report-button style="float: right;color: #dd6161;"
                   report-type="audio"
                   :reported-id="audio.id"
                   :reported-name="audio.title"
    ></report-button>

    <el-divider></el-divider>
    <h3>评论</h3>
    <comment-sender></comment-sender>
    <comment-list type="audio" ref="commentList"></comment-list>
  </div>
</template>

<script>
import * as API from '../api/audio/';
import CommentSender from '../components/comment/CommentSender';
import CommentList from '../components/comment/CommentList';
import AudioShower from  '../components/audioShow/AudioShower';
import ReportButton from  '../components/ReportButton';
import {MESSAGE_TYPE} from "vue-baberrage";

export default {
  name: 'ShowAudio',

  components: {
    CommentSender,
    CommentList,
    AudioShower,
    ReportButton,
  },
  beforeMount() {
    this.load();
  },

  data() {
    return {
      audio: {},

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
      API.getAudio(this.$route.params.id).then((res) => {
        this.audio = res.data;
      });
    },
    goUserPage(uid){
      this.$router.push({name: 'User', params: {id: uid}})
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
};

</script>

<style scoped>
 .header {
  margin-bottom: 16px;
   max-width: 800px;
}
 .header:after{
     content: "";
     display: block;
     clear: both;
   }
 .audio-header {
   float: left;
 }

.audio-header h2{
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
.audio-data {
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}

.show-audio .audio-info {
  white-space: pre-line;
  transition: all .3s;
  font-size: 1em;
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

 .poster-nickname{
   float: right;
   font-size: 1em;
 }

.poster-info:hover {
  color: #00a1d6;
  cursor: pointer;
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

 audio {
   display: block;
 }
</style>

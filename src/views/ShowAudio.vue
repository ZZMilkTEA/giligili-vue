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

    <audio-shower :file="this.audio.url"></audio-shower>

    <div class="audio-info">
      <pre>{{audio.info}}</pre>
    </div>

    <el-divider></el-divider>
    <h3>评论</h3>
    <comment-sender></comment-sender>
    <comment-list type="audio"></comment-list>
  </div>
</template>

<script>
import * as API from '../api/audio/';
import commentSender from '../components/comment/CommentSender';
import commentList from '../components/comment/CommentList';
import audioShower from  '../components/audioShow/AudioShower'

export default {
  name: 'ShowAudio',

  components: {
    commentSender,
    commentList,
    audioShower,
  },
  beforeMount() {
    this.load();
  },

  data() {
    return {
      audio: {},
    };
  },
  methods: {
    load() {
      API.getAudio(this.$route.params.id).then((res) => {
        this.audio = res.data;
        this.playerOptions.sources[0].src = this.audio.url;
      });
    },
    goUserPage(uid){
      this.$router.push({name: 'User', params: {id: uid}})
    },

  },
};

</script>

<style>
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

 audio {
   display: block;
 }
</style>

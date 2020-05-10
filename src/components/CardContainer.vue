<template>
  <div class="cardContainer">
    <h2>{{title}}</h2>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="8" :md="8" v-for="video in videos" :key="video.id">
        <video-card
        v-bind:card-info="{video:video, avatar:video.avatar,
         title:video.title, info:video.info}"
        ></video-card>
      </el-col>
    </el-row>
    <div class="block">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="6"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
    import VideoCard from "./VideoCard";
    import * as API from "../api/video/";
    export default {
      name: "CardContainer",
      components: {VideoCard},
      props:['title'],
      data() {
        return {
          videos: [],
          start: 0,
          limit: 6,
          total: 0,
        }
      },
      methods: {
        load() {
          API.getPassedVideos(this.start, this.limit).then((res) => {
            this.videos = res.data.items;
            this.total = res.data.total;
          });
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.start = this.limit * (val - 1); // val 页面
          this.load();
        },

      },

      beforeMount() {
        this.load();
      },
    }
</script>

<style scoped>

</style>

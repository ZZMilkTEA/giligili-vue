<template>
  <div class="search-box">

    <el-form ref="form" style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="keyword" @keyup.enter.native="doSearch"
                style="width: 20em" >
        <el-button type="submit" slot="append" icon="el-icon-search" @click="doSearch"></el-button>
      </el-input>
      <el-form-item label="搜索类型">
        <el-radio-group v-model="searchType" @change="doSearch">
          <el-radio label="video">视频</el-radio>
          <el-radio label="audio">音频</el-radio>
          <el-radio label="user">用户</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div class="top">
      <el-row :gutter="20">
        <div class="is-result-none" v-if="res.length === 0">没有结果哦</div>
        <el-col v-if="searchType === 'video'" :xs="24" :sm="6" :md="6" v-for="video in res" :key="video.id">
          <media-card
            v-bind:card-info="{item:video, avatar:video.avatar,
         title:video.title, info:video.info, }" type='video'
          ></media-card>
        </el-col>
        <el-col v-if="searchType === 'audio'" :xs="24" :sm="6" :md="6" v-for="audio in res" :key="audio.id">
          <media-card
            v-bind:card-info="{item:audio, avatar:audio.avatar,
         title:audio.title, info:audio.info }" type='audio'
          ></media-card>
        </el-col>
        <el-col v-if="searchType === 'user'" :xs="24" :sm="6" :md="6" v-for="user in res" :key="user.id">
          <user-card
            v-bind:card-info="{user:user, avatar:user.avatar,
         nickname:user.nickname}"
          ></user-card>
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
  </div>
</template>

<script>
import MediaCard from "../components/MediaCard";
import SearchBox from "../components/SearchBox";
import UserCard from "../components/UserCard"
import * as API from "../api/search";

export default {
  name: 'Search',
  data() {
    return {
      res:[],
      keyword:'',
      searchType:'video',
      start: 0,
      limit: 8,
      total: 0,
    }
  },
  watch:{
    '$route' (to, from) {
      this.$data.keyword = this.$route.query.keyword;
      this.$data.searchType = this.$route.query.searchType;
      this.$data.start = this.$route.query.start;
      this.$data.limit = this.$route.query.limit;
    }
  },

  components: {
    MediaCard,
    SearchBox,
    UserCard,
  },

  methods: {
    doSearch(){
      this.res = [];
      this.$router.push({name: 'Search', query: {keyword: this.keyword,
          searchType:this.searchType, start: this.start, limit: this.limit}})
    },
    load() {
      if (this.keyword === ''){
        this.$notify.warning({
          title:'搜索无效',
          message:'请输入搜索内容'
        });
        return
      }
      API.doSearch(this.keyword ,this.start, this.limit, this.searchType).then((res) => {
        if (res.data.items != null){
          this.res = res.data.items;
        } else {
          this.res = [];
        }
        this.total = res.data.total;
      }).catch((error) => {
        this.$notify.error({
          title: '网路错误，或者服务器宕机',
          message: error,
        });
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
    this.$data.keyword = this.$route.query.keyword;
    this.$data.searchType = this.$route.query.searchType;
    this.$data.start = this.$route.query.start;
    this.$data.limit = this.$route.query.limit;
    this.load();
  },
  beforeRouteUpdate(to, from, next){
    this.load();
    next();
  }
}
</script>

<style>
  .is-result-none {
    color: #555555;
    text-align: center;
  }
</style>

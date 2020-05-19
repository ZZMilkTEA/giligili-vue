<template>
  <div class="cardContainer">
    <h3>{{title}}</h3>
    <div class="is-result-none" v-if="items.length === 0">没有结果哦</div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="6" :md="6" v-for="item in items" :key="item.id">
        <media-card
        v-bind:card-info="{item:item, avatar:item.avatar,
         title:item.title, info:item.info}"
        v-bind:type="cardType"
        ></media-card>
      </el-col>
    </el-row>
    <div class="block">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="8"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
    import * as videoAPI from "../api/video/";
    import * as auidoAPI from "../api/audio/";
    import MediaCard from "./MediaCard";

    export default {
      name: "CardContainer",
      components: {
        MediaCard,
      },
      props:{
        title: String,
        method: {String,required: true},
        type: {String,required: true},
        kind: String,
      },
      data() {
        return {
          items: [],
          start: 0,
          limit: 8,
          total: 0,
          cardType: this.type,
        }
      },
      methods: {
        load() {
          if (this.type === 'video') {
            if (this.method === 'passed') {
              videoAPI.listPassedVideos(this.start, this.limit,{kind: this.kind}).then((res) => {
                this.items = res.data.items;
                this.total = res.data.total;
              });
            }
            if (this.method === 'myPassed') {
              videoAPI.listMyPassedVideos(this.start, this.limit, this.$route.params.id).then((res) => {
                this.items = res.data.items;
                this.total = res.data.total;
              });
            }
          } else if (this.type === 'audio') {
            if (this.method === 'passed') {
              auidoAPI.listPassedAudios(this.start, this.limit).then((res) => {
                this.items = res.data.items;
                this.total = res.data.total;
              });
            }
            if (this.method === 'myPassed') {
              auidoAPI.listMyPassedAudios(this.start, this.limit, this.$route.params.id).then((res) => {
                this.items = res.data.items;
                this.total = res.data.total;
              });
            }
          }
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
  .is-result-none {
    color: #555555;
    text-align: center;
  }
</style>

<template>
  <div class="searchBox">
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="keyword" @keyup.enter.native="doSearch"
                class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
    import * as API from "../api/search";
    export default {
      name: "SearchBox",
      data() {
        return {
          keyword:'',
        }
      },
      methods: {
        doSearch() {
          this.$router.push({name: 'Search', query: {keyword: this.keyword,
              searchType:"video", start: 0, limit: 8}})
        },
      },

    }
</script>

<style scoped>

</style>

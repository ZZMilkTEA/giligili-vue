<template>
  <div class="home">
    <search-box></search-box>
    <daily-rank-shower class="daily-rank-shower" type="video" style="width: 400px">视频区每日排行榜</daily-rank-shower>
    <daily-rank-shower class="daily-rank-shower" type="audio" style="width: 400px">音频区每日排行榜</daily-rank-shower>
    <h1>视频区</h1>
      <card-container title="全部视频" type="video" method="passed"></card-container>
      <card-container title="教育" type="video" kind="education" method="passed"></card-container>
      <card-container title="美食" type="video" kind="food" method="passed"></card-container>
      <card-container title="科技" type="video" kind="technology" method="passed"></card-container>
    <h1>音频区</h1>
    <card-container title="全部音频" type="audio" method="passed"></card-container>
  </div>
</template>

<script>
import CardContainer from "../components/CardContainer";
import SearchBox from "../components/SearchBox";
import DailyRankShower from "../components/DailyRankShower";

export default {
  name: 'Home',

  components: {
    CardContainer,
    SearchBox,
    DailyRankShower
  },
};
</script>

<style>
  .daily-rank-shower{
    display: inline-block;
    vertical-align: top;
  }
</style>

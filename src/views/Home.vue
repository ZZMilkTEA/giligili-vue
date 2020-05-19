<template>
  <div class="home">
    <search-box></search-box>
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
export default {
  name: 'Home',

  components: {
    CardContainer,
    SearchBox,
  },
};
</script>

<style>

</style>

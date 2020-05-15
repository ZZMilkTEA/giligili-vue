<template>
  <div class="home">
    <search-box></search-box>
    <div class="top">
      <card-container title="全部视频"></card-container>
      <card-container title="教育"></card-container>
      <card-container title="美食"></card-container>
    </div>
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

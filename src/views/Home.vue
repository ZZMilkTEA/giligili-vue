<template>
  <div class="home">
    <div class="top">
      <card-container title="全部视频"></card-container>
      <card-container title="教育"></card-container>
      <card-container title="美食"></card-container>
    </div>
  </div>
</template>

<script>
import CardContainer from "../components/CardContainer";

export default {
  name: 'home',

  components: {
    CardContainer,
  },
};
</script>

<style>

</style>

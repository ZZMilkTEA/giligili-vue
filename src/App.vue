<template>
  <div id="app" class="main-contianer">
    <NavBar v-if="isNavAlive"></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import * as API from "./api/user";

export default {
  name: 'App',
  data(){
    return{
      isNavAlive: true,
    }
  },
  components: {
    NavBar,
  },
  methods:{
    reload(){
      this.isNavAlive = false;
      this.$nextTick(() => (this.isNavAlive = true))
    },
  }
};
</script>

<style>
</style>
